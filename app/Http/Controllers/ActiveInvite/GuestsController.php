<?php

namespace App\Http\Controllers\ActiveInvite;

use App\Http\Controllers\Controller;
use App\Models\Guest;
use App\Models\Invitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class GuestsController extends Controller
{
    /**
     * Visa listan över gäster på den aktiva inbjudan
     */
    public function index(Request $request)
    {
        // Hämta den aktiva inbjudan
        $invitation = Invitation::getInvitationFromBearerToken($request->bearerToken());

        // Hämta gästerna och dölj vissa attribut
        $guests = $invitation->guests()->get()->map->setHidden(['updated_at', 'created_at', 'invitation_id']);

        return response()->json($guests);
    }

    /**
     * Visa en specifik gäst på den aktiva inbjudan
     */
    public function show(Request $request, Guest $guest)
    {
        // Hämta den aktiva inbjudan
        $invitation = Invitation::getInvitationFromBearerToken($request->bearerToken());

        // Hämta den specifika gästen för den här inbjudan
        $guest = $invitation->guests()->where('guests.id', $guest->id)->first();

        // Kontrollera om den frågade gästen är kopplad till den här inbjudan
        Gate::allowIf(fn() => !!$guest);

        // Dölj vissa värden som inte ska visas för användaren
        $guest->setHidden(['updated_at', 'created_at', 'invitation_id']);

        return response()->json($guest);
    }

    /**
     * Uppdatera en gäst på den aktiva inbjudan
     */
    public function update(Request $request, Guest $guest)
    {
        // Hämta den aktiva inbjudan
        $invitation = Invitation::getInvitationFromBearerToken($request->bearerToken());

        // Hämta den specifika gästen för den här inbjudan
        $guest = $invitation->guests()->where('guests.id', $guest->id)->first();

        // Kontrollera om den gäst som uppdateras är kopplad till den här inbjudan
        Gate::allowIf(fn() => !!$guest);

        // Validera indata
        $validated = $request->validate([
            'allergies' => ['nullable', 'string', 'max:2048']
        ]);

        // Uppdatera gästen med de validerade värdena
        $guest->update($validated);

        // Dölj vissa värden som inte ska visas för användaren
        $guest->setHidden(['updated_at', 'created_at', 'invitation_id']);

        return response()->json($guest);
    }
}
