<template>
  <div class="option-wrapper">
 
  </div>
</template>

<script>
export default {
  name: "OptionField",
  props: ["labelName"],
};
</script>

<style lang="scss">
@import "../../style/main-style";
.option-wrapper {
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
