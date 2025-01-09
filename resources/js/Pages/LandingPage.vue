<!-- For a one page website -->
<script setup lang="ts">
import Home from './Home.vue';
import Pricing from './Pricing.vue';
import Features from './Features.vue';
import DefaultFooter from '@/Components/footers/default-footer.vue';
import NavbarLayout from '@/Layouts/NavbarLayout.vue';
</script>

<template>
    <NavbarLayout>
        <div class="container mx-auto">
            <Home />
            <Features :showNavbar="false" />
            <Pricing :showNavbar="false" />
            <DefaultFooter />
        </div>
    </NavbarLayout>
</template>

<style></style>