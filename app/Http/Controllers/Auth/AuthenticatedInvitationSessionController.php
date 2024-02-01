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
	 * Hämta inbjudan om den är satt
	 *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function show(Request $request)
	{
		// Hämta bärande token från förfrågan
		$bearerToken = $request->bearerToken();

		// Hämta inbjudan baserat på bärande token
		$invitation = Invitation::getInvitationFromBearerToken($bearerToken);

		// Kontrollera om inbjudningen är autentiserad
		$isAuthenticated = $invitation && Invitation::isAuthenticated($invitation->code, $bearerToken);
		
		// Om autentiserad, hämta gäster för inbjudningen
		if ($isAuthenticated && $invitation) {
			$invitation->guests = $invitation->guests()->select(['id','name','attending','allergies'])->get();
		}

		// Returnera JSON-svar baserat på autentisering och inbjudningens status
		return response()->json($isAuthenticated && !!$invitation ? $invitation : false);
	}
	
	/**
	 * Försök att autentisera en inbjudan med bärande token.
	 *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function store(Request $request)
	{
		// Validera inkommande data (endast inbjudningskoden krävs)
		$request->validate(['code' => 'required|string']);

		// Hämta bärande token från förfrågan
		$bearerToken = $request->bearerToken();

		// Kontrollera om användaren redan är autentiserad (förfrågan med giltig token)
		$isAuthenticated = Invitation::isAuthenticated($request->code, $bearerToken);

		// Försök autentisera med inbjudningskoden om inte redan autentiserad
		try {
			if (!$isAuthenticated) {
				// Försök autentisera med kod och hämta bärande token
				$token = Invitation::authenticateWithCode($request->code);
				$bearerToken = $token->plainTextToken;
			}

			// Returnera oavkrypterad token
			return response()->json(['token' => $bearerToken]);
		} catch (Exception $e) {
			// Kasta undantag om autentiseringen misslyckas
			throw ValidationException::withMessages([
				'code' => ['Invitation code not found.'],
			]);
		}
	}

    /**
     * Ta bort inbjudningens åtkomsttoken.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function destroy(Request $request)
    {
		// Hämta inbjudning baserat på bärande token
		$invitation = Invitation::getInvitationFromBearerToken($request->bearerToken());

		// Kasta undantag om inbjudningen inte hittas
		if (!$invitation) {
			throw ValidationException::withMessages(['code' => ['Invitation code not found.']]);
		}

		// Ta bort alla åtkomsttoken för inbjudningen
		Invitation::deleteAccessTokensOnInvitation($invitation);

		// Returnera inget innehåll (204 No Content)
		return response()->noContent();
    }
}
