import { defineStore } from "pinia";
import type { IBlogPost } from "../models/blogPost.model";
import { ICategory } from "../models/category.model";
import axios from "axios";

export const useBlogStore = defineStore("blog", {
  state: () => ({
    currentPost: {} as IBlogPost,
    categories: [] as ICategory[]
  }),
  
  getters: {
    getCurrentPost(state) {
      return state.currentPost;
    },
    getCategories(state) {
      return state.categories;
    }
  },
  
  actions: {
    async fetchPost(id: string | number) {
      try {
        console.log('Fetching post:', id);
        const response = await axios.get(`/api/posts/${id}`);
        console.log('Post response:', response.data);
        
        if (response.data.success && response.data.data) {
          this.currentPost = response.data.data;
          return response.data.data;
        }
        
        console.error('Unexpected post response format:', response.data);
        return {} as IBlogPost;
      } catch (error) {
        console.error('Error fetching post:', error);
        return {} as IBlogPost;
      }
    },
    
    async fetchPostBySlug(slug: string) {
      try {
        const response = await axios.get(`/api/blog/${slug}`);
        if (response.data.success && response.data.data) {
          return response.data.data;
        }
        console.error('Unexpected blog post response format:', response.data);
        return {} as IBlogPost;
      } catch (error) {
        console.error('Error fetching blog post:', error);
        return {} as IBlogPost;
      }
    },
    
    async fetchPosts() {
      try {
        console.log('Fetching posts...');
        const response = await axios.get('/api/posts');
        console.log('Raw response:', response);
        
        // Check if response is HTML
        if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
          console.error('Received HTML response instead of JSON');
          console.error('HTML content:', response.data);
          return [];
        }
        
        if (response.data.success && Array.isArray(response.data.data)) {
          console.log('Number of posts:', response.data.data.length);
          return response.data.data;
        }
        
        console.error('Unexpected response format:', {
          type: typeof response.data,
          data: response.data,
          status: response.status
        });
        return [];
      } catch (error: any) {
        console.error('Error fetching posts:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        return [];
      }
    },
    
    async fetchCategories() {
      try {
        const response = await axios.get('/api/categories');
        if (response.data?.length > 0) {
          this.categories = response.data;
        }
        return response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
      }
    }
  }
});