<script setup lang="ts">
import PostPreview from "@/Components/blog/post-preview.vue";
import { IBlogPost } from "@/models/blogPost.model";
import { ref, onMounted } from "vue";
import { useBlogStore } from "@/stores/blogStore";
import NavbarLayout from '@/Layouts/NavbarLayout.vue';
import { Head } from '@inertiajs/vue3';

// Get the post from props passed by the controller
const props = defineProps<{
  slug: string
}>();

const blogStore = useBlogStore();
const post = ref({} as IBlogPost);

onMounted(async () => {
  if (props.slug) {
    post.value = await blogStore.fetchPostBySlug(props.slug);
  }
});
</script>

<template>
  <NavbarLayout>
    <div class="container mx-auto px-4 py-8">
      <Head :title="post.title" />
    
    <div class="my-16">
      <h1
        class="article-title text-4xl font-extrabold leading-tight lg:mb-6 lg:text-6xl text-center"
      >
        {{ post.title }}
      </h1>
      <PostPreview :content="post.content" />
    </div>
    </div>
  </NavbarLayout>
</template>

<style></style>
