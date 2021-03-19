<template>
  <!-- :value="sliderValue" -->
  <input
    class="horizontal-slider-control click-element"
    type="range"
    min="0"
    max="100"
    :value="this.value"
  />
</template>

<script>
export default {
  name: "HorizontalBarController",
  props: ["value"],
  created(){
  }
};
</script>

<style lang="scss">
.horizonal-slider-control-container {
  background-color: rgba(245, 245, 245, 0.171);

  // border-radius: 10px; //TODO define in main css
  width: 100%;
}

.horizontal-slider-control {
  border-radius: 10px;
  border: 1px solid #f3f4fe;

  -webkit-appearance: none;
  -webkit-touch-appearance: none;
  overflow: hidden;
  background-color: rgba(245, 245, 245, 0.571);
}

input:focus {
  outline-width: 0;
}

::-ms-thumb {
  width: 2px;
}
</style>
