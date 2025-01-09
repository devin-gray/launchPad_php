<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        // Get the admin user's ID (assuming it exists)
        $adminUser = User::where('email', 'admin@example.com')->first();

        // Example blog post
        BlogPost::create([
            'title' => 'Getting Started with Laravel',
            'slug' => 'getting-started-with-laravel',
            'content' => "# Introduction to Laravel\n\nLaravel is a web application framework with expressive, elegant syntax...",
            'keywords' => 'laravel,php,web development',
            'published' => true,
            'publish_date' => now(),
            'category_id' => 5, // Make sure this category exists
            'summary' => 'A beginner-friendly guide to Laravel framework',
            'user_email' => $adminUser->email,
            'user_id' => $adminUser->id  // This will now be a regular integer ID
        ]);

        // Add more seed posts if needed...
    }
} 