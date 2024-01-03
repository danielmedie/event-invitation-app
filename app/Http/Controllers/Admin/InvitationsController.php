<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use Illuminate\Http\Request;

class InvitationsController extends Controller
{
	public function index()
	{
		$invitations = Invitation::all();
		return response()->json($invitations);
	}

	public function show(Invitation $invitation)
	{
		return response()->json($invitation);
	}

	public function store(Request $request)
	{
		$validated = $request->validate([
			'code' => [
				'missing'
			],
			'message' => [
				'string',
				'sometimes',
				'nullable',
				'max:255'		
			]
		]);

		$invitation = new Invitation([
			'code'				=> $request->code,
			'message'			=> $request->message
		]);
		$invitation->save();

		return response()->json($invitation,201);
	}

	public function update(Invitation $invitation, Request $request)
	{
		$validated = $request->validate([
			'code' => [
				'missing'
			],
			'message' => [
				'string',
				'sometimes',
				'nullable',
				'max:255'		
			]
		]);

		$invitation->update($validated);

		return response()->json($invitation,200);
	}

	public function destroy(Invitation $invitation)
	{
		$invitation->delete();
		return response()->noContent();
	}
}
