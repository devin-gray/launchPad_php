<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import NavbarLayout from '@/Layouts/NavbarLayout.vue';
import FeaturesGrid from "@/Components/grids/features-grid.vue";

const props = defineProps({
    showNavbar: {
        type: Boolean,
        default: true
    }
})

console.log("Features navbar: ", props.showNavbar);
</script>

<template>
<div>
  <NavbarLayout v-if="props.showNavbar">
    <Head title="Features" />
    <div class="container mx-auto px-4 py-8">
      <div id="features" class="py-16">
        <h2 class="text-4xl font-bold my-6">Features</h2>
        <FeaturesGrid />
      </div>
    </div>
  </NavbarLayout>
  <div v-else>
    <Head title="Features" />
    <div class="container mx-auto px-4 py-8">
      <div id="features" class="py-16">
        <h2 class="text-4xl font-bold my-6">Features</h2>
        <FeaturesGrid />
      </div>
    </div>
  </div>
</div>
</template>

<style></style>
