<?php 

namespace Tests\Feature;

use App\Models\Event;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;

class EventTest extends TestCase
{
	use WithFaker;

	/** @test */
	public function can_build_event()
	{
		$event = config('events')[0];
		$event = new Event($event);
		$this->assertEquals($event->name,'Examensfest');
	}

	/** @test */
	public function you_need_to_be_authenticated_to_view_events()
	{
		$this->getJson(route('api.events.index'))
			->assertUnauthorized();
	}

	/** @test */
	public function can_view_events()
	{
		$this->makeUserAndAuthenticate();

		$res = $this->getJson(route('api.events.index'));
		$res->assertJsonCount(1);
	}

	/** @test */
	public function you_can_view_a_single_event()
	{
		$this->makeUserAndAuthenticate();

		$this->getJson(route('api.events.show', [1]))
			->assertStatus(200)
			->assertJsonFragment(['id' => 1]);
	}

	
}
