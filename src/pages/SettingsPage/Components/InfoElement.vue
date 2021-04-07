<template>
  <div class="info-element">
    <div class="lable-name">{{ lableName }}</div>
    <div class="info-text">{{ infotext }}</div>
  </div>
</template>

<script>
export default {
  props: ["lableName", "infotext"],
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

.lable-name {
  font-weight: bold;
}
.info-text {
  justify-self: right;
  color: $main-gray;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
