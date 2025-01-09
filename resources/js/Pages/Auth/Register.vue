<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import NavbarLayout from '@/Layouts/NavbarLayout.vue';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <NavbarLayout>
        <Head title="Register" />

        <div class="container mx-auto px-4 py-8">
            <div class="flex justify-center">
                <div class="card w-full max-w-md bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h2 class="card-title justify-center text-2xl font-bold">Register</h2>

                        <form @submit.prevent="submit">
                            <div class="form-control">
                                <label class="label" for="name">
                                    <span class="label-text">Name</span>
                                </label>
                                <input id="name" type="text" v-model="form.name" 
                                    class="input input-bordered" required autofocus autocomplete="name" />
                                <div v-if="form.errors.name" class="text-error text-sm mt-1">
                                    {{ form.errors.name }}
                                </div>
                            </div>

                            <div class="form-control mt-4">
                                <label class="label" for="email">
                                    <span class="label-text">Email</span>
                                </label>
                                <input id="email" type="email" v-model="form.email" 
                                    class="input input-bordered" required autocomplete="username" />
                                <div v-if="form.errors.email" class="text-error text-sm mt-1">
                                    {{ form.errors.email }}
                                </div>
                            </div>

                            <div class="form-control mt-4">
                                <label class="label" for="password">
                                    <span class="label-text">Password</span>
                                </label>
                                <input id="password" type="password" v-model="form.password" 
                                    class="input input-bordered" required autocomplete="new-password" />
                                <div v-if="form.errors.password" class="text-error text-sm mt-1">
                                    {{ form.errors.password }}
                                </div>
                            </div>

                            <div class="form-control mt-4">
                                <label class="label" for="password_confirmation">
                                    <span class="label-text">Confirm Password</span>
                                </label>
                                <input id="password_confirmation" type="password" v-model="form.password_confirmation" 
                                    class="input input-bordered" required autocomplete="new-password" />
                            </div>

                            <div class="form-control mt-6">
                                <button class="btn btn-primary" :disabled="form.processing">
                                    Register
                                </button>
                            </div>

                            <div class="flex justify-end mt-4">
                                <Link :href="route('login')" class="link link-hover text-sm">
                                    Already registered?
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </NavbarLayout>
</template>
