<?php 

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\Guest;
use App\Models\Invitation;

class InvitationsCrudTest extends TestCase
{
	use WithFaker;

	/** @test */
	public function you_need_to_be_authenticated_to_view_invitations()
	{
		$this->getJson(route('api.invitations.index'))
			->assertUnauthorized();
	}

	/** @test */
	public function can_view_invitations()
	{
		$this->makeUserAndAuthenticate();

		Invitation::factory(4)->create();

		$res = $this->getJson(route('api.invitations.index'));
		$res->assertJsonCount(4);
	}

	/** @test */
	public function you_can_view_a_single_invitation()
	{
		$this->makeUserAndAuthenticate();

		$invitation = Invitation::factory()->create();

		$this->getJson(route('api.invitations.show', [$invitation]))
			->assertStatus(200)
			->assertJsonFragment(['id' => $invitation->id]);
	}

	/** @test */
	public function a_invitation_can_be_created_without_a_code()
	{
		$this->makeUserAndAuthenticate();

		$res = $this->postJson(route('api.invitations.store'),[])->assertStatus(201);

		$invitation = $this->content($res);

		$this->assertNotNull($invitation['code']);
	}

	/** @test */
	public function a_invitation_can_be_created()
	{
		$this->makeUserAndAuthenticate();

		$invitation = Invitation::factory()->make();

		$res = $this->postJson(route('api.invitations.store'), [])
			->assertStatus(201);

		$invitation = $this->content($res);

		$this->assertTrue(Invitation::where('code', $invitation['code'])->exists());
	}

	/** @test */
	public function when_authenticated_you_can_update_a_invitation()
	{
		$this->makeUserAndAuthenticate();

		$invitation = Invitation::factory()->create();

		$invitation->message = $newMessage = $this->faker->words(3,true);
		
		$this->putJson(route('api.invitations.update', [$invitation]), ["message" => $newMessage])->assertStatus(200);

		$this->assertEquals($invitation->fresh()->message, $newMessage);
	}

	/** @test */
	public function an_invitation_can_be_deleted()
	{
		$this->makeUserAndAuthenticate();

		$invitation = Invitation::factory()->create();

		$this->deleteJson(route('api.invitations.destroy', [$invitation]))
			->assertStatus(204);

		$this->assertCount(0, Invitation::all());
	}
	
}
