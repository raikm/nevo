import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    count: number
  }

  // provide typings for `this.$store`
  // declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store,
  }

}