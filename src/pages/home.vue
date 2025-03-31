<template>
    <v-container>
        <v-row>

            <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4">
                <v-skeleton-loader v-if="loading" class="mx-auto border" type="image, article"></v-skeleton-loader>

                <v-card else class=" d-flex flex-column fill-height">
                    <v-img height="200px" :src="`https://unsplash.it/seed/${product.sku}/1920/1080`" cover
                        max-height="200px"></v-img>
                    <v-card-title>{{ product.name }}</v-card-title>
                    <v-card-text>{{ product.description }}</v-card-text>
                    <v-card-subtitle>₱ {{ product.price }}</v-card-subtitle>
                    <v-card-actions>
                        <v-btn color="primary" @click="addToCart(product.id)">Add to Cart</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-pagination v-model="page" :length="totalItems" class="mt-4" @update:modelValue="scrollToTop"></v-pagination>
    </v-container>
    <v-bottom-navigation :elevation="1" grow>
        <v-btn value="home" to="/home">
            <v-icon>mdi-home</v-icon>

        </v-btn>

        <v-btn value="cart" to="/cart">
            <v-icon>mdi-cart</v-icon>

        </v-btn>

        <v-btn value="logout" to="/">
            <v-icon>mdi-logout</v-icon>

        </v-btn>
    </v-bottom-navigation>
</template>

<script>
import products from "@/api/product/products.js";
import carts from "@/api/product/carts.js";
import { ref } from "vue";

export default {
    name: "Home",
    setup() {
        const page = ref(1);

        return {
            page,
        };
    },
    data() {
        return {
            products: [],
            totalItems: 0,
        };
    },
    watch: {
        page() {
            this.fetch();
        },
    },
    async created() {
        await this.fetch();
    },
    methods: {
        async fetch() {
            await products.getProducts(this.page).then((response) => {
                const data = response.data;

                this.products = data.data;
                this.totalItems = data.last_page;
            });
        },

        async addToCart(productId) {
            await carts.addToCart(productId).then(() => {
                alert("Product added to cart");
            });
        },
        scrollToTop() {
            this.$nextTick(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        },
    },
};
</script>