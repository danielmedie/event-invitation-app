<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class AuthenticatedSessionController extends Controller
{
    /**
	 * Attempt to authenticate a new session.
	 *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function store(Request $request) : Response
	{
		$request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

		if (!auth('web')->attempt($request->only('email', 'password'),$request->boolean('remember'))) {
            throw ValidationException::withMessages([
			    'email' => ['These credentials do not match our records'],
			]);
        }

	    return response()->json($request->user());
	}

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Http\Responses\Contracts\LogoutResponse
     */
    public function destroy(Request $request)
    {
		auth('web')->logout();
		
		if($request->hasSession()){
			$request->session()->invalidate();
			$request->session()->regenerateToken();
		}

        return response()->noContent();
    }
}