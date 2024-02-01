<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventsController extends Controller
{
    // Visar information om det aktuella evenemanget
    public function show()
    {
        // Skapar en ny händelse (Event) med konfigurationsdata från config('event', [])
        $event = new Event(config('event', []));

        // Returnerar informationen om evenemanget som JSON
        return response()->json($event);
    }
}
