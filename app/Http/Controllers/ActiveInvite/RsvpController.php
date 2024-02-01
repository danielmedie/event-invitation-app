<?php

namespace App\Http\Controllers\ActiveInvite;

use App\Http\Controllers\Controller;
use App\Models\Guest;
use App\Models\Invitation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;

class RsvpController extends Controller
{
    /**
     * Uppdatera eventinbjudningen
     */
    public function update(Request $request, Guest $guest)
    {
        // Hämta den aktiva inbjudan
        $invitation = Invitation::getInvitationFromBearerToken($request->bearerToken());
        $guest = $invitation->guests()->where('guests.id', $guest->id)->first();

        // Kontrollera om den gäst som uppdateras är kopplad till den här inbjudan
        Gate::allowIf(fn() => !!$guest);

        // Validera indata
        $validated = $request->validate([
            'attending' => [
                'boolean',
                'present',
                'nullable',
            ],
        ]);

        // Uppdatera gästen med de validerade värdena
        $guest->update($validated);

        // Dölj vissa värden som inte ska visas för användaren
        $guest->setHidden(['updated_at', 'created_at', 'invitation_id']);

        return response()->json($guest);
    }
}
