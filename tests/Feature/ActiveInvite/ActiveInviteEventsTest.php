<?php 

namespace Tests\Feature\ActiveInvite;

use App\Models\Event;
use App\Models\Guest;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;

class ActiveInviteEventsTest extends TestCase
{
	use WithFaker;

	/** @test */
	public function cannot_see_event_without_valid_invitation()
	{
		$this->getJson(route('api.invite.event.show'))
			->assertUnauthorized();
	}

	/** @test */
	public function can_get_event_with_active_invitaion()
	{
		$invitation = $this->makeInvitationAndAuthenticate();

		$firstEvent = new Event(config('events',[]));

		$res = $this->getJson(route('api.invite.event.show'))
			->assertStatus(200);
	}

	
}
