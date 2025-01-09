<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';

const confirmingUserDeletion = ref(false);
const passwordInput = ref(null);

const form = useForm({
    password: '',
});

const confirmUserDeletion = () => {
    confirmingUserDeletion.value = true;

    setTimeout(() => passwordInput.value?.focus(), 250);
};

const deleteUser = () => {
    form.delete(route('profile.destroy'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value?.focus(),
        onFinish: () => form.reset(),
    });
};

const closeModal = () => {
    confirmingUserDeletion.value = false;
    form.reset();
};
</script>

<template>
    <section class="space-y-6">
        <header>
            <h2 class="text-lg font-medium">Delete Account</h2>
            <p class="mt-1 text-sm text-base-content/70">
                Once your account is deleted, all of its resources and data will be permanently deleted.
            </p>
        </header>

        <button class="btn btn-error" @click="confirmUserDeletion">Delete Account</button>

        <dialog :open="confirmingUserDeletion" class="modal">
            <div class="modal-box">
                <h3 class="font-bold text-lg">Are you sure you want to delete your account?</h3>

                <p class="py-4">
                    Once your account is deleted, all of its resources and data will be permanently deleted. Please
                    enter your password to confirm you would like to permanently delete your account.
                </p>

                <form @submit.prevent="deleteUser">
                    <div class="form-control">
                        <label class="label" for="password">
                            <span class="label-text">Password</span>
                        </label>
                        <input id="password" ref="passwordInput" v-model="form.password" 
                            type="password" class="input input-bordered" placeholder="Password" />
                        <div v-if="form.errors.password" class="text-error text-sm mt-1">
                            {{ form.errors.password }}
                        </div>
                    </div>

                    <div class="modal-action">
                        <button type="button" class="btn" @click="closeModal">Cancel</button>
                        <button type="submit" class="btn btn-error" :disabled="form.processing">
                            Delete Account
                        </button>
                    </div>
                </form>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button @click="closeModal">close</button>
            </form>
        </dialog>
    </section>
</template>
