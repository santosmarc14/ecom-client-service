<template>
    <v-container class="fill-height d-flex justify-center align-center">
        <v-card class="pa-6 glass-card" width="420" elevation="16" rounded="xl">
            <v-card-title class="text-h4 text-center font-weight-bold mb-6">Welcome Back</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="login">
                    <v-text-field v-model="email" label="Email" type="email" variant="outlined" color="deep-purple"
                        prepend-inner-icon="mdi-email" :error-messages="emailError" @input="emailError = ''"
                        required></v-text-field>

                    <v-text-field v-model="password" label="Password" type="password" variant="outlined"
                        color="deep-purple" prepend-inner-icon="mdi-lock" :error-messages="passwordError"
                        @input="passwordError = ''" required></v-text-field>

                    <v-btn type="submit" color="deep-purple" block class="mt-4 py-3" size="large"
                        rounded="xl">Login</v-btn>
                    <v-btn variant="text" block class="mt-2 text-deep-purple" @click="forgotPassword" type="submit">Forgot
                        Password?</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');

const login = () => {
    emailError.value = email.value ? '' : 'Email is required';
    passwordError.value = password.value ? '' : 'Password is required';

    if (!email.value || !password.value) return;

    console.log('Logging in with', email.value, password.value);
    // Implement authentication logic here
};

const forgotPassword = () => {
    console.log('Redirecting to forgot password page');
    // Implement forgot password logic here
};
</script>

<style scoped>
.v-container {
    min-height: 100vh;
    /* background: linear-gradient(135deg, #8e44ad, #3498db); */
    display: flex;
    align-items: center;
    justify-content: center;
}

.glass-card {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}
</style>

<script>
export default {
    name: "Login",
    setup() {

    },
}
</script>
