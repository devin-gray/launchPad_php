<script setup lang="ts">
import { useThemeStore } from '../../stores/themeStore';
import imageOne from '@/assets/easy-launch.png';
import imageTwo from '@/assets/productivity.png';
import imageThree from '@/assets/laptoplaunch.png';
import { computed } from 'vue';

const isSmallScreen = computed(() => window.innerWidth < 600);

const themeStore = useThemeStore();
</script>

<!-- vars -->
<template>
<div class="text-center min-h-full my-16">
  <div class="flex justify-center w-full mb-12"><img class="max-w-64" :src="imageThree" alt="office content 2"></div>

    <h1
    class="my-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl"
    :class="{'text-white': themeStore.getDarkMode}"
  >
    Jumpstart Your Next Launch With launchPad
  </h1>

<button class="btn btn-primary">
    Get started
    <svg class="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
    </svg>
  </button> 

<div class="flex justify-around" v-if="!isSmallScreen">
            <img class="max-w-64" :src="imageOne" alt="office content 1">
            <img class="max-w-64" :src="imageTwo" alt="office content 2">
        </div>
</div>
</template>

<style></style>
