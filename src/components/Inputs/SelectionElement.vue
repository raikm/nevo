<template>
  <div class="info-element selection-element">
    <div class="action-name">{{ lableName }}</div>
    <div class="selector-wrapper">
      <div
        class="selector"
        :class="{ 'active-selctor': selection.active }"
        :key="selection.id"
        v-for="selection in selections"
        @click="clickSelector(selection)"
      >
        {{ selection.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["lableName", "selections"],
  methods: {
    clickSelector(selection) {
      selection["active"] =
        selection.active === false || selection.active == null ? true : false;
      this.$emit("click-select", this.lableName, selection);
    },
  },
};
</script>

<style lang="scss">
.selection-element {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.selector-wrapper {
  justify-self: right;
  display: flex;
}

.selector {
  border: 1px solid;
  border-color: $main-blue;
  color: $main-blue;
  border-radius: 6px;
  margin: 2px;
  width: 30px;
  display: flex;
  justify-content: center;
  padding: 0 5px;
}

.selector:hover {
  background: $main-blue;
  color: white;
}
.active-selctor {
  background: $main-blue;
  color: white;
}

.active-selctor:hover {
  background: white;
  color: $main-blue;
}
</style>

