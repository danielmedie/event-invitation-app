<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Database\Factories\UserFactory;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
	/** @test */
	public function a_user_can_authenticate_using_their_email_and_password()
	{
		$user = User::factory()->create();

		$this->post(route('login'), [
			'email' => $user->email,
			'password' => UserFactory::$defaultPassword,
		]);

		$this->assertAuthenticated();
	}

	/** @test */
	public function a_user_can_not_authenticate_with_invalid_password()
	{
		$user = User::factory()->create();

		$this->post(route('login'), [
			'email' => $user->email,
			'password' => 'wrong-password',
		])->assertSessionHasErrors(['email']);

		$this->assertGuest();
	}

	/** @test */
	public function get_the_authenticated_users_data()
	{
		$user = $this->makeUserAndAuthenticate();
		
		$response = $this->getJson(route('api.user.self'))
			->assertStatus(200)
			->assertJsonFragment([ 'id' => $user->id ]);
	}

	/** @test */
	public function test_that_an_authenticated_user_can_access_admin_routes()
	{		
		$user = $this->makeUserAndAuthenticate();

		$this->getJson(route('api.test.user.ping'))
			->assertStatus(200)
			->assertSeeText('pong');

	}
}
