<?php

use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

// Debug route to check if API is working
Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});

Route::middleware('auth:sanctum')->group(function () {
    // Blog routes
    Route::get('/posts', [BlogPostController::class, 'index']);
    Route::get('/posts/published', [BlogPostController::class, 'getPublishedPosts']);
    Route::get('/posts/{id}', [BlogPostController::class, 'show'])->where('id', '[0-9]+');
    Route::post('/posts/create', [BlogPostController::class, 'create']);
    Route::put('/posts/{id}', [BlogPostController::class, 'update'])->where('id', '[0-9]+');
    Route::post('/posts/upload-image', [BlogPostController::class, 'uploadImage']);
    Route::delete('/posts/delete-image/{path}', [BlogPostController::class, 'deleteImage']);
});

// Public routes
Route::get('/blog/{slug}', [BlogPostController::class, 'showBySlug']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/posts/published', [BlogPostController::class, 'getPublishedPosts']);

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
