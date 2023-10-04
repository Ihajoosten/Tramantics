<template>
  <RegisterComponent />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RegisterComponent from "@/components/auth/RegisterComponent.vue";
export default defineComponent({
  name: "RegisterView",
  components: {
    RegisterComponent,
  },
});
</script>
