<script setup lang="ts">
import CheckIcon from '../icons/check.vue';
// import CloseCircleIcon from '../icons/close-circle.vue';
// import stores
import { useThemeStore } from "../../stores/themeStore";
const themeStore = useThemeStore();
</script>

<template>
  <div class="card w-96 shadow-xl" :class="themeStore.getDarkMode ? 'bg-base-200': 'bg-base-100'">
    <div class="card-body">
      <!-- features with checks -->
        <h5 class="mb-4 text-xl font-medium">launchPad</h5>
        <div class="flex items-baseline">
          <span class="text-3xl font-semibold">$</span>
          <span class="text-5xl font-extrabold tracking-tight">65</span>
          <span class="ms-1 text-xl font-normal">LIFETIME ACCESS</span>
        </div>
        <ul role="list" class="space-y-5 my-7">
          <li class="flex items-center">
            <CheckIcon class=" text-accent" />
            <span class="text-base font-normal leading-tight ms-3"
              >Blog✔</span
            >
          </li>
          <li class="flex items-center">
            <CheckIcon class=" text-accent" />
            <span class="text-base font-normal leading-tight ms-3"
              >Auth✔</span
            >
          </li>
          <li class="flex items-center">
            <CheckIcon class=" text-accent" />
            <span class="text-base font-normal leading-tight ms-3"
              >Supabase✔</span
            >
          </li>
          <li class="flex items-center">
            <CheckIcon class=" text-accent" />
            <span class="text-base font-normal leading-tight ms-3"
              >Stripe✔</span
            >
          </li>
          <li class="flex items-center">
            <CheckIcon class=" text-accent" />
            <span class="text-base font-normal leading-tight ms-3"
              >Admin Dash✔</span
            >
          </li>
          <li class="flex items-center">
            <CheckIcon class=" text-accent" />
            <span class="text-base font-normal leading-tight ms-3"
              >CMS✔</span
            >
          </li>
          
          <!-- <li class="flex items-center line-through text-neutral">
            <CloseCircleIcon />
            <span class="text-base font-normal leading-tight ms-3"
              >Dash✔</span
            >
          </li> -->
        </ul>
        <a
          type="button"
          class="btn btn-primary"
          href="#"
        >
          Purchase
      </a>
    </div>
  </div>
</template>

<style></style>
