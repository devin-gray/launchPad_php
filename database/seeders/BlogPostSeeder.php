<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        // Get the first user (assuming you have at least one)
        $user = User::first();
        
        // Get all category IDs
        $categoryIds = Category::pluck('id')->toArray();

        $posts = [
            [
                'title' => 'Getting Started with Laravel',
                'slug' => 'getting-started-with-laravel',
                'content' => '# Introduction to Laravel

Laravel is a web application framework with expressive, elegant syntax...',
                'keywords' => 'laravel,php,web development',
                'published' => true,
                'publish_date' => now(),
                'category_id' => $categoryIds[4], // Programming
                'summary' => 'A beginner-friendly guide to Laravel framework',
                'user_email' => $user->email,
                'user_id' => Str::uuid()->toString(), // Convert to UUID string
            ],
            [
                'title' => 'Best Coffee Shops in Town',
                'slug' => 'best-coffee-shops-in-town',
                'content' => '# Coffee Lovers Guide

Discover the hidden gems for coffee enthusiasts...',
                'keywords' => 'coffee,cafes,food',
                'published' => true,
                'publish_date' => now(),
                'category_id' => $categoryIds[2], // Food
                'summary' => 'Exploring local coffee shops and their unique offerings',
                'user_email' => $user->email,
                'user_id' => Str::uuid()->toString(), // Convert to UUID string
            ],
            [
                'title' => 'Tech Trends 2024',
                'slug' => 'tech-trends-2024',
                'content' => '# Future of Technology

Exploring the upcoming technology trends...',
                'keywords' => 'technology,trends,2024',
                'published' => false,
                'publish_date' => null,
                'category_id' => $categoryIds[0], // Technology
                'summary' => 'A look at emerging technology trends for 2024',
                'user_email' => $user->email,
                'user_id' => Str::uuid()->toString(), // Convert to UUID string
            ],
        ];

        foreach ($posts as $post) {
            BlogPost::create($post);
        }
    }
} 