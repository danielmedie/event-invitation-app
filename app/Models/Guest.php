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
		/**
		 * Whilst the an invitation can have multiple guests related
		 * to it. The frontend only allows for a single guest at the
		 * moment. So we create an new invitation whenever a new 
		 * guest is created.
		 * 
		 * This can be extended in the futurer if there is a need for
		 * multiple guests on one invitation
		 */
		static::creating(function(Guest $guest){
			if(!$guest->invitation_id) {
				$invitation = new Invitation([
					'to' => $guest->name
				]);
				$invitation->save();
				$guest->invitation_id = $invitation->id; 
			}
		});
		
		/** 
		 * Make sure to delete the invitation when the guest is deleted
		 */
		static::deleting(function(Guest $guest){
			$guest->invitation->delete();
		});
	}

	public function invitation(){
		return $this->belongsTo(Invitation::class);
    }
}
