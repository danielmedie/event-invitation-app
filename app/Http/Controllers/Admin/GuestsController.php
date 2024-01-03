<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Guest;
use Illuminate\Http\Request;

class GuestsController extends Controller
{
	public function index()
	{
		$guests = Guest::all();
		return response()->json($guests);
	}

	public function show(Guest $guest)
	{
		return response()->json($guest);
	}

	public function store(Request $request)
	{
		$validated = $request->validate([
			'name' => [
				'string',
				'required',
				'max:65',
				'min:2'
			],
			'name_tag' => [
				'string',
				'sometimes',
				'nullable',
				'max:65'		
			],
			'invitation_id' => [
				'sometimes',
				'nullable',
				'exists:invitations,id'
			],
			'allergies' => [
				'sometimes',
				'nullable',
				'string',
				'max:1000',
			],
		]);

		$guest = new Guest([
			'name'				=> $request->name,
			'name_tag'			=> $request->name_tag,
			'invitation_id'		=> $request->invitation_id ?? null,
			'allergies'			=> $request->allergies,
		]);
		$guest->save();

		return response()->json($guest,201);
	}

	public function update(Guest $guest, Request $request)
	{
		$validated = $request->validate([
			'name' => [
				'string',
				'sometimes',
				'max:65',
				'min:2'
			],
			'name_tag' => [
				'string',
				'sometimes',
				'nullable',
				'max:65'
			],
			'invitation_id' => [
				'sometimes',
				'nullable',
				'exists:invitations,id'
			],
			'allergies' => [
				'sometimes',
				'nullable',
				'string',
				'max:1000',
			],
		]);

		$guest->update($validated);

		return response()->json($guest,200);
	}

	public function destroy(Guest $guest)
	{
		$guest->delete();
		return response()->noContent();
	}
}
