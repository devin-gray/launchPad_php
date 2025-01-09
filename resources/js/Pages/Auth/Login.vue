<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import NavbarLayout from '@/Layouts/NavbarLayout.vue';

defineProps({
    canResetPassword: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <NavbarLayout>
        <Head title="Log in" />

        <div class="container mx-auto px-4 py-8">
            <div class="flex justify-center">
                <div class="card w-full max-w-md bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h2 class="card-title justify-center text-2xl font-bold">Login</h2>

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

                            <div class="form-control mt-4">
                                <label class="label" for="password">
                                    <span class="label-text">Password</span>
                                </label>
                                <input id="password" type="password" v-model="form.password" 
                                    class="input input-bordered" required autocomplete="current-password" />
                                <div v-if="form.errors.password" class="text-error text-sm mt-1">
                                    {{ form.errors.password }}
                                </div>
                            </div>

                            <div class="form-control mt-4">
                                <label class="label cursor-pointer justify-start gap-2">
                                    <input type="checkbox" v-model="form.remember" class="checkbox" />
                                    <span class="label-text">Remember me</span>
                                </label>
                            </div>

                            <div class="form-control mt-6">
                                <button class="btn btn-primary" :disabled="form.processing">
                                    Log in
                                </button>
                            </div>

                            <div class="flex items-center justify-between mt-4">
                                <Link v-if="canResetPassword" :href="route('password.request')"
                                    class="link link-hover text-sm">
                                    Forgot your password?
                                </Link>
                                <Link :href="route('register')" class="link link-hover text-sm">
                                    Need an account?
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </NavbarLayout>
</template>
