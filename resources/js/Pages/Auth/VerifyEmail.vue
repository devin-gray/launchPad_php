<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import NavbarLayout from '@/Layouts/NavbarLayout.vue';

defineProps({
    status: {
        type: String,
    },
});

const form = useForm({});

const submit = () => {
    form.post(route('verification.send'));
};
</script>

<template>
    <NavbarLayout>
        <Head title="Email Verification" />

        <div class="container mx-auto px-4 py-8">
            <div class="flex justify-center">
                <div class="card w-full max-w-md bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h2 class="card-title justify-center text-2xl font-bold">Email Verification</h2>

                        <div class="mb-4 text-sm">
                            Thanks for signing up! Before getting started, could you verify your email address by clicking on
                            the link we just emailed to you? If you didn't receive the email, we will gladly send you
                            another.
                        </div>

                        <div v-if="status === 'verification-link-sent'" class="alert alert-success mb-4">
                            A new verification link has been sent to the email address you provided during registration.
                        </div>

                        <form @submit.prevent="submit">
                            <div class="flex items-center justify-between mt-4">
                                <button class="btn btn-primary" :disabled="form.processing">
                                    Resend Verification Email
                                </button>

                                <Link :href="route('logout')" method="post" as="button" class="btn btn-ghost">
                                    Log Out
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </NavbarLayout>
</template>
