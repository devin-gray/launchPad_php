<script setup>
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const passwordInput = ref(null);
const currentPasswordInput = ref(null);

const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const updatePassword = () => {
    form.put(route('password.update'), {
        preserveScroll: true,
        onSuccess: () => form.reset(),
        onError: () => {
            if (form.errors.password) {
                form.reset('password', 'password_confirmation');
                passwordInput.value.focus();
            }
            if (form.errors.current_password) {
                form.reset('current_password');
                currentPasswordInput.value.focus();
            }
        },
    });
};
</script>

<template>
    <section>
        <header>
            <h2 class="text-lg font-medium">Update Password</h2>
            <p class="mt-1 text-sm text-base-content/70">
                Ensure your account is using a long, random password to stay secure.
            </p>
        </header>

        <form @submit.prevent="updatePassword" class="mt-6 space-y-6">
            <div class="form-control">
                <label class="label" for="current_password">
                    <span class="label-text">Current Password</span>
                </label>
                <input id="current_password" ref="currentPasswordInput" v-model="form.current_password" 
                    type="password" class="input input-bordered" autocomplete="current-password" />
                <div v-if="form.errors.current_password" class="text-error text-sm mt-1">
                    {{ form.errors.current_password }}
                </div>
            </div>

            <div class="form-control">
                <label class="label" for="password">
                    <span class="label-text">New Password</span>
                </label>
                <input id="password" ref="passwordInput" v-model="form.password" 
                    type="password" class="input input-bordered" autocomplete="new-password" />
                <div v-if="form.errors.password" class="text-error text-sm mt-1">
                    {{ form.errors.password }}
                </div>
            </div>

            <div class="form-control">
                <label class="label" for="password_confirmation">
                    <span class="label-text">Confirm Password</span>
                </label>
                <input id="password_confirmation" v-model="form.password_confirmation" 
                    type="password" class="input input-bordered" autocomplete="new-password" />
            </div>

            <div class="flex items-center gap-4">
                <button type="submit" class="btn btn-primary" :disabled="form.processing">Save</button>

                <p v-if="form.recentlySuccessful" class="text-sm text-success">Saved.</p>
            </div>
        </form>
    </section>
</template>
