<script setup>
import { Head, useForm } from '@inertiajs/vue3';
import NavbarLayout from '@/Layouts/NavbarLayout.vue';

defineProps({
    status: {
        type: String,
    },
});

const form = useForm({
    email: '',
});

const submit = () => {
    form.post(route('password.email'));
};
</script>

<template>
    <NavbarLayout>
        <Head title="Forgot Password" />

        <div class="container mx-auto px-4 py-8">
            <div class="flex justify-center">
                <div class="card w-full max-w-md bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h2 class="card-title justify-center text-2xl font-bold">Forgot Password</h2>

                        <div class="mb-4 text-sm">
                            Forgot your password? No problem. Just let us know your email address and we will email you a
                            password reset link.
                        </div>

                        <div v-if="status" class="alert alert-success mb-4">
                            {{ status }}
                        </div>

                        <form @submit.prevent="submit">
                            <div class="form-control">
                                <label class="label" for="email">
                                    <span class="label-text">Email</span>
                                </label>
                                <input id="email" type="email" v-model="form.email" 
                                    class="input input-bordered" required autofocus autocomplete="username" />
                                <div v-if="form.errors.email" class="text-error text-sm mt-1">
                                    {{ form.errors.email }}
                                </div>
                            </div>

                            <div class="form-control mt-6">
                                <button class="btn btn-primary" :disabled="form.processing">
                                    Email Password Reset Link
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </NavbarLayout>
</template>
