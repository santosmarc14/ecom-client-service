<template>
    <v-container>
        <v-row>
            <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" v-if="loading">
                <v-card>
                    <v-card-title>{{ product.name }}</v-card-title>
                    <v-card-text>{{ product.description }}</v-card-text>
                    <v-card-subtitle>₱ {{ product.price }}</v-card-subtitle>
                    <v-card-actions>
                        <v-btn color="primary">Buy</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-pagination v-model="page" :length="totalItems" class="mt-4"></v-pagination>
    </v-container>
</template>


<script>
import products from '@/api/product/product';
import { ref } from "vue";
export default {
    name: "Home",
    setup() {
        const page = ref(1);
        return {
            page,
        }
    },
    data() {
        return {
            // current_page: "",
            totalItems: 0,
            products: [],
            loading: true
        }
    },
    watch: {
        page() {
            this.fetch();
        }
    },
    async created() {
        await this.fetch();
    },
    methods: {
        async fetch() {
            await products.getProducts(this.page).then((response) => {
                const data = response.data;
                console.log(data);
                this.products = data.data;
                // this.current_page = data.current_page;
                this.totalItems = data.last_page;
            })
        }
    }

}
</script>