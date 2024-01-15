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
	 * The name and signature of the console command.
	 *
	 * @var string
	 */
	protected $signature = 'user:create 
		{--name= : Inject the new users name} 
		{--email= : Inject the new users email} 
		{--password= : Inject the new users password}
		{--E|verify-email : Mark email as verified} 
		{--F|force : Do not confirm, just do it ;)}';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Create a user';

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
                label: 'Name',
                required: true,
            ),

            'email' => $this->options['email'] ?: text(
                label: 'Email address',
                required: true,
                validate: fn (string $email): ?string => match (true) {
                    ! filter_var($email, FILTER_VALIDATE_EMAIL) => 'The email address must be valid.',
                    default => null,
                },
            ),

            'password' => Hash::make($this->options['password'] ?: password(
                label: 'Password',
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

		// Enial
		$user->email = $this->userData['email'] ?? null;

		// Password
		$user->password = $this->userData['password'];

		// Confirm
		$confirmed = !!$this->options['force'] ?: confirm(
			label: 'Save this user?',
			default: true
		);
		if(!$confirmed) {
			$this->error('Cancelled!');
			return null;
		}

		$exists = User::whereEmail($user->email)->first();

		// user is not exisiting yet, just create and return
		if ($exists === null) { 
			$user->save();
			$this->info('Created a user with id: ' . $user->id);

			if($user instanceof MustVerifyEmail) {
				if(!!$this->options['verify-email'] ?: confirm(
					label: 'Verify Email',
					default: true
				)) {
					$user->forceFill(['email_verified_at' => now()])->save();
				}
			}

			// Event
			event(new Registered($user));
			return $user;
		}

		// user is already existing, check the input and handle
		if ($confirmed) {
			if ($exists->update($user->getAttributes())) {
				$this->info('Updated an existing user with id: ' . $exists->id);
				return $exists;
			}

			$this->warn('Updating an existing user with id: ' . $exists->id . ' ended with errors');
			return $exists;
		}

		$this->error('User already exist with id: ' . $exists->id);
		return $user;
    }

}
