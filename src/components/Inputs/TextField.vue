<template>
  <div class="input-wrapper">
    <label class="input-label">{{ labelName }}</label>
    <input class="input-field" />
  </div>
</template>

<script>
export default {
  name: "TextField",
  props: ["labelName"],
};
</script>

<style lang="scss">
@import "../../style/main-style";
.input-wrapper {
  margin: 1rem 0;
}

.input-label {
  margin: 1rem;
}
.input-field {
  width: 100%;
  height: 3rem;
  background-color: white;
  border: none;
  border-radius: $standard-border-radius;
  font-size: $standard-text-medium;
  padding: 1rem;
}
</style>
