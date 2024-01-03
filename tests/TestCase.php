<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication,
		RefreshDatabase;

	/**
	 * Decode Response
	 */
	protected function content($response, $asArray = true)
	{
		return json_decode($response->content(), !!$asArray) ?? $response->content();
	}

	/**
	 * Make a User
	 * @return  \App\Models\User
	 */
	protected function makeUser($args = [])
	{
		$user = User::factory()->create($args);
		return $user;
	}

	/**
	 * Create a User and Authenticate with Token
	 * @return  \App\Models\User
	 */
	protected function makeUserAndAuthenticate($args = [])
	{
		$user = $this->makeUser($args);
		$this->actingAs($user, 'api');
		return $user;
	}

	// /**
	//  * Create a Invitation and Authenticate with Token
	//  * @return  \App\Models\Invitation
	//  */
	// protected function makeInvitationAndAuthenticate(array|Invitation $args = [])
	// {
	// 	if($args instanceof Invitation) {
	// 		$invitation = $args;
	// 	} else {
	// 		$invitation = Invitation::create(array_merge(['code' => 'CODE'],$args));
	// 	}

	// 	$token = app(AuthenticateInvitation::class)->createTokenAndSaveCookie($invitation);
	// 	$this->withToken($token->plainTextToken);

	// 	app('auth')->shouldUse('sanctum');
		
	// 	return $invitation;
	// }
}
