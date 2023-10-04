<template>
  <div
    class="bg-gray-900 text-gray-100 py-6 px-6 pt-6 shadow md:flex justify-between items-center"
  >
    <div class="flex items-center cursor-pointer">
      <router-link :to="{ name: 'home' }"
        ><h1 class="text-3xl hover:text-green-500 duration-300 font-extrabold">
          TaskSync
        </h1></router-link
      >
      <span class="text-green-500 text-xl mr-1">
        <i class="bi bi-calendar2-check ml-3 text-5xl"></i>
      </span>
    </div>

    <span
      @click="MenuOpen()"
      class="absolute md:hidden right-6 top-8 cursor-pointer text-4xl"
    >
      <i :class="[open ? 'bi bi-x' : 'bi bi-filter-left']"></i>
    </span>
    <ul
      class="md:flex md:items-center md:px-0 px-7 md:pb-0 pb-10 md:static absolute bg-gray-900 md:w-auto w-full top-18 duration-500 ease-linear"
      style="border-bottom-right-radius: 350px"
      :class="[open ? 'left-0' : 'left-[-100%]']"
    >
      <li
        class="md:mx-4 md:my-0 my-6"
        v-for="link in routerLinks"
        v-bind:key="link.id"
      >
        <div v-if="link.id !== 7 && link.id !== 8">
          <router-link
            v-bind:to="link.name"
            class="text-xl hover:text-green-500 duration-1000 font-extrabold no-underline hover:underline hover:decoration-2"
            >{{ link.text }}</router-link
          >
        </div>
      </li>
      <div
        class="md:mx-4 md:my-0 my-4"
        v-for="link in routerLinks"
        v-bind:key="link.id"
      >
        <button-component v-if="link.id === 7 || link.id === 8">
          <router-link :to="link.name">
            {{ link.text }}
            <i :class="link.icon" class="ml-1"></i>
          </router-link>
        </button-component>
      </div>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ButtonComponent from "../ui/ButtonComponent.vue";
export default defineComponent({
  setup() {
    let open = ref(false);
    let routerLinks = [
      { id: 1, text: "Home", name: "/", icon: "" },
      { id: 4, text: "Tasks", name: "tasks", icon: "" },
      { id: 5, text: "Calendar", name: "calendar", icon: "" },
      { id: 6, text: "Workgroup", name: "workgroup", icon: "" },
      { id: 2, text: "About", name: "about", icon: "" },
      { id: 3, text: "Contact", name: "contact", icon: "" },
      { id: 7, text: "Login", name: "login", icon: "bi bi-box-arrow-in-right" },
      { id: 8, text: "Sign up", name: "register", icon: "bi bi-person-plus" },
    ];

    function MenuOpen() {
      open.value = !open.value;
    }

    return { routerLinks, open, MenuOpen };
  },
  name: "NavbarComponent",
  components: {
    ButtonComponent,
  },
});
</script>
