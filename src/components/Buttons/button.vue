<template>
  <div class="standard-button">{{lableName}}</div>
</template>

<script>
export default {
  props: ["lableName"],
};
</script>

<style lang="scss">
@import "./button-style.scss";
</style>
