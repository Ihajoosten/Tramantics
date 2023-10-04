import { ComponentCustomProperties } from "vue";
import { Store } from "@/store";

declare module "@vue/runtime-core" {
  // Declare your own store states.
  interface State {
    // isAuthenticated: string | null;
    // isAdmin: string | null;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
