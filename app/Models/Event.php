<?php

namespace App\Models;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Database\Eloquent\Model;

class Event implements Arrayable
{
    // Lagrar data för evenemanget
    protected array $data = [];

    // Attribut med standardvärden för evenemanget
    protected $attributes = [
        'id'            => null,
        'name'          => null,
        'event_date'    => null,
        'rsvp_date'     => null,
        'location'      => null,
        'image'         => null,
        'content'       => '',
    ];

    /**
     * Konstruktörsfunktion som initierar evenemanget med givna attribut eller standardvärden.
     *
     * @param array $attributes
     */
    public function __construct(array $attributes = [])
    {
        // Iterera genom attributen och sätt värden baserat på givna attribut eller standardvärden
        foreach ($this->attributes as $key => $default) {
            $this->data[$key] = $attributes[$key] ?? $default;
        }
    }

    /**
     * Magisk metod för att hämta värden för attributen dynamiskt.
     *
     * @param string $name
     * @return mixed|null
     */
    public function __get($name)
    {
        // Returnera värdet för det efterfrågade attributet om det finns, annars null
        if (isset($this->data[$name])) {
            return $this->data[$name];
        }
    }

    /**
     * Konvertera evenemanget till en array.
     * @return array
     */
    public function toArray()
    {
        return $this->data;
    }
}
