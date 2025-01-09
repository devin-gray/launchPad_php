<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Throwable;

class BlogPostController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $posts = BlogPost::with('category')
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $posts->toArray(),
                'count' => $posts->count()
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch posts',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(string $id): JsonResponse
    {
        try {
            $post = BlogPost::with('category')->findOrFail($id);
            
            return response()->json([
                'success' => true,
                'data' => $post->toArray()
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Post not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function create(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'category_id' => 'required|exists:categories,id',
                'content' => 'required|string',
                'published' => 'boolean'
            ]);

            $user = auth()->user();

            // Debug logging
            \Log::info('User details:', [
                'id' => $user->id,
                'type' => gettype($user->id),
                'user' => $user->toArray()
            ]);

            // Create post without user_id first
            $post = new BlogPost([
                'title' => $validated['title'],
                'category_id' => $validated['category_id'],
                'content' => $validated['content'],
                'published' => $validated['published'] ?? false,
                'slug' => \Str::slug($validated['title']),
                'user_email' => $user->email,
            ]);

            // Associate the post with the user using the relationship
            $user->blogPosts()->save($post);

            return response()->json([
                'success' => true,
                'data' => $post->load('category'),
                'message' => 'Post created successfully'
            ], 201);
        } catch (Throwable $e) {
            \Log::error('Post creation failed:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to create post',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, string $id): JsonResponse
    {
        try {
            $post = BlogPost::findOrFail($id);
            
            $validated = $request->validate([
                'title' => 'sometimes|string|max:255',
                'slug' => 'sometimes|string|max:255',
                'content' => 'sometimes|string',
                'summary' => 'sometimes|nullable|string',
                'keywords' => 'sometimes|nullable|string',
                'category_id' => 'sometimes|exists:categories,id',
                'published' => 'sometimes|boolean',
                'preview_image' => 'sometimes|nullable|string',
                'preview_image_path' => 'sometimes|nullable|string',
            ]);

            $post->update($validated);

            return response()->json([
                'success' => true,
                'data' => $post->fresh()->load('category'),
                'message' => 'Post updated successfully'
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update post',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function uploadImage(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'image' => 'required|image|max:2048', // 2MB max
            ]);

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $path = $file->store('blog-images', 'public');
                
                return response()->json([
                    'success' => true,
                    'url' => Storage::url($path),
                    'path' => $path,
                    'message' => 'Image uploaded successfully'
                ]);
            }

            throw new \Exception('No image file provided');
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload image',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteImage(string $path): JsonResponse
    {
        try {
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
                
                return response()->json([
                    'success' => true,
                    'message' => 'Image deleted successfully'
                ]);
            }

            throw new \Exception('Image not found');
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete image',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function showBySlug(string $slug): JsonResponse
    {
        try {
            $post = BlogPost::with('category')
                ->where('slug', $slug)
                ->firstOrFail();
            
            return response()->json([
                'success' => true,
                'data' => $post
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Post not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function getPublishedPosts(): JsonResponse
    {
        try {
            $posts = BlogPost::with('category')
                ->where('published', true)
                ->orderBy('publish_date', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $posts->toArray(),
                'count' => $posts->count()
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch published posts',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 