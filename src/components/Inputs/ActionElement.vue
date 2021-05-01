<template>
  <div class="info-element">
    <div class="action-name">{{ lableName }}</div>
  </div>
</template>

<script>
export default {
  props: ["lableName"],
};
</script>

<style lang="scss">
.info-element {
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 0 1vh;
  height: 3vh;
  align-items: center;
  
}

.action-name {
  color: $main-blue;
  cursor: pointer;
}
</style>
