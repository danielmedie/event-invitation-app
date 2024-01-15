<?php 

namespace Tests\Feature\Admin;

use App\Models\Event;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;

class EventTest extends TestCase
{
	use WithFaker;

	/** @test */
	public function can_build_event()
	{
		$event = config('event');
		$event = new Event($event);
		$this->assertEquals($event->name,'Examensfest');
	}

	/** @test */
	public function you_need_to_be_authenticated_to_view_the_event()
	{
		$this->getJson(route('api.event.show'))
			->assertUnauthorized();
	}

	/** @test */
	public function you_can_view_a_the_event()
	{
		$this->makeUserAndAuthenticate();

		$this->getJson(route('api.event.show'))
			->assertStatus(200);
	}

	
}
