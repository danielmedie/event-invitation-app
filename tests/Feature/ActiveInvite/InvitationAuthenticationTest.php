<?php

namespace Tests\Feature\ActiveInvite;

use App\Actions\Invitations\AuthenticateInvitation;
use App\Models\Invitation;
use Tests\TestCase;

class InvitationAuthenticationTest extends TestCase
{
	/** @test */
	public function can_authenticate_invitation_with_code()
	{
		$invitation = Invitation::create();

		$this->postJson(route('invite.login'), [ 'code' => $invitation->code ])
			->assertStatus(200);
		$this->assertCount(1,$invitation->tokens);
	}
	
	/** @test */
	public function attempting_login_when_already_authenticated_keeps_token()
	{
		$invitation = $this->makeInvitationAndAuthenticate();

		$this->postJson(route('invite.login'), [ 'code' => $invitation->code ])
			->assertStatus(200);
		
		$this->assertCount(1,$invitation->tokens);
	}

	/** @test */
	public function invitation_cannot_access_controller_unless_authorised()
	{
		$this->getJson(route('api.test.invite.ping'))
			->assertUnauthorized()
			->assertDontSeeText('pong');

		$invitation = $this->makeInvitationAndAuthenticate();
		$this->assertCount(1,$invitation->tokens);
		
		$this->getJson(route('api.test.invite.ping'))
			->assertOk()
			->assertSeeText('pong');
	}

	/** @test */
	public function invitation_cannot_use_bearer_token_if_expired()
	{
		$invitation = $this->makeInvitationAndAuthenticate();

		$this->travel(Invitation::TOKEN_EXPIRE_DAYS + 1)->days();
		
		$this->getJson(route('api.test.invite.ping'))
			->assertDontSeeText('pong');
	}

	/** @test */
	public function invitation_can_check_if_authenticated()
	{
		$invitation = $this->makeInvitationAndAuthenticate();
		
		$this->getJson(route('invite.login.show'))
			->assertStatus(200)
			->assertJsonFragment(['code' => $invitation->code ]);

		$this->travel(Invitation::TOKEN_EXPIRE_DAYS + 1)->days();

		$this->getJson(route('invite.login.show'))
			->assertStatus(200)
			->assertSeeText('false');
	}

	/** @test */
	public function invitation_can_logout()
	{
		$invitation = $this->makeInvitationAndAuthenticate();
		
		$this->postJson(route('invite.logout'))
			->assertNoContent();

		$this->assertCount(0,$invitation->tokens);
	}

	/** @test */
	public function invitation_cannot_access_admin_routes()
	{
		$invitation = $this->makeInvitationAndAuthenticate();
		
		$this->getJson(route('api.test.user.ping'))
			->assertDontSeeText('pong');
	}
}
