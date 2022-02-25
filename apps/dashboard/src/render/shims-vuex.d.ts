import { Store } from "vuex";

declare module "@vue/runtime-core" {
  // Declare your own store states.
  interface State {
    config: any;
    count: number;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
