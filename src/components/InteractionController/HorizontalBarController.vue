<template>
  <input
    class="horizontal-slider-control click-element"
    type="range"
    min="0"
    max="100"
  
  /> 
  <!--   v-model="value" -->
</template>

<script>
export default {
  name: "HorizontalBarController",
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
  -webkit-appearance: none;
  -webkit-touch-appearance: none;
  overflow: hidden;
  background-color: rgba(245, 245, 245, 0.571);
}

input:focus {
  outline-width: 0;
}

::-ms-thumb{
  width: 2px;
}

::-webkit-slider-thumb {
 -webkit-appearance: none;
 -webkit-touch-appearance: none;
    width: 0px; /* 1 */
    background: #fff;
    box-shadow: -100vw 0 0 100vw #FFA384;
    
}
</style>
