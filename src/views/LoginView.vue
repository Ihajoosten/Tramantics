<template>
  <LoginComponent />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginComponent from "@/components/auth/LoginComponent.vue";
export default defineComponent({
  name: "LoginView",
  components: {
    LoginComponent,
  },
});
</script>
