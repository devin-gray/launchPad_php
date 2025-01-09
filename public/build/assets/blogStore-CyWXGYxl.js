import{S as o,k as s}from"./app-BkwNIxsC.js";const n=o("blog",{state:()=>({currentPost:{},categories:[]}),getters:{getCurrentPost(r){return r.currentPost},getCategories(r){return r.categories}},actions:{async fetchPost(r){try{console.log("Fetching post:",r);const t=await s.get(`/api/posts/${r}`);return console.log("Post response:",t.data),t.data.success&&t.data.data?(this.currentPost=t.data.data,t.data.data):(console.error("Unexpected post response format:",t.data),{})}catch(t){return console.error("Error fetching post:",t),{}}},async fetchPostBySlug(r){try{const t=await s.get(`/api/blog/${r}`);return t.data.success&&t.data.data?t.data.data:(console.error("Unexpected blog post response format:",t.data),{})}catch(t){return console.error("Error fetching blog post:",t),{}}},async fetchPosts(){var r,t;try{console.log("Fetching posts...");const e=await s.get("/api/posts");return console.log("Raw response:",e),typeof e.data=="string"&&e.data.includes("<!DOCTYPE html>")?(console.error("Received HTML response instead of JSON"),console.error("HTML content:",e.data),[]):e.data.success&&Array.isArray(e.data.data)?(console.log("Number of posts:",e.data.data.length),e.data.data):(console.error("Unexpected response format:",{type:typeof e.data,data:e.data,status:e.status}),[])}catch(e){return console.error("Error fetching posts:",{message:e.message,response:(r=e.response)==null?void 0:r.data,status:(t=e.response)==null?void 0:t.status}),[]}},async fetchCategories(){var r;try{const t=await s.get("/api/categories");return((r=t.data)==null?void 0:r.length)>0&&(this.categories=t.data),t.data}catch(t){return console.error("Error fetching categories:",t),[]}}}});export{n as u};
