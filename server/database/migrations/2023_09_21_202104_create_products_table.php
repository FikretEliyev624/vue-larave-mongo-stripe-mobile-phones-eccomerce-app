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
        Schema::create('products', function (Blueprint $collection) {
            $collection->id();
            $collection->string('model');
            $collection->string('category');
            $collection->string('operatingSystem');
            $collection->integer('batteryLife');
            $collection->integer('price');
            $collection->integer('newPrice');
            $collection->integer('ram');
            $collection->integer('stock');
            $collection->string('image');
            $collection->integer('stock');
            $collection->float('screenSize');
            $collection->boolean('active')->default(true);
            $collection->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
