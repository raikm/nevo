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
