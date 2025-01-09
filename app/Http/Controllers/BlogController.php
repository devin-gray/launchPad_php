<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index()
    {
        return BlogPost::select('id', 'published', 'title', 'category_id', 'summary', 'slug', 'preview_image')
            ->get();
    }

    public function show(string $slug): Response
    {
        $post = BlogPost::with('category')
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('PublishedPost', [
            'slug' => $slug
        ]);
    }

    public function showBySlug($slug)
    {
        return BlogPost::where('slug', $slug)->firstOrFail();
    }

    public function update(Request $request, $id)
    {
        $post = BlogPost::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'slug' => 'required|string',
            'summary' => 'nullable|string',
            'keywords' => 'nullable|string',
            'category_id' => 'nullable|integer',
            'published' => 'boolean',
            'preview_image' => 'nullable|string',
            'preview_image_path' => 'nullable|string',
        ]);

        $post->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Post updated successfully',
            'data' => $post
        ]);
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048'
        ]);

        $path = $request->file('image')->store('blog/images', 'public');
        $url = asset('storage/' . $path);

        return response()->json([
            'success' => true,
            'url' => $url,
            'path' => $path
        ]);
    }

    public function deleteImage($path)
    {
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
            
            return response()->json([
                'success' => true,
                'message' => 'Image deleted successfully'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Image not found'
        ], 404);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'category_id' => 'required|integer',
            'published' => 'boolean',
            'slug' => 'nullable|string',
            'summary' => 'nullable|string',
            'keywords' => 'nullable|string',
        ]);

        // Generate slug if not provided
        if (!isset($validated['slug'])) {
            $validated['slug'] = \Str::slug($validated['title']);
        }

        $post = BlogPost::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Post created successfully',
            'data' => $post
        ]);
    }
} 