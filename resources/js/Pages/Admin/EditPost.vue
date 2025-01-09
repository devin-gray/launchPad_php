<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { IBlogPost } from "@/models/blogPost.model";
import { useBlogStore } from "@/stores/blogStore";
import { ICategory } from "@/models/category.model";
import { debounce } from "@/utils";
import MarkdownEditor from "@/Components/blog/markdown-editor.vue";
import { MdPreview } from "md-editor-v3";
import { useThemeStore } from "@/stores/themeStore";
import NavbarLayout from '@/Layouts/NavbarLayout.vue';
import { Head, router } from '@inertiajs/vue3';
import axios from 'axios';

const props = defineProps<{
  postId: string
}>();

const post = ref({} as IBlogPost);
const categories = ref([] as ICategory[]);
const isLoading = ref(true);
const debouncedSave = debounce(savePost, 1200);
const isSmallScreen = computed(() => window.innerWidth < 600);
const blogStore = useBlogStore();
const themeStore = useThemeStore();

onMounted(async () => {
  console.log('PostId:', props.postId);
  
  if (props.postId) {
    const fetchedPost = await blogStore.fetchPost(props.postId);
    console.log('Fetched post:', fetchedPost);
    if (fetchedPost) {
      post.value = fetchedPost;
    }
  }

  // Fetch categories
  categories.value = await blogStore.fetchCategories();
  isLoading.value = false;
});

async function savePost() {
  try {
    const updatedPost = {
      content: post.value.content,
      summary: post.value.summary,
      title: post.value.title,
      slug: post.value.slug,
      keywords: post.value.keywords,
      category_id: post.value.category_id,
      published: post.value.published,
      preview_image: post.value.preview_image,
      preview_image_path: post.value.preview_image_path
    };

    const response = await axios.put(`/api/posts/${post.value.id}`, updatedPost);

    if (response.data.success) {
      console.log("Blog post saved successfully:", response.data);
      return { success: true, message: "Blog post saved successfully." };
    }

    throw new Error(response.data.message);
  } catch (err: any) {
    console.error("Unexpected error:", err.message);
    return { success: false, message: "Unexpected error occurred." };
  }
}

async function uploadPreviewImage() {
  const fileInput: any = document.getElementById('preview_img_input');
  const file = fileInput.files[0];

  if(file) {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('/api/posts/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        post.value.preview_image = response.data.url;
        post.value.preview_image_path = response.data.path;
        savePost();
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  }
}

async function deletePreviewImage() {
  try {
    const response = await axios.delete(`/api/posts/delete-image/${post.value.preview_image_path}`);
    
    if (response.data.success) {
      post.value.preview_image = '';
      post.value.preview_image_path = '';
      savePost();
    }
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}
</script>

<template>
  <NavbarLayout>
    <Head title="Edit Post" />
    
    <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <div v-else class="container mx-auto px-4 py-8">
      <div class="overflow-x-auto">
        <div class="flex justify-between my-8">
          <h2 class="text-4xl font-bold">Edit Post</h2>
          <div class="flex">
            <div class="form-control">
              <label class="cursor-pointer label">
                <input
                  type="checkbox"
                  v-model="post.published"
                  @change="debouncedSave"
                  class="checkbox checkbox-xs checkbox-success"
                />
                <span class="label-text px-2">Published</span>
              </label>
            </div>
            <div
              v-show="post.published"
              @click="router.visit(`/blog/${post.slug}`)"
              class="ml-5 py-1 hover:cursor-pointer"
            >
              <svg
                data-tooltip-target="tooltip-published-article"
                class="w-6 h-6 hover:text-gray-500 dark:hover:text-slate-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-width="2"
                  d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                />
                <path
                  stroke="currentColor"
                  stroke-width="2"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="my-4 flex">
          <div class="flex">
            <div>
              <label for="title">Title</label>
              <br />
              <input
              @input="debouncedSave"
                id="title"
                type="text"
                placeholder="My Post"
                class="input input-bordered input-xs w-sm max-w-xs"
                v-model="post.title"
              />
            </div>
            <div>
              <label for="slug" class="mx-2">Slug</label>
              <br />
              <input
              @input="debouncedSave"
                id="slug"
                type="text"
                placeholder="my-post"
                class="input input-bordered input-xs w-sm max-w-xs mx-2"
                v-model="post.slug"
              />
            </div>
            <div v-if="!isSmallScreen">
              <label for="keywords">Keywords</label>
              <br />
              <input
              @input="debouncedSave"
                id="keywords"
                type="text"
                placeholder="saas, technology, business..."
                class="input input-bordered input-xs w-sm max-w-xs"
                v-model="post.keywords"
              />
            </div>
          </div>
        </div>
        <div v-if="isSmallScreen">
            <label for="keywords">Keywords</label>
            <br />
            <input
            @input="debouncedSave"
              id="keywords"
              type="text"
              placeholder="saas, technology, business..."
              class="input input-bordered input-xs w-sm max-w-xs"
              v-model="post.keywords"
            />
          </div>
        <MarkdownEditor
          v-if="!post.published && post.content"
          language="en-US"
          v-model="post.content"
          :onChange="debouncedSave"
          :preview="!isSmallScreen"
          :isEditor="true"
        />
        <div v-if="isSmallScreen || post.published">
          <h2
            class="block py-4 mt-5 text-xl text-center font-extrabold leading-none tracking-tight md:text-5xl lg:text-4xl"
          >
            Article Preview:
          </h2>
          <div
            class="w-full max-h-96 shadow-md rounded-lg p-4 overflow-y-auto mb-5"
          >
            <MdPreview :modelValue="post.content" :theme="themeStore.getDarkMode ? 'dark' : 'light'" />
          </div>
        </div>

        <!-- post preview -->
        <div :class="{'lg:grid lg:grid-cols-2 lg:gap-5 lg:mt-10': !post.published}">
                <!-- preview the article -->
                <div class="w-full py-4">
                  <h2 class="block text-xl text-center font-extrabold leading-none tracking-tight md:text-3xl lg:text-3xl">Clip Preview:</h2>
                  <!-- select image -->
                  <section v-if="!post.preview_image" class="p-5 w-full">
                    <label class="block mb-2 text-sm font-medium" for="file_input">Preview Image</label>
                    <input @input="uploadPreviewImage()" class="file-input file-input-bordered file-input-xs w-full max-w-xs" aria-describedby="file_input_help" id="preview_img_input" type="file">
                    <p class="mt-1 text-sm text-gray-500" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                  </section>
                  <!-- preview image -->
                  <section v-if="post.preview_image" class="max-w-screen p-5">
                      <aside aria-label="Published articles" class="w-full flex justify-center">
                          <div class="px-4 max-w-md">
                              <div class="grid gap-12 sm:grid-cols-1 lg:grid-cols-1">
                                  <article class="w-full">
                                        <button v-if="!post.published" @click="deletePreviewImage" class=" mb-10 inline-flex items-center font-medium underline underline-offset-4 text-red-600 dark:text-red-500 hover:no-underline">
                                          Remove Image
                                        </button>
                                        <a href="#">
                                          <img :src="post.preview_image" class="mb-5 rounded-lg" alt="Image 1">
                                        </a>
                                      <h2 class="mb-2 text-xl font-bold leading-tight">
                                          <a href="#">{{ post.title }}</a>
                                      </h2>
                                      <p class="mb-4 font-light text-gray-500">{{ post.summary }}</p>
                                      <a href="#" class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
                                          Read
                                      </a>
                                  </article>
                              </div>
                          </div>
                      </aside>
                  </section>
                </div>
                <!-- Summary for article -->
                <div v-if="!post.published" class="w-full p-4">
                  <div class="grid place-items-center">
                    <h1 for="summary" class="block mb-5 text-xl text-center font-extrabold leading-none tracking-tight md:text-3xl lg:text-3xl">Article Summary/Excerpt</h1>
                    <textarea id="summary" v-model="post.summary" @input="debouncedSave" rows="4" class="block w-full max-w-lg text-sm rounded-lg p-2 bg-base-200" placeholder="Write your thoughts here..."></textarea>
                  </div>
                </div>
              </div>
      </div>
    </div>
  </NavbarLayout>
</template>

<style></style>
