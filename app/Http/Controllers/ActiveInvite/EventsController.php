<?php

namespace App\Http\Controllers\ActiveInvite;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventsController extends Controller
{
	public function show()
	{
		$event = new Event(config('event',[]));
		return response()->json($event);
	}
}
