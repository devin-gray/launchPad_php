<script setup>
import { Head, Link, usePage } from '@inertiajs/vue3';
import NavbarLayout from '@/Layouts/NavbarLayout.vue';

const user = usePage().props.auth.user;
const isAdmin = user.roles.some(role => role.slug === 'admin');
</script>

<template>
    <NavbarLayout>
        <Head title="Dashboard" />
        <div class="container mx-auto px-4 py-8">
            <h2 class="text-2xl font-bold mb-6">Dashboard</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Article Management Card (Admin Only) -->
                <Link v-if="isAdmin" 
                    :href="route('blog-editor')" 
                    class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <h3 class="card-title">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Article Management
                        </h3>
                        <p>Create, edit, and manage your blog articles</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary btn-sm">Manage Articles →</button>
                        </div>
                    </div>
                </Link>

                <!-- Profile Card -->
                <Link :href="route('profile.edit')" class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <h3 class="card-title">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Profile Settings
                        </h3>
                        <p>Update your profile information and password</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary btn-sm">Edit Profile →</button>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    </NavbarLayout>
</template>
