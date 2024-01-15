<?php

namespace App\Http\Controllers\ActiveInvite;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Guest;
use App\Models\Invitation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;

class RsvpController extends Controller
{
	/**
     * Update the eventInvite
     */
    public function update(Request $request, Guest $guest)
    {
		$invitation = Invitation::getInvitationFromBearerToken($request->bearerToken());
		$guest = $invitation->guests()->where('guests.id',$guest->id)->first();

		// Check if the guest being updated is on this invitation
		Gate::allowIf(fn() => !!$guest);
		
		// Get the Event
		$event = new Event(config('event',[]));

		if(!$event->event_date) {
			throw ValidationException::withMessages(['event_date' => 'Unable to set RSVP when there is no date for the event.']);
		}
		if(!$event->rsvp_date) {
			throw ValidationException::withMessages(['rsvp_date' => 'Unable to set RSVP at this time.']);
		}
		if(Carbon::parse($event->rsvp_date)->isPast()) {
			throw ValidationException::withMessages(['rsvp_date' => 'RSVP date has passed.']);
		}

		$validated = $request->validate([
			'attending' => [
				'boolean',
				'present',
				'nullable',
			],
		]);

		$guest->update($validated);

		// Set Values we dont want to show to the user
		$guest->setHidden(['updated_at','created_at','invitation_id']);

        return response()->json($guest);
    }
}
