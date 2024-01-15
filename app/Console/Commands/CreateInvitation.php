<?php

namespace App\Console\Commands;

use App\Models\Invitation;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

use function Laravel\Prompts\{text,confirm};

class CreateInvitation extends Command
{

	/**
	 * The name and signature of the console command.
	 *
	 * @var string
	 */
	protected $signature = 'invitation:create 
		{--to= : Who is thie invitation for?} 
		{--code= : Code for invitation}
		{--message= : Message for invitation} 
		{--F|force : Do not confirm, just do it ;)}';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Create an invitation';

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
                label: 'To',
                required: true,
            ),
            'code' => $this->options['code'] ?: text(
                label: 'Invitation Code',
                required: true,
                validate: fn (string $code): ?string => match (true) {
                    strtolower($code) != ($test = Str::of($code)->slug('-')) => 'The code must be a slug. eg: '.$test,
                    default => null,
                },
            ),
            
			'message' => $this->options['message'] ?: text(
                label: 'Invitation Message',
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

		// Confirm
		$confirmed = !!$this->options['force'] ?: confirm(
			label: 'Save this invitation?',
			default: true
		);
		if(!$confirmed) {
			$this->error('Cancelled!');
			return null;
		}

		$exists = Invitation::whereCode($invitation->code)->first();

		// invitation is not exisiting yet, just create and return
		if ($exists === null) { 
			$invitation->save();
			$this->info('Created a invitation with id: ' . $invitation->id);
			return $invitation;
		}

		// invitation is already existing, check the input and handle
		if ($confirmed) {
			if ($exists->update($invitation->getAttributes())) {
				$this->info('Updated an existing invitation with id: ' . $exists->id);
				return $exists;
			}
			$this->warn('Updating an existing invitation with id: ' . $exists->id . ' ended with errors');
			return $exists;
		}

		$this->error('Invitation already exist with id: ' . $exists->id);
		return $invitation;
    }

}
