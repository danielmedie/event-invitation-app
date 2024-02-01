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
    use HasFactory, HasApiTokens;

    const TOKEN_NAME = 'invitation_token';
    const TOKEN_ABILITIES = ['invitation'];
    const TOKEN_EXPIRE_DAYS = 90;

    // Tillåt alla fält att massassignment
    protected $guarded = [];

    // Standardvärden för inbjudningsattributen
    protected $attributes = [
        'code'      => '',
        'to'        => '',
        'message'   => null,
    ];

    // Utför åtgärder när Invitation-modellen startas
    public static function booted()
    {
        static::creating(function (Invitation $invitation) {
            // Om ingen kod anges generera en slumpmässig kod
            if (!$invitation->code) {
                $invitation->code = Str::random(6);
            }
        });
    }

    // Relation mellan inbjudan och gäster
    public function guests()
    {
        return $this->hasOne(Guest::class);
    }

    /* ======= Access Token ======= */

    /**
     * Kontrollera om användaren är autentiserad
     * 
     * Om en giltig Bearer Token skickas och är relaterad till en
     * inbjudan med matchande kod, anses användaren autentiserad.
     */
    public static function isAuthenticated(string $code, ?string $bearerToken = null): bool
    {
        // Ingen Bearer Token, ej autentiserad
        if (!$bearerToken) {
            return false;
        }

        // Hämta token
        $token = self::getAccessTokenFromBearerToken($bearerToken);
        if (!$token) {
            return false;
        }

        // Hämta inbjudan kopplad till token
        $invitation = $token->tokenable;
        if ($invitation->code != $code) {
            return false;
        }

        // Om token eller kakan har gått ut radera den
        if ($token && $token->expires_at->isPast()) {
            $token->delete();
            return false;
        }

        return true;
    }

    /**
     * Autentisera en inbjudan
     * 
     * Om koden matchar en befintlig inbjudan skapas en ny
     * åtkomsttoken och returneras.
     */
    public static function authenticateWithCode(string $code = null): NewAccessToken
    {
        // Validera koden
        Validator::make(
            ['code' => $code ?? ''],
            ['code' => 'required|string']
        )->validate();

        $invitation = Invitation::where('code', $code)->first() ?? null;
        if (!$invitation) {
            throw ValidationException::withMessages(['code' => ['Giltig inbjudan hittades inte.']]);
        }

        $newToken = self::createNewAccessToken($invitation);
        return $newToken;
    }

    /**
     * Skapa en ny åtkomsttoken för inbjudan
     */
    public static function createNewAccessToken(Invitation $invitation): NewAccessToken
    {
        return $invitation->createToken(self::TOKEN_NAME, self::TOKEN_ABILITIES, Carbon::now()->addDays(self::TOKEN_EXPIRE_DAYS));
    }

    /**
     * Radera åtkomsttoken för en specifik inbjudan
     */
    public static function deleteAccessTokensOnInvitation(Invitation $invitation)
    {
        PersonalAccessToken::where('name', self::TOKEN_NAME)
            ->whereHasMorph('tokenable', [Invitation::class], fn ($q) => $q->where('id', $invitation->id))
            ->delete();
    }

    /**
     * Hämta åtkomsttoken från Bearer Token
     */
    public static function getAccessTokenFromBearerToken(string $bearerToken): ?PersonalAccessToken
    {
        if (Str::contains($bearerToken, '|')) {
            [$tokenId, $token] = explode('|', $bearerToken, 2);
            $bearerToken = $token;
        }
        return PersonalAccessToken::where('token', hash('sha256', $bearerToken))->first() ?? null;
    }

    /**
     * Hämta inbjudan från Bearer Token
     */
    public static function getInvitationFromBearerToken(?string $bearerToken = null): ?static
    {
        if (!$bearerToken) {
            return null;
        }

        // Hämta Token
        $accessToken = self::getAccessTokenFromBearerToken($bearerToken);
        if (!$accessToken) {
            return null;
        }

        // Hämta inbjudan från token
        $invitation = $accessToken->tokenable;
        if (!$invitation instanceof Invitation) {
            return null;
        }

        return $invitation;
    }
}
