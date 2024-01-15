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
     * Display list of guests on active invitation
     */
    public function index(Request $request)
    {
		// Get the Invitation being used
		$invitation = Invitation::getInvitationFromBearerToken($request->bearerToken());

		$guests = $invitation->guests()->get()->map->setHidden(['updated_at','created_at','invitation_id']);
		
		return response()->json($guests);
    }

    /**
     * Display specified guest on active inviation
     */
    public function show(Request $request, Guest $guest)
    {
		$invitation = Invitation::getInvitationFromBearerToken($request->bearerToken());
		$guest = $invitation->guests()->where('guests.id',$guest->id)->first();

		// Check if the guest being queried is on this invitation
		Gate::allowIf(fn() => !!$guest);

		// Set Values we dont want to show to the user
		$guest->setHidden(['updated_at','created_at','invitation_id']);

        return response()->json($guest);
    }

	/**
     * Update a guest on active invitation
     */
    public function update(Request $request, Guest $guest)
    {
		$invitation = Invitation::getInvitationFromBearerToken($request->bearerToken());
		$guest = $invitation->guests()->where('guests.id',$guest->id)->first();

		// Check if the guest being updated is on this invitation
		Gate::allowIf(fn() => !!$guest);

		$validated = $request->validate([
			'allergies' => ['nullable','string','max:2048']
		]);

    	$guest->update($validated);

		// Set Values we dont want to show to the user
		$guest->setHidden(['updated_at','created_at','invitation_id']);
        
		return response()->json($guest);
    }
}
