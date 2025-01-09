<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Index');
    }

    public function userManagement()
    {
        return Inertia::render('Admin/UserManagement');
    }

    public function blog()
    {
        return Inertia::render('Admin/BlogEditor');
    }

    public function editPost($id)
    {
        return Inertia::render('Admin/EditPost', [
            'postId' => $id
        ]);
    }
} 