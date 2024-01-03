<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invitation extends Model
{
    use HasFactory;

	protected $guarded = [];

	protected $attributes = [
		'code'			=> '',
		'message'		=> null
	];

	public function guests(){
		return $this->hasMany(Guest::class);
    }
}
