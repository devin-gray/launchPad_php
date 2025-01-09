<script setup lang="ts">
import { onMounted, ref } from "vue";
import NavbarLayout from '@/Layouts/NavbarLayout.vue';
import { Head, router } from '@inertiajs/vue3';
import { useBlogStore } from "@/stores/blogStore";
import type { ICategory } from "@/models/category.model";
import { IBlogPost } from "@/models/blogPost.model";
import axios from 'axios';

const blogStore = useBlogStore();

const posts = ref([] as any[]);
const categories = ref([] as ICategory[]);
const selectedCategory = ref({} as ICategory);
const newArticleTitle = ref("");
const newCategoryName = ref("");
const error = ref("");
const successBanner = ref("");

onMounted(async () => {
  posts.value = await blogStore.fetchPosts();
  categories.value = await blogStore.fetchCategories();
});

function editPost(post: any) {
  router.visit(`/admin/edit-post/${post.id}`);
}

async function createNewArticle() {
  try {
    // Validate form data
    if (!newArticleTitle.value || !selectedCategory.value.id) {
      error.value = "A title and category are required for a new article.";
      setTimeout(() => {
        error.value = "";
      }, 3000);
      return;
    }

    const newArticle = {
      title: newArticleTitle.value,
      category_id: selectedCategory.value.id,
      content: '# New Blog Post',
      published: false
    };

    const response = await axios.post('/api/posts/create', newArticle);

    if (response.data.success) {
      console.log("Article created:", response.data);
      router.visit(`/admin/edit-post/${response.data.data.id}`);
    } else {
      throw new Error(response.data.message || 'Failed to create article');
    }
  } catch (err: any) {
    console.error("Error creating article:", err.response?.data || err);
    error.value = err.response?.data?.message || err.message || "Failed to create article";
    setTimeout(() => {
      error.value = "";
    }, 3000);
  }
}

async function createNewCategory() {
  try {
    // Validate form data
    if (!newCategoryName.value) {
      error.value = "A category name is required.";
      setTimeout(() => {
        error.value = "";
      }, 3000);
      return;
    }

    const response = await axios.post('/api/categories', {
      name: newCategoryName.value
    });

    if (response.data.success) {
      console.log("Category created:", response.data);
      successBanner.value = "Category Successfully Created";
      categories.value.push(response.data.data);
      setTimeout(() => {
        successBanner.value = "";
      }, 3000);
    } else {
      throw new Error(response.data.message);
    }
  } catch (err: any) {
    console.error("Error creating category:", err);
    error.value = err.message;
    setTimeout(() => {
      error.value = "";
    }, 3000);
  }
}
</script>

<template>
  <NavbarLayout>
    <Head title="Blog Editor" />
    
    <div class="container mx-auto px-4 py-8">
      <div class="overflow-x-auto">
        <div v-if="error" role="alert" class="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{{ error }}</span>
        </div>
        <div v-if="successBanner" role="alert" class="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{{ successBanner }}</span>
        </div>
        <div class="flex justify-between">
          <h2 class="text-4xl font-bold my-6">Articles</h2>
          <div class="flex">
            <button
              class="btn btn-primary btn-sm my-6"
              onclick="new_article_modal.showModal()"
            >
              New Article
            </button>
            <button
              class="btn btn-secondary btn-sm my-6 mx-2"
              onclick="new_category_modal.showModal()"
            >
              New Category
            </button>
          </div>
        </div>
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Status</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="hover cursor-pointer"
              v-for="(post, index) in posts"
              :key="index"
              @click="editPost(post)"
            >
              <th>{{ index + 1 }}</th>
              <td>{{ post.title }}</td>
              <td v-if="post.published" class="text-success">Published</td>
              <td v-else class="text-error">Draft</td>
              <td>{{ categories.find((x) => x.id == post.category_id)?.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modals -->
      <dialog id="new_article_modal" class="modal">
        <div class="modal-box">
          <h3 class="text-lg font-bold text-center">Create Article</h3>
          <!-- xs -->
          <div class="flex justify-around">
            <div class="m-4">
              <label for="title-modal">Title</label><br />
              <input
                id="title-modal"
                type="text"
                placeholder="New Article Title"
                class="input input-bordered input-sm max-w-xs mt-2"
                v-model="newArticleTitle"
                required
              />
            </div>
            <div class="m-4">
              <label for="category-modal">Category</label><br />
              <select
                id="category-modal"
                type="text"
                placeholder="New Article Title"
                class="select select-bordered select-sm max-w-xs mt-2"
                v-model="selectedCategory"
                required
              >
                <option v-for="category in categories"  :key="category.id" :value="category">
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn btn-error mx-2">Cancel</button>
              <button class="btn btn-primary" @click="createNewArticle">
                Create
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="new_category_modal" class="modal">
        <div class="modal-box">
          <h3 class="text-lg font-bold">New Category</h3>
          <div class="m-4">
              <label for="title-modal">Name</label><br />
              <input
                id="title-modal"
                type="text"
                placeholder="New Category Name"
                class="input input-bordered input-sm max-w-xs mt-2"
                v-model="newCategoryName"
                required
              />
            </div>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn btn-error mx-2">Cancel</button>
              <button class="btn btn-primary" @click="createNewCategory">
                Create
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  </NavbarLayout>
</template>

<style></style>
