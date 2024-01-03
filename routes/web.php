<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any?}', fn() => view('ui'))
	->where(['any' => '.*'])
	->name('app');