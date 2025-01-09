<script setup>
import NavbarLayout from '@/Layouts/NavbarLayout.vue';
</script>

<template>
    <NavbarLayout>
        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <slot></slot>
            </div>
        </div>
    </NavbarLayout>
</template>
