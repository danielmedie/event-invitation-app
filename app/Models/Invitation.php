<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\{HasApiTokens, NewAccessToken, PersonalAccessToken};

class Invitation extends Model
{
    use HasFactory,
		HasApiTokens;
	
	const TOKEN_NAME = 'invitation_token';
	const TOKEN_ABILITIES = ['invitation'];
	const TOKEN_EXPIRE_DAYS = 90;

	protected $guarded = [];

	protected $attributes = [
		'code'			=> '',
		'to'			=> '',
		'message'		=> null
	];

	public static function booted()
    {
        static::creating(function(Invitation $invitation)
        {
			if(!$invitation->code) {
				$invitation->code = str()->random(6);
			}
        });
    }

	public function guests(){
		return $this->hasMany(Guest::class);
    }

    /* ======= Access Token ======= */

	/**
	 * Check if they are autheticated
	 * 
	 * If the are sending a valid bearer token and it is related to an
	 * invitation that matches the code, then it is authenticated
	 */
	public static function isAuthenticated(string $code, ?string $bearerToken = null) : bool
	{
		// No Bearer Token, not authenticated
		if(!$bearerToken) {
			return false;
		}

		// Get the Token
		$token = self::getAccessTokenFromBearerToken($bearerToken);
		if(!$token) {
			return false;
		}

		// Get invitation on Token
		$invitation = $token->tokenable;
		if($invitation->code != $code) {
			return false;
		}

		// If we have a token and it or the cokie is expired delete it
		if($token && $token->expires_at->isPast()) {
			$token->delete();
			return false;
		}

		return true;
	}

	/**
	 * Authenticate an invitation
	 * 
	 * If the code connects to an invitation that exists, then we create
	 * a new Access token and return int
	 */
	public static function authenticateWithCode(string $code = null) : NewAccessToken
	{
		// Validate
		Validator::make(
			[ 'code' => $code ?? ''],
			[ 'code' => 'required|string']
		)->validate();

		$invitation = Invitation::where('code', $code)->first() ?? null;
		if(!$invitation) {
			throw ValidationException::withMessages(['code' => ['Valid Invitation not found.']]);
		}
		
		$newToken = self::createNewAccessToken($invitation);
		return $newToken;
	}

	/**
	 * Create Token for Authentication
	 * 
	 * Passing an invtation will create a new access token for the invitation
	 * Unencrypted token can be access with `plainTextToken`
	 */
	public static function createNewAccessToken(Invitation $invitation) : NewAccessToken
	{
		return $invitation->createToken(self::TOKEN_NAME,self::TOKEN_ABILITIES,Carbon::now()->addDays(self::TOKEN_EXPIRE_DAYS));
	}

	/**
	 * Delete Tokens for specific invitation
	 */
	public static function deleteAccessTokensOnInvitation(Invitation $invitation)
	{
		PersonalAccessToken::where('name',self::TOKEN_NAME)
			->whereHasMorph('tokenable',[Invitation::class], fn($q) => $q->where('id',$invitation->id))
			->delete();
	}

	/**
	 * Get Personal Access Token From Bearer Token
	 * 
	 * Use the bearer token to find the Access Token in the database
	 */
	public static function getAccessTokenFromBearerToken(string $bearerToken) : ?PersonalAccessToken
	{
		if(Str::contains($bearerToken,'|')) {
			[$tokenId, $token] = explode('|', $bearerToken, 2);
			$bearerToken = $token;
		}
		return PersonalAccessToken::where('token', hash('sha256', $bearerToken))->first() ?? null;
	}

	/**
	 * Use the bearer token to find the invition its connected to
	 */
	public static function getInvitationFromBearerToken(?string $bearerToken = null) : ?static
	{
		if(!$bearerToken) {
			return null;
		}

		// Get Token
		$accessToken = self::getAccessTokenFromBearerToken($bearerToken);
		if(!$accessToken) {
			return null;
		}
		
		// Get Invitation from Token
		$invitation = $accessToken->tokenable;
		if(!$invitation instanceof Invitation) {
			return null;
		}

		return $invitation;
	}
}
