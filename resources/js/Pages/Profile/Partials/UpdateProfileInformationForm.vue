<script setup>
import { ref } from 'vue';
import { Link, useForm, usePage } from '@inertiajs/vue3';

const props = defineProps({
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const user = usePage().props.auth.user;

const form = useForm({
    name: user.name,
    email: user.email,
});
</script>

<template>
    <section>
        <header>
            <h2 class="text-lg font-medium">Profile Information</h2>
            <p class="mt-1 text-sm text-base-content/70">
                Update your account's profile information and email address.
            </p>
        </header>

        <form @submit.prevent="form.patch(route('profile.update'))" class="mt-6 space-y-6">
            <div class="form-control">
                <label class="label" for="name">
                    <span class="label-text">Name</span>
                </label>
                <input id="name" type="text" v-model="form.name" class="input input-bordered" required autofocus autocomplete="name" />
                <div v-if="form.errors.name" class="text-error text-sm mt-1">{{ form.errors.name }}</div>
            </div>

            <div class="form-control">
                <label class="label" for="email">
                    <span class="label-text">Email</span>
                </label>
                <input id="email" type="email" v-model="form.email" class="input input-bordered" required autocomplete="username" />
                <div v-if="form.errors.email" class="text-error text-sm mt-1">{{ form.errors.email }}</div>
            </div>

            <div v-if="mustVerifyEmail && user.email_verified_at === null">
                <p class="text-sm mt-2">
                    Your email address is unverified.
                    <Link :href="route('verification.send')" method="post" as="button" class="link link-primary">
                        Click here to re-send the verification email.
                    </Link>
                </p>

                <div v-show="status === 'verification-link-sent'" class="alert alert-success mt-2">
                    A new verification link has been sent to your email address.
                </div>
            </div>

            <div class="flex items-center gap-4">
                <button type="submit" class="btn btn-primary" :disabled="form.processing">Save</button>

                <p v-if="form.recentlySuccessful" class="text-sm text-success">Saved.</p>
            </div>
        </form>
    </section>
</template>
