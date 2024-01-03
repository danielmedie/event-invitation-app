<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventsController extends Controller
{
	public function index()
	{
		$events = config('events',[]);
		return response()->json($events);
	}

	public function show($eventId)
	{
		$selected = collect(config('events',[]))
			->first(function($event) use ($eventId) {
				return $event['id'] == $eventId;
			});

		$event = new Event($selected);
		
		return response()->json($event);
	}
}
