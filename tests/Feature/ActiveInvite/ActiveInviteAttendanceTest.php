<?php 

namespace Tests\Feature\ActiveInvite;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\Guest;
use App\Models\Invitation;
use Carbon\Carbon;

class ActiveInviteAttendanceTest extends TestCase
{
	use WithFaker;

	/** @test */
	public function cannot_save_rsvp_response_if_authenticated()
	{
		$guestOnAnInvite = Guest::factory()
			->for(Invitation::factory()->create())
			->create();

		$this->getJson(route('api.invite.guests.index',['guest' => $guestOnAnInvite]))
			->assertUnauthorized();
	}

	/** @test */
	public function can_save_rsvp_response_for_guest_on_invitation()
	{
		$invitation = $this->makeInvitationAndAuthenticate();

		$guestOnActiveInvite = Guest::factory()
			->for($invitation)
			->create(['attending' => null]);

		// Temporarily update Event RSVP
		config([
			'event.event_date' => Carbon::now()->addMonths(2),
			'event.rsvp_date' => Carbon::now()->addMonths(1),
		]);

		$res = $this->putJson(route('api.invite.guests.attendance', [$guestOnActiveInvite]),['attending' => true])	
			->assertStatus(200);
		
		$guestFromResponse = $res->original;
		$this->assertNotEquals($guestFromResponse->attending,null);
	}
	

	/** @test */
	public function can_only_update_guest_response_on_active_invitation()
	{
		$guestOnOtherInvite = Guest::factory()
			->for(Invitation::factory()->create())
			->create();

		$invitation = $this->makeInvitationAndAuthenticate();

		$guestOnActiveInvite = Guest::factory()
			->for($invitation)
			->create();

		// Temporarily update Event RSVP
		config([
			'event.event_date' => Carbon::now()->addMonths(2),
			'event.rsvp_date' => Carbon::now()->addMonths(1),
		]);

		$res = $this->putJson(route('api.invite.guests.attendance', [$guestOnOtherInvite]),['attending' => true])	
			->assertForbidden();
	}

	/** @test */
	public function cannot_save_rsvp_response_if_rsvp_date_has_passed()
	{
		$invitation = $this->makeInvitationAndAuthenticate();

		$guestOnActiveInvite = Guest::factory()
			->for($invitation)
			->create(['attending' => null]);

		// Temporarily update Event RSVP
		config([
			'event.event_date' => Carbon::now()->addMonths(2),
			'event.rsvp_date' => Carbon::now()->subMonths(1),
		]);

		$res = $this->putJson(route('api.invite.guests.attendance', [$guestOnActiveInvite]),['attending' => true])	
			->assertStatus(422)
			->assertJsonValidationErrorFor('rsvp_date');
	}
}
