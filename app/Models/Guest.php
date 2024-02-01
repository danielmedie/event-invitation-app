<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    use HasFactory;

    // Tillåt alla fält att massassignment
    protected $guarded = [];

    // Standardvärden för gästattributen
    protected $attributes = [
        'name'          => '',
        'name_tag'      => null,
        'invitation_id' => null,
        'attending'     => null,
        'allergies'     => null,
    ];

    // Utför åtgärder när Guest-modellen startas
    public static function booted()
    {
        /**
         * Även om en inbjudan kan ha flera gäster relaterade till den,
         * tillåter frontend för närvarande bara en gäst åt gången.
         * Därför skapar vi en ny inbjudan varje gång en ny gäst skapas.
         * 
         * Detta kan utökas i framtiden om det finns ett behov av
         * flera gäster på en inbjudan.
         */
        static::creating(function (Guest $guest) {
            if (!$guest->invitation_id) {
                $invitation = new Invitation([
                    'to' => $guest->name,
                ]);
                $invitation->save();
                $guest->invitation_id = $invitation->id;
            }
        });

        /** 
         * Se till att radera inbjudan när gästen raderas
         */
        static::deleting(function (Guest $guest) {
            $guest->invitation->delete();
        });
    }

    // Definiera relationen mellan gäst och inbjudan
    public function invitation()
    {
        return $this->belongsTo(Invitation::class);
    }
}
