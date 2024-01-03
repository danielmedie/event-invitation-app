<?php

use App\Http\Controllers\Admin\GuestsController;
use App\Http\Controllers\Admin\InvitationsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware'=>'auth:api'],function(){

	Route::group(['prefix'=>'/guests'],function(){
		Route::get('/',[GuestsController::class,'index'])->name('api.guests.index');
		Route::get('/{guest}',[GuestsController::class,'show'])->name('api.guests.show');
		Route::post('/',[GuestsController::class,'store'])->name('api.guests.store');
		Route::put('/{guest}',[GuestsController::class,'update'])->name('api.guests.update');
		Route::delete('/{guest}',[GuestsController::class,'destroy'])->name('api.guests.destroy');
	});

	Route::group(['prefix'=>'/invitations'],function(){
		Route::get('/',[InvitationsController::class,'index'])->name('api.invitations.index');
		Route::get('/{invitation}',[InvitationsController::class,'show'])->name('api.invitations.show');
		Route::post('/',[InvitationsController::class,'store'])->name('api.invitations.store');
		Route::put('/{invitation}',[InvitationsController::class,'update'])->name('api.invitations.update');
		Route::delete('/{invitation}',[InvitationsController::class,'destroy'])->name('api.invitations.destroy');
	});
	
});