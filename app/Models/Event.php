<?php

namespace App\Models;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Database\Eloquent\Model;

class Event implements Arrayable
{
    protected array $data = [];
	
    protected $attributes = [
		'id' 					=> null,
		'name' 					=> null,
		'event_date' 			=> null,
		'rsvp_date' 			=> null,
		'location' 				=> null,
		'image'					=> null,
		'content' 				=> '',
	];

	public function __construct(array $attributes = []) 
	{
		foreach($this->attributes as $key => $default) {
			$this->data[$key] = $attributes[$key] ?? $default;
		}
	}

	public function __get($name)
	{
		if(isset($this->data[$name])) {
			return $this->data[$name];
		}
	}

	public function toArray()
	{
		return $this->data;
	}

}
