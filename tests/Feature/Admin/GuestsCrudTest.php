<?php 

namespace Tests\Feature\Admin;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\Guest;
use App\Models\Invitation;

class GuestsCrudTest extends TestCase
{
	use WithFaker;

	/** @test */
	public function you_need_to_be_authenticated_to_view_guests()
	{
		$this->getJson(route('api.guests.index'))
			->assertUnauthorized();
	}

	/** @test */
	public function can_view_guests()
	{
		$this->makeUserAndAuthenticate();

		Guest::factory(4)->create();

		$res = $this->getJson(route('api.guests.index'));
		$res->assertJsonCount(4);
	}

	/** @test */
	public function you_can_view_a_single_guest()
	{
		$this->makeUserAndAuthenticate();

		$guest = Guest::factory()->create();

		$this->getJson(route('api.guests.show', [$guest]))
			->assertStatus(200)
			->assertJsonFragment(['id' => $guest->id]);
	}

	/** @test */
	public function a_guest_cannot_be_created_without_a_name()
	{
		$this->makeUserAndAuthenticate();

		$guest = Guest::factory()->make([
			'invitation_id' => Invitation::factory()->create()->id
		]);

		$res = $this->postJson(route('api.guests.store'),[])->assertStatus(422);

	}

	/** @test */
	public function a_guest_can_be_created()
	{
		$this->makeUserAndAuthenticate();

		$guest = Guest::factory()->make([
			'invitation_id' => Invitation::factory()->create()->id
		]);

		$res = $this->postJson(route('api.guests.store'), $guest->toArray())
			->assertStatus(201);

		$guest = $this->content($res);

		$this->assertTrue(Guest::where('name', $guest['name'])->exists());
	}

	/** @test */
	public function when_authenticated_you_can_update_a_guest()
	{
		$this->makeUserAndAuthenticate();

		$guest = Guest::factory()->create();

		$guest->name = $newName = $this->faker->firstName();
		
		$this->putJson(route('api.guests.update', [$guest]), ["name" => $newName])->assertStatus(200);

		$this->assertEquals($guest->fresh()->name, $newName);
	}

	/** @test */
	public function an_guest_can_be_deleted()
	{
		$this->makeUserAndAuthenticate();

		$guest = Guest::factory()->create();

		$this->deleteJson(route('api.guests.destroy', [$guest]))
			->assertStatus(204);

		$this->assertCount(0, Guest::all());
	}
	
}
