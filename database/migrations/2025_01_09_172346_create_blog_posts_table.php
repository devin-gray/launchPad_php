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
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('content');
            $table->string('keywords')->nullable();
            $table->boolean('published')->default(false);
            $table->timestamp('publish_date')->nullable();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('preview_image')->nullable();
            $table->string('preview_image_path')->nullable();
            $table->text('summary')->nullable();
            $table->string('user_email');
            $table->uuid('user_id');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_posts');
    }
};