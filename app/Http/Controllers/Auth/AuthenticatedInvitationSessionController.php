<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AuthenticatedInvitationSessionController extends Controller
{
	/**
	 * Get Invitation if set
	 *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function show(Request $request)
	{
		$bearerToken = $request->bearerToken();

		$invitation = Invitation::getInvitationFromBearerToken($bearerToken);

		$isAuthenticated = $invitation && Invitation::isAuthenticated($invitation->code, $bearerToken);
		
		if($isAuthenticated && $invitation) {
			$invitation->load(['guests' => fn($q) => $q->select(['id','name']) ]);
		}

		return response()->json($isAuthenticated && !!$invitation ? $invitation : false);
	}
	
	/**
	 * Attempt to authenticate an invitation with bearer token.
	 *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function store(Request $request)
	{
		$request->validate(['code' => 'required|string']);

		$bearerToken = $request->bearerToken();

		// Check if they are already authenticated (request with valid token)
		$isAuthenticated = Invitation::isAuthenticated($request->code, $bearerToken);

		//
		try {
			// if not authenticated, attempt to Authenticate with code
			if(!$isAuthenticated) {
				$token = Invitation::authenticateWithCode($request->code);
				$bearerToken = $token->plainTextToken;
			}

			// Return unencrypted
			return response()->json([ 'token' => $bearerToken ]);
		} 
		catch (Exception $e) {
			throw ValidationException::withMessages([
				'code' => ['Invitation code not found.'],
			]);
		}

	}

    /**
     * Destroy an invitations access Tokens.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function destroy(Request $request)
    {
		$invitation = Invitation::getInvitationFromBearerToken($request->bearerToken());

		if(!$invitation) {
			throw ValidationException::withMessages(['code' => ['Invitation code not found.']]);
		}

		Invitation::deleteAccessTokensOnInvitation($invitation);

		return response()->noContent();
    }
}