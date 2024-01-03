<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('guests', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('name_tag')->nullable();
            $table->unsignedBigInteger('invitation_id')->nullable();
            $table->mediumText('allergies')->nullable();
            $table->timestamps();

			$table->foreign('invitation_id')->references('id')->on('invitations')->onDelete('cascade');
        });
    }
	
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guests');
    }
};
