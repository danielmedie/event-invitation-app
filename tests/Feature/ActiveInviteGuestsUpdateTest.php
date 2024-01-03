<?php 

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\Guest;
use App\Models\Invitation;

class ActiveInviteGuestsUpdateTest extends TestCase
{
	use WithFaker;

	/** @test */
	public function invitation_needed_to_be_authenticated_update_allergies()
	{
		// TODO: Change route eg. api.invite.guest.update
		$this->getJson(route('api.guests.index'))
			->assertUnauthorized();
	}

	/** @test */
	public function can_update_allergies()
	{
		$this->makeUserAndAuthenticate();
	}

	/** @test */
	public function invitation_needed_to_be_authenticated_update_attendance()
	{
		// TODO: Change route eg. api.invite.guest.attendance
		$this->getJson(route('api.guests.index'))
			->assertUnauthorized();
	}

	/** @test */
	public function can_update_attendance()
	{
		$this->makeUserAndAuthenticate();
	}

	/** @test */
	public function can_only_update_guest_on_the_authenticated_invitation()
	{
		$this->makeUserAndAuthenticate();

		// Create User/Invtiation authenticated object
		// Create another invitation with a different guest, not authenticated
		// Try to update other guest
		// Expect/Assert failure
	}
	
}
