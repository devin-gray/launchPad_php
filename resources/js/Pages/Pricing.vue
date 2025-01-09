<script setup lang="ts">
// import PricingCard from "../components/cards/pricing-card.vue";
import PricingGrid from "@/Components/grids/pricing-grid.vue";
import { Head } from '@inertiajs/vue3';
import NavbarLayout from '@/Layouts/NavbarLayout.vue';

const props = defineProps({
    showNavbar: {
        type: Boolean,
        default: true
    }
})
</script>

<template>
  <div>
    <NavbarLayout v-if="props.showNavbar">
    <Head title="Pricing" />
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-4xl font-bold my-6">Pricing</h2>
      <!-- Multiple Pricing Options -->
      <PricingGrid />

      <!-- Single Pricing Option -->
      <!-- <PricingCard /> -->
    </div>
  </NavbarLayout>
  <div v-else>
    <Head title="Pricing" />
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-4xl font-bold my-6">Pricing</h2>
      <!-- Multiple Pricing Options -->
      <PricingGrid />

      <!-- Single Pricing Option -->
      <!-- <PricingCard /> -->
    </div>
  </div>
  </div>
</template>

<style></style>
