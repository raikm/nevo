<template>
  <div class="eta-content-box">
    <div class="eta-type-icon-container">
      <svgicon class="eta-icon" :icon="etaContent.etaIcon"></svgicon>
    </div>
    <div class="eta-time-info">
      <span>{{ etaContent.etaTime }}</span>
    </div>
  </div>
</template>

<script>
import "../../compiled-icons/public-transport";
import "../../compiled-icons/bike";

export default {
  name: "ETAInfo",
  props: ["etaContent"],
};
</script>

<style lang="scss">
@import "../../style/main-style";

.eta-content-box {
  display: grid;
  grid-template-columns: 2fr 3fr;
  background-color: rgba(255, 255, 255, 0.586);
  
  border-radius: $standard-border-radius;
  padding: 2%;
}

.eta-type-icon-container {
  border-radius: 50%;
  border-width: 1px;
  border-style: solid;
  height: 3.7vh;
  width: 3.7vh;
  padding: 10%;
  margin: 5%;
}

.eta-time-info {
  align-self: center;
}
</style>
