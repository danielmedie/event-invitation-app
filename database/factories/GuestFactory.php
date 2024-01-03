<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\Guest;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class GuestFactory extends Factory
{
	/**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Guest::class;

    
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
			'name'				=> ($firstName = $this->faker->firstName()).' '.($this->faker->lastName()),
			'invitation_id'		=> null,
			'attending'			=> $this->faker->boolean(75) ? $this->faker->boolean(50) : null,
			'name_tag'			=> $this->faker->boolean(75) ? $firstName : null,
			'allergies'			=> $this->faker->boolean(30) ? $this->faker->paragraphs(2,true) : null,
        ];
    }
}
