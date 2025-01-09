<script setup>
import Navbar from '@/Components/Navbar.vue';
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';

const user = computed(() => usePage().props.auth.user);
</script>

<template>
    <div class="min-h-screen bg-base-200">
        <Navbar :user="user" />
        
        <!-- Add padding-top to account for fixed navbar -->
        <div class="pt-16">
            <slot></slot>
        </div>
    </div>
</template> 