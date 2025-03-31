<template>
    <v-app-bar app color="dark" dark>
    <!-- Logo -->

    <!-- Title or Branding -->
    <v-toolbar-title class="ml-5">MarcSantos__</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Search Icon -->
    <v-btn icon @click="openSearch">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-app-bar>
  <v-main>
    <router-view />
  </v-main>

  <!-- <AppFooter /> -->
</template>

<script>
export default {
  methods: {
    home() {
      window.location.href = "/home"
    },
    cart() {
      window.location.href = "/cart"
    },
    logout() {
      window.location.href = "/"
    },
  }
}
</script>
