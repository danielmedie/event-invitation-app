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
		'to'			=> '',
		'message'		=> null
	];

	public static function booted()
    {
        static::creating(function(Invitation $invitation)
        {
			if(!$invitation->code) {
				$invitation->code = str()->random(6);
			}
        });
    }

	public function guests(){
		return $this->hasMany(Guest::class);
    }
}
