<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Technology'],
            ['name' => 'Travel'],
            ['name' => 'Food'],
            ['name' => 'Lifestyle'],
            ['name' => 'Programming'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
} 