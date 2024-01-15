<?php 

namespace Tests\Feature\ActiveInvite;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\Guest;
use App\Models\Invitation;

class ActiveInviteGuestsTest extends TestCase
{
	use WithFaker;


	/** @test */
	public function cannot_see_guests_if_authenticated()
	{
		$this->getJson(route('api.invite.guests.index'))
			->assertUnauthorized();
	}

	/** @test */
	public function can_get_list_of_guests_on_active_invitation()
	{
		$invitation = $this->makeInvitationAndAuthenticate();

		$guestOnActiveInvite = Guest::factory()
			->for($invitation)
			->count(3)
			->create();

		$this->getJson(route('api.invite.guests.index'))
			->assertJsonCount(3);
	}
	
	/** @test */
	public function can_only_get_guests_on_active_invitation()
	{
		$guestOnOtherInvite = Guest::factory()
			->for(Invitation::factory()->create())
			->create();

		$invitation = $this->makeInvitationAndAuthenticate();

		$guestOnActiveInvite = Guest::factory()
			->for($invitation)
			->create();

		$res = $this->getJson(route('api.invite.guests.index'))
			->assertStatus(200);

		$guestsFromResponse = $res->original;

		$this->assertCount(1,$guestsFromResponse);
		$this->assertTrue($guestsFromResponse->first()->is($guestOnActiveInvite));
	}



	/** @test */
	public function cannot_see_single_guest_if_authenticated()
	{
		$guestOnAnInvite = Guest::factory()
			->for(Invitation::factory()->create())
			->create();

		$this->getJson(route('api.invite.guests.index',['guest' => $guestOnAnInvite]))
			->assertUnauthorized();
	}

	/** @test */
	public function can_get_single_guest_on_invitation()
	{	
		$invitation = $this->makeInvitationAndAuthenticate();

		$guestOnActiveInvite = Guest::factory()
			->for($invitation)
			->create();

		$res = $this->getJson(route('api.invite.guests.show',[ 'guest' => $guestOnActiveInvite ]))
			->assertStatus(200)
			->assertJsonFragment(['id' => $guestOnActiveInvite->id]);
	}

	/** @test */
	public function can_only_get_single_guests_on_active_invitation()
	{
		$guestOnOtherInvite = Guest::factory()
			->for(Invitation::factory()->create())
			->create();

		$invitation = $this->makeInvitationAndAuthenticate();

		$guestOnActiveInvite = Guest::factory()
			->for($invitation)
			->create();

		$this->getJson(route('api.invite.guests.show',['guest' => $guestOnOtherInvite]))
			->assertForbidden();
	}



	/** @test */
	public function cannot_update_guest_allergies_if_authenticated()
	{
		$guestOnAnInvite = Guest::factory()
			->for(Invitation::factory()->create())
			->create();

		$this->putJson(route('api.invite.guests.update',[ 'guest' => $guestOnAnInvite ]),['allergies' => $this->faker->paragraphs(3,true)])
			->assertUnauthorized();
	}

	/** @test */
	public function can_update_guest_allergies()
	{
		$guestOnOtherInvite = Guest::factory()
			->for(Invitation::factory()->create())
			->create();

		$invitation = $this->makeInvitationAndAuthenticate();

		$guestOnActiveInvite = Guest::factory()
			->for($invitation)
			->create();

		$originalAllergies = $guestOnActiveInvite->allergies;

		$res = $this->putJson(route('api.invite.guests.update',[ 'guest' => $guestOnActiveInvite ]),['allergies' => ($allergies = $this->faker->paragraphs(3,true))])
			->assertStatus(200);

		$guestFromResponse = $res->original;
		$this->assertNotEquals($originalAllergies,$guestFromResponse->allergies);
	}

	/** @test */
	public function can_only_update_guest_allergies_on_active_invitation()
	{
		$guestOnOtherInvite = Guest::factory()
			->for(Invitation::factory()->create())
			->create();

		$invitation = $this->makeInvitationAndAuthenticate();

		$guestOnActiveInvite = Guest::factory()
			->for($invitation)
			->create();

		$this->putJson(route('api.invite.guests.update',[ 'guest' => $guestOnOtherInvite ]),['allergies' => $this->faker->paragraphs(3,true)])
			->assertForbidden();
	}
	
}
