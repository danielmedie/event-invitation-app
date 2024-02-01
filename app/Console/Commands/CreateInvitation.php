<?php

namespace App\Console\Commands;

use App\Models\Invitation;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

use function Laravel\Prompts\{text, confirm};

class CreateInvitation extends Command
{

	/**
	 * Namnet och signatur på konsolkommandot.
	 *
	 * @var string
	 */
	protected $signature = 'invitation:create 
		{--to= : Vem är inbjudan för?} 
		{--code= : Kod för inbjudan}
		{--message= : Meddelande för inbjudan} 
		{--F|force : Bekräfta utan att bekräfta, bara gör det ;)}';

	/**
	 * Beskrivning av konsolkommandot.
	 *
	 * @var string
	 */
	protected $description = 'Skapa en inbjudan';

   	protected array $options;

   	protected array $invitationData;
    

    public function handle(): int
    {
        $this->options = $this->options();
		
        $invitation = $this->createInvitation();
		if(!$invitation) {
			return static::INVALID;
		}
        return static::SUCCESS;
    }

    protected function getInvitationData(): array
    {
		return [

            'to' => $this->options['to'] ?: text(
                label: 'Till',
                required: true,
            ),
            'code' => $this->options['code'] ?: text(
                label: 'Inbjudningskod',
                required: true,
                validate: fn (string $code): ?string => match (true) {
                    strtolower($code) != ($test = Str::of($code)->slug('-')) => 'Koden måste vara en slug. t.ex: '.$test,
                    default => null,
                },
            ),
            
			'message' => $this->options['message'] ?: text(
                label: 'Inbjudningsmeddelande',
            ),

        ];
    }

    protected function createInvitation(): null | Invitation
    {
		$this->invitationData = $this->getInvitationData();
		$invitation = new Invitation();

		$invitation->to = $this->invitationData['to'];
		$invitation->code = $this->invitationData['code'];
		$invitation->message = $this->invitationData['message'] ?? null;

		// Bekräfta
		$confirmed = !!$this->options['force'] ?: confirm(
			label: 'Spara denna inbjudan?',
			default: true
		);
		if(!$confirmed) {
			$this->error('Avbröts!');
			return null;
		}

		$exists = Invitation::whereCode($invitation->code)->first();

		// Inbjudan existerar inte ännu, skapa och returnera bara
		if ($exists === null) { 
			$invitation->save();
			$this->info('Skapade en inbjudan med id: ' . $invitation->id);
			return $invitation;
		}

		// Inbjudan existerar redan, kontrollera inmatningen och hantera
		if ($confirmed) {
			if ($exists->update($invitation->getAttributes())) {
				$this->info('Uppdaterade en befintlig inbjudan med id: ' . $exists->id);
				return $exists;
			}
			$this->warn('Uppdatering av en befintlig inbjudan med id: ' . $exists->id . ' slutade med fel');
			return $exists;
		}

		$this->error('Inbjudan finns redan med id: ' . $exists->id);
		return $invitation;
    }

}
