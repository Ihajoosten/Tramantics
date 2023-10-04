<template>
  <navbar-component />
  <div class="justify-center flex bg-yellow-400 items-center h-screen">
    <div class="text-4xl">
      <router-view />
    </div>
  </div>
  <footer-component />
</template>

<script lang="ts">
import NavbarComponent from "@/components/layout/NavbarComponent.vue";
import FooterComponent from "@/components/layout/FooterComponent.vue";

export default {
  name: "App",
  components: {
    NavbarComponent,
    FooterComponent,
  },
};
</script>
