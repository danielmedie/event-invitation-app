<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class AuthenticatedSessionController extends Controller
{
    /**
	 * Försök att autentisera en ny session.
	 *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function store(Request $request) : Response
	{
		// Validera inkommande data (e-post och lösenord krävs)
		$request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

		// Försök autentisera med e-post och lösenord
		if (!auth('web')->attempt($request->only('email', 'password'),$request->boolean('remember'))) {
            throw ValidationException::withMessages([
			    'email' => ['Dessa uppgifter matchar inte våra register'],
			]);
        }

	    // Returnera JSON-svar med autentiserad användare
	    return response()->json($request->user());
	}

    /**
     * Ta bort en autentiserad session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function destroy(Request $request)
    {
		// Logga ut användaren från webbgränssnittet
		auth('web')->logout();
		
		// Om sessionen finns, ogiltigförklara den och generera en ny token
		if($request->hasSession()){
			$request->session()->invalidate();
			$request->session()->regenerateToken();
		}

        // Returnera inget innehåll (204 No Content)
        return response()->noContent();
    }
}
