<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Console\Command;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Hash;

use function Laravel\Prompts\password;
use function Laravel\Prompts\text;
use function Laravel\Prompts\confirm;

class CreateUser extends Command
{

	/**
	 * Namnet och signatur på konsolkommandot.
	 *
	 * @var string
	 */
	protected $signature = 'user:create 
		{--name= : Inmatning av det nya användarnamnet} 
		{--email= : Inmatning av den nya användarens e-postadress} 
		{--password= : Inmatning av det nya användarens lösenord}
		{--E|verify-email : Markera e-posten som verifierad} 
		{--F|force : Bekräfta utan att bekräfta, bara gör det ;)}';

	/**
	 * Beskrivning av konsolkommandot.
	 *
	 * @var string
	 */
	protected $description = 'Skapa en användare';

   	protected array $options;

   	protected array $userData;
    

    public function handle(): int
    {
        $this->options = $this->options();
		
        $user = $this->createUser();
		if(!$user) {
			return static::INVALID;
		}
        return static::SUCCESS;
    }

    protected function getUserData(): array
    {
		return [

            'name' => $this->options['name'] ?: text(
                label: 'Namn',
                required: true,
            ),

            'email' => $this->options['email'] ?: text(
                label: 'E-postadress',
                required: true,
                validate: fn (string $email): ?string => match (true) {
                    ! filter_var($email, FILTER_VALIDATE_EMAIL) => 'E-postadressen måste vara giltig.',
                    default => null,
                },
            ),

            'password' => Hash::make($this->options['password'] ?: password(
                label: 'Lösenord',
                required: true,
            )),
        ];
    }

    protected function createUser(): null | User
    {
		$this->userData = $this->getUserData();
		$user = new User();

		$user->name = $this->userData['name'];
		$user->email_verified_at = null;

		// E-post
		$user->email = $this->userData['email'] ?? null;

		// Lösenord
		$user->password = $this->userData['password'];

		// Bekräfta
		$confirmed = !!$this->options['force'] ?: confirm(
			label: 'Spara denna användare?',
			default: true
		);
		if(!$confirmed) {
			$this->error('Avbröts!');
			return null;
		}

		$exists = User::whereEmail($user->email)->first();

		// Användaren existerar inte ännu, skapa och returnera bara
		if ($exists === null) { 
			$user->save();
			$this->info('Skapade en användare med id: ' . $user->id);

			if($user instanceof MustVerifyEmail) {
				if(!!$this->options['verify-email'] ?: confirm(
					label: 'Verifiera e-posten',
					default: true
				)) {
					$user->forceFill(['email_verified_at' => now()])->save();
				}
			}

			// Händelse
			event(new Registered($user));
			return $user;
		}

		// Användaren existerar redan, kontrollera inmatningen och hantera
		if ($confirmed) {
			if ($exists->update($user->getAttributes())) {
				$this->info('Uppdaterade en befintlig användare med id: ' . $exists->id);
				return $exists;
			}

			$this->warn('Uppdatering av en befintlig användare med id: ' . $exists->id . ' slutade med fel');
			return $exists;
		}

		$this->error('Användaren finns redan med id: ' . $exists->id);
		return $user;
    }

}
