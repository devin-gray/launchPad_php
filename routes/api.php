<?php

use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

// Debug route to check if API is working
Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});

// Blog routes
Route::get('/posts', [BlogPostController::class, 'index']);
Route::get('/blog/{slug}', [BlogPostController::class, 'showBySlug']);
Route::get('/posts/{id}', [BlogPostController::class, 'show']);
Route::put('/posts/{id}', [BlogPostController::class, 'update']);
Route::post('/posts/upload-image', [BlogPostController::class, 'uploadImage']);
Route::delete('/posts/delete-image/{path}', [BlogPostController::class, 'deleteImage']);
Route::get('/categories', [CategoryController::class, 'index']);

// Debug route
Route::get('/debug-posts', function () {
    try {
        return response()->json([
            'post_count' => \App\Models\BlogPost::count(),
            'database_name' => DB::connection()->getDatabaseName(),
            'connection_working' => DB::connection()->getPdo() ? true : false,
            'sample_post' => \App\Models\BlogPost::first()
        ]);
    } catch (\Throwable $e) {
        return response()->json([
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ], 500);
    }
});
