<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Guest;
use Illuminate\Http\Request;

class GuestsController extends Controller
{
    // Hämtar alla gäster inklusive deras inbjudningar
    public function index()
    {
        $guests = Guest::with('invitation')->get();
        return response()->json($guests);
    }

    // Visar detaljer för en specifik gäst
    public function show(Guest $guest)
    {
        return response()->json($guest);
    }

    // Lagrar en ny gäst i databasen
    public function store(Request $request)
    {
        // Validerar inkommande data från begäran
        $validated = $request->validate([
            'name' => [
                'string',
                'required',
                'max:65',
                'min:2',
            ],
            'name_tag' => [
                'string',
                'sometimes', 
                'nullable', 
                'max:65',
            ],
            'invitation_id' => [
                'sometimes', 
                'nullable', 
                'exists:invitations,id', 
            ],
            'allergies' => [
                'sometimes',
                'nullable', 
                'string',
                'max:1000',
            ],
        ]);

        // Skapar en ny gäst med de validerade attributen
        $guest = new Guest([
            'name' => $request->name,
            'name_tag' => $request->name_tag,
            'invitation_id' => $request->invitation_id ?? null,
            'allergies' => $request->allergies,
        ]);

        // Sparar den nya gästen i databasen
        $guest->save();

        // Returnerar den sparade gästen som JSON med statuskod 201 (Created)
        return response()->json($guest, 201);
    }

    // Uppdaterar en befintlig gäst
    public function update(Guest $guest, Request $request)
    {
        // Validerar inkommande data från begäran
        $validated = $request->validate([
            'name' => [
                'string',
                'sometimes', 
                'max:65',
                'min:2',
            ],
            'name_tag' => [
                'string',
                'sometimes',
                'nullable', 
            ],
            'invitation_id' => [
                'sometimes', 
                'nullable', 
                'exists:invitations,id', 
            ],
            'allergies' => [
                'sometimes', 
                'nullable', 
                'string',
                'max:1000',
            ],
        ]);

        // Uppdaterar den befintliga gästen med de validerade attributen
        $guest->update($validated);

        // Returnerar den uppdaterade gästen som JSON med statuskod 200 (OK)
        return response()->json($guest, 200);
    }

    // Tar bort en gäst från databasen
    public function destroy(Guest $guest)
    {
        // Tar bort den valda gästen från databasen
        $guest->delete();

        // Returnerar ett tomt svar med statuskod 204 (No Content)
        return response()->noContent();
    }
}
