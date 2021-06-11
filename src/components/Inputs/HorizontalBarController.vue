<template>
  <input
    class="horizontal-slider-control click-element"
    type="range"
    min="0"
    max="100"
    v-model="sliderValue"
    @change="changeSliderValue"
  />
</template>

<script>
export default {
  name: "HorizontalBarController",
  props: ["value"],
  mounted() {
    this.sliderValue = this.value;
  },
  data() {
    return {
      sliderValue: 0,
    };
  },
  methods: {
    changeSliderValue() {
      this.$emit("change-slider-value", this.sliderValue);
    },
  },
};
</script>

<style lang="scss">
.horizonal-slider-control-container {
  background-color: rgba(245, 245, 245, 0.171);
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
  width: 0px;
}
</style>
