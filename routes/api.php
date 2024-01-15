<?php

use App\Http\Controllers\ActiveInvite;
use App\Http\Controllers\Admin;
use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\Route;

Route::post('/login', [Auth\AuthenticatedSessionController::class, 'store'])
	->name('login');

});

Route::group(['middleware'=>'auth:web'],function(){

	// API Ping for testing
	Route::get('ping/invite', function() {return 'pong';})
		->name('api.test.user.ping');

	// Authenticated User
	Route::get('/user', fn() => response()->json(request()->user()) )
		->name('api.user.self');
	
	// Logout
	Route::post('/logout', [Auth\AuthenticatedSessionController::class, 'destroy'])
		->name('logout');

	// Admin Guest CRUD
	Route::group(['prefix'=>'/guests'],function(){
		Route::get('/',[Admin\GuestsController::class,'index'])->name('api.guests.index');
		Route::get('/{guest}',[Admin\GuestsController::class,'show'])->name('api.guests.show');
		Route::post('/',[Admin\GuestsController::class,'store'])->name('api.guests.store');
		Route::put('/{guest}',[Admin\GuestsController::class,'update'])->name('api.guests.update');
		Route::delete('/{guest}',[Admin\GuestsController::class,'destroy'])->name('api.guests.destroy');
	});

	// Admin Invitation CRUD
	Route::group(['prefix'=>'/invitations'],function(){
		Route::get('/',[Admin\InvitationsController::class,'index'])
			->name('api.invitations.index');
		Route::get('/{invitation}',[Admin\InvitationsController::class,'show'])
			->name('api.invitations.show');
		Route::post('/',[Admin\InvitationsController::class,'store'])
			->name('api.invitations.store');
		Route::put('/{invitation}',[Admin\InvitationsController::class,'update'])
			->name('api.invitations.update');
		Route::delete('/{invitation}',[Admin\InvitationsController::class,'destroy'])
			->name('api.invitations.destroy');
	});

	// Get the hard-coded event
	Route::get('/event',[Admin\EventsController::class,'show'])
		->name('api.event.show');
	
});

Route::group(['middleware'=>'auth:api'],function(){

	Route::group(['prefix'=>'/guests'],function(){
		Route::put('/{guest}/allergies',[GuestsController::class,'updateAllergies'])->name('api.invite.guests.update');
		Route::put('/{guest}/attendance',[GuestsController::class,'updateAttendance'])->name('api.invite.guests.attendance');
	});

	Route::group(['prefix'=>'/events'],function(){
		Route::get('/',[EventsController::class,'index'])->name('api.invite.events.index');
		Route::get('/{event}',[EventsController::class,'show'])->name('api.invite.events.show');
	});
	
});