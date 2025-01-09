<script setup lang="ts">
import "md-editor-v3/lib/style.css";
import { MdPreview } from "md-editor-v3";
import { useThemeStore } from "../../stores/themeStore";
import { ref } from "vue";

const props = defineProps(["content"]);
const themeStore = useThemeStore();
const previewTheme = ref("github");
// Themes: default, github, vue-press, mk-cute, smart-blue
</script>

<template>
  <MdPreview
    :modelValue="props.content"
    :theme="themeStore.getDarkMode ? 'dark' : 'light'"
    :previewTheme="previewTheme"
    language="en-US"
  />
</template>

<style></style>
