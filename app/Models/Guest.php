<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    use HasFactory;

	protected $guarded = [];

	protected $attributes = [
		'name'				=> '',
		'name_tag'			=> null,
		'invitation_id'		=> null,
		'attending'			=> null,
		'allergies'			=> null,
	];

	public static function booted() 
	{
		static::creating(function(Guest $guest){
			if(!$guest->invitation_id) {
				$invitation = new Invitation([
					'to' => $guest->name
				]);
				$invitation->save();
				$guest->invitation_id = $invitation->id; 
			}
		});
	}

	public function invitation(){
		return $this->belongsTo(Invitation::class);
    }
}
