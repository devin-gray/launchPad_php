<script setup lang="ts">
import type { IBlogPost } from '../../models/blogPost.model';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useBlogStore } from '../../stores/blogStore';

// vars
const articles = ref([] as IBlogPost[])
const blogStore = useBlogStore();

// Hooks
onMounted(async () => {
    articles.value = await blogStore.fetchPosts() as IBlogPost[];
})
</script>

<template>
    <section class="max-w-screen min-h-screen">
            <aside aria-label="Published articles" class="w-full">
                <div class="px-4 max-w-screen">  
                    <div class="flex justify-center">
                        <h1 class="mb-20 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">Published Articles</h1>
                    </div>
                    <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                        <article v-for="item in articles" class="max-w-xs">
                            <a :href="`/blog/${item.slug}`">
                                <img :src="item.preview_image" class="mb-5 rounded-lg" alt="Image 1">
                            </a>
                            <h2 class="mb-2 text-xl font-bold leading-tight">
                                <a href="#">{{ item.title }}</a>
                            </h2>
                            <p class="mb-4">{{ item.summary }}</p>
                            <a :href="`/blog/${item.slug}`" class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
                                Read
                            </a>
                        </article>
                    </div>
                </div>
            </aside>
    </section>
</template>

<style>

</style>