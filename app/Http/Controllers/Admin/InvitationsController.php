<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use Illuminate\Http\Request;

class InvitationsController extends Controller
{
    // Hämtar alla inbjudningar
    public function index()
    {
        $invitations = Invitation::all();
        return response()->json($invitations);
    }

    // Visar detaljer för en specifik inbjudan
    public function show(Invitation $invitation)
    {
        return response()->json($invitation);
    }

    // Lagrar en ny inbjudan
    public function store(Request $request)
    {
        // Validerar inkommande data från begäran
        $validated = $request->validate([
            'code' => ['required'], 
            'message' => [
                'string',
                'sometimes', 
                'nullable',
                'max:255', 
            ],
        ]);

        // Skapar en ny inbjudan med de validerade attributen
        $invitation = new Invitation([
            'code' => $request->code,
            'message' => $request->message,
        ]);
        
        // Sparar den nya inbjudan i databasen
        $invitation->save();

        // Returnerar den sparade inbjudan som JSON med statuskod 201 (Created)
        return response()->json($invitation, 201);
    }

    // Uppdaterar en befintlig inbjudan
    public function update(Invitation $invitation, Request $request)
    {
        // Validerar inkommande data från begäran
        $validated = $request->validate([
            'code' => ['required'], 
            'message' => [
                'string',
                'sometimes', 
                'nullable', 
                'max:255', 
            ],
        ]);

        // Uppdaterar den befintliga inbjudan med de validerade attributen
        $invitation->update($validated);

        // Returnerar den uppdaterade inbjudan som JSON med statuskod 200 (OK)
        return response()->json($invitation, 200);
    }

    // Tar bort en inbjudan
    public function destroy(Invitation $invitation)
    {
        // Tar bort den valda inbjudan från databasen
        $invitation->delete();

        // Returnerar ett tomt svar med statuskod 204 (No Content)
        return response()->noContent();
    }
}
