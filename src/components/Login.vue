<template>
    <v-container class="fill-height d-flex justify-center align-center">
        <v-card class="pa-6 glass-card" width="420" elevation="16" rounded="xl">
            <v-card-title class="text-h4 text-center font-weight-bold mb-6">Welcome Back</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="login" method="post">
                    <v-text-field v-model="email" label="Email" type="email" variant="outlined" color="deep-purple"
                        prepend-inner-icon="mdi-email" :error-messages="emailError" @input="emailError = ''"
                        required></v-text-field>

                    <v-text-field v-model="password" label="Password" type="password" variant="outlined"
                        color="deep-purple" prepend-inner-icon="mdi-lock" :error-messages="passwordError"
                        @input="passwordError = ''" required></v-text-field>

                    <v-btn type="submit" color="deep-purple" block class="mt-4 py-3" size="large"
                        rounded="xl">Login</v-btn>
                    <v-btn variant="text" block class="mt-2 text-deep-purple" @click="forgotPassword"
                        type="submit">Forgot
                        Password?</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import auth from '@/api/auth/auth';

const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');

const login = async () => {
    emailError.value = email.value ? '' : 'Email is required';
    passwordError.value = password.value ? '' : 'Password is required';

    if (!email.value || !password.value) return;

    // console.log('Logging in with', email.value, password.value);


    await auth
        .login({
            email: email.value,
            password: password.value,
        }).then((response) => {
            const data = response.data;
            data.expires_in = new Date(Date.now() + data.expires_in).toISOString();
            
            localStorage.setItem('auth', JSON.stringify(data));

            window.location.href="/home";
            
        })
        .catch()
        .finally();

    // try {
    //     const response = await auth.login({
    //         email: email.value,
    //         password: password.value,
    //     });

    //     const data = response.data;
    //     console.log('Login successful', data);

    //     // Handle successful login (e.g., store token, redirect user)
    // } catch (error) {
    //     console.error('Login failed', error);
    //     emailError.value = 'Invalid email or password';
    // } finally {
    //     console.log('Login attempt finished');
    // }
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
const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');

export default {
    name: "Login",
    data() {
        return {
            email: null,
            password: null,
        };
    },
    methods: {
        submit() {
            console.log(email.value, password.value);
        },
    },
};
</script>
<!-- <template>
    <div>
        <v-container class="mb-6">
            <v-row class="text-center align-center justify-center" align="center" style="height: 150px" no-gutters>
                <v-col cols="6">
                    <v-card>
                        <v-card-title class="pa-2 ma-2">
                            <h2>Login</h2>
                        </v-card-title>

                        <hr class="mx-10" />

                        <v-card-text>
                            <v-form class="pa-2 ma-2" @submit.prevent="submit">
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" md="4">
                                            <v-text-field v-model="email" label="Email" required type="email" rounded
                                                variant="solo" name="email" />
                                        </v-col>

                                        <v-col cols="12" md="4">
                                            <v-text-field v-model="password" label="Password" required type="password"
                                                rounded variant="solo" name="password" />
                                        </v-col>

                                        <v-col cols="12" md="4">
                                            <v-btn class="primary" size="large" variant="tonal" rounded type="submit">
                                                Login
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import auth from "@/api/auth/auth";

export default {
    name: "Login",
    data() {
        return {
            email: null,
            password: null,
        };
    },
    methods: {
        async submit() {
            await auth
            .login({
                email: this.email,
                password: this.password,
            }).then((response) => {
                const data = response.data;
                console.log(data);
            })
                .catch()
                .finally();
        },
    },
};
</script> -->