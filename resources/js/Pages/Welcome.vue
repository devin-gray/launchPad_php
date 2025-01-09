<script setup>
import { Head } from '@inertiajs/vue3';
import NavbarLayout from '@/Layouts/NavbarLayout.vue';

defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
});
</script>

<template>
    <NavbarLayout>
        <Head title="Welcome" />
        <div class="container mx-auto px-4 py-8">
            <!-- Your page content here -->
        </div>
    </NavbarLayout>
</template>

<style>
/* Add this to create the grid pattern */
.bg-grid-slate-100 {
    background-image: linear-gradient(to right, rgb(241 245 249 / 0.1) 1px, transparent 1px),
        linear-gradient(to bottom, rgb(241 245 249 / 0.1) 1px, transparent 1px);
}
</style>
