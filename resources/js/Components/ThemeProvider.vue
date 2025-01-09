<script setup>
import { useThemeStore } from '@/stores/themeStore';
import { watch } from 'vue';

const themeStore = useThemeStore();

// Watch for theme changes and update HTML data-theme attribute
watch(
    () => themeStore.getTheme,
    (newTheme) => {
        document.documentElement.setAttribute('data-theme', newTheme);
    },
    { immediate: true }
);
</script>

<template>
    <slot></slot>
</template> 