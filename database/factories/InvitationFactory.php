<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\Invitation;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class InvitationFactory extends Factory
{
	/**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Invitation::class;

    
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
			'code'				=> Str::random(6),
			'message'			=> $this->faker->boolean(80) ? $this->faker->paragraphs(1,true) : null,
        ];
    }
}
