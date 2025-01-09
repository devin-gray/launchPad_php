<script setup lang="ts">
    import { MdEditor } from 'md-editor-v3';
    import 'md-editor-v3/lib/style.css';
    import { useThemeStore } from '@/stores/themeStore';
    import axios from 'axios';

    // set stores
    const themeStore = useThemeStore();

    // props
    const props = defineProps({
        preview: Boolean
    })
    console.log(props)

    // functions

    async function uploadImage(files: any, callback: any) {
        try {
            const currentTime = Date.now();
            const res = await Promise.all(
                files.map(async (file: any) => {
                    const formData = new FormData();
                    formData.append('image', file);

                    const response = await axios.post('/api/posts/upload-image', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    if (!response.data.success) {
                        throw new Error(response.data.message);
                    }

                    return response.data;
                })
            );

            // Return array of image URLs for the markdown editor
            callback(res.map((item) => item.url));
        } catch (error) {
            console.error('Error uploading images:', error);
            callback([]);
        }
    }

</script>
  
<template>
    <MdEditor @onUploadImg="uploadImage" :theme="themeStore.getDarkMode ? 'dark' : 'light'" language="en-US" :preview="preview" />
</template>

<style>

</style>
