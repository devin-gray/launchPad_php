<!-- For a one page website -->
<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import NavbarLayout from '@/Layouts/NavbarLayout.vue';
import BlogGrid from '@/Components/blog/blog-grid.vue';
</script>

<template>
    <NavbarLayout>
        <Head title="Blog" />
        <div class="container mx-auto px-4 py-8">
            <BlogGrid />
        </div>
    </NavbarLayout>
</template>

<style></style>