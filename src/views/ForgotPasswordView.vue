<template>
  <ForgotPasswordComponent />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ForgotPasswordComponent from "@/components/auth/ForgotPasswordComponent.vue";
export default defineComponent({
  name: "RegisterView",
  components: {
    ForgotPasswordComponent,
  },
});
</script>
