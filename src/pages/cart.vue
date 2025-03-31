<!-- <template>
    <v-container>
        <v-row>
            <v-col v-for="item in items" :key="item.id" cols="12" sm="6" md="4">
                <v-card>
                    <v-card-title>{{ item.product.name }}</v-card-title>
                    <v-card-text>{{ item.quantity }}</v-card-text>
                    <v-card-actions>
                        <v-btn color="primary">Add to Cart</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-pagination v-model="page" :length="totalItems" class="mt-4"></v-pagination>
    </v-container>
</template> -->
<!-- <template>
    <div>
      <h2>Shopping Cart</h2>
      <ul v-if="cart.length">
        <li v-for="item in cart" :key="item.id">
          {{ item.product.name }} - Quantity: {{ item.quantity }}
          <button @click="removeFromCart(item.product.id)">Remove</button>
        </li>
      </ul>
      <p v-else>Your cart is empty.</p>
    </div>
  </template> -->
<template>
    <v-container>
        <v-card class="pa-4">
            <v-card-title class="text-h5">Shopping Cart</v-card-title>
            <v-divider></v-divider>

            <v-data-table v-if="cart.length" :headers="headers" :items="cart" item-value="id" class="elevation-1 mt-4" hide-default-footer hide-default-header disable-pagination>
                <template v-slot:item.product.name="{ item }" class="w-20">
                    {{ item.product.name }}
                </template>

                <template v-slot:item.quantity="{ item }">
                    <v-text-field v-model="item.quantity" type="number" outlined
                        @change="updateQuantity(item)"></v-text-field>
                </template>

                <!-- <template v-slot:item.total="{ item }">
                    ₱{{ (item.product.price * item.quantity).toFixed(2) }}
                </template> -->

                <template v-slot:item.actions="{ item }">
                    <v-btn color="red" icon @click="removeFromCart(item.product.id)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </template>
            </v-data-table>

            <v-alert v-else type="info" class="mt-4">Your cart is empty.</v-alert>
        </v-card>
    </v-container>
    <v-bottom-navigation :elevation="1" grow>
        <v-btn value="home" to="/home">
            <v-icon>mdi-home</v-icon>

            <!-- <span>Recent</span> -->
        </v-btn>

        <v-btn value="cart" to="/cart">
            <v-icon>mdi-cart</v-icon>

            <!-- <span>Favorites</span> -->
        </v-btn>

        <v-btn value="logout" to="/">
            <v-icon>mdi-logout</v-icon>

            <!-- <span>Nearby</span> -->
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
import carts from "@/api/product/carts.js";

export default {
    name: "Cart",
    data() {
        return {
            cart: [],
            headers: [
                { text: "Product", value: "product.name" },
                { text: "Quantity", value: "quantity", sortable: false },
                // { text: "Price", value: "product.price" },
                // { text: "Total", value: "total" },
                { text: "Actions", value: "actions", sortable: false },
            ],
        };
    },
    async created() {
        await this.fetch();
    },
    methods: {
        async fetch() {
            await carts.getCart().then((response) => {

                const data = response.data;
                this.cart = data;
            });
        },
        async updateQuantity(item) {
            try {
                await carts.updateCart(item.product.id, item.quantity);
                this.fetch();
            } catch (error) {
                console.error("Error updating cart:", error);
            }
        },
    },
};
</script>