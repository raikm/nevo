<template>
  <div class="progress-bar-container">
    <div class="progress-bar-background">
      <div
        class="progress-bar"
        :style="{
          width:
            //if value over minimum and at least 2% then show bar
            (plantValue - valueMinBorder > 0 &&
            (plantValue / valueMaxBorder) * 100 > 2
              ? (plantValue / valueMaxBorder) * 100
              : 0) + '%',
          backgroundColor: barColor,
          height: barHeight,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressBarWithTrend",
  props: ["barColor", "valueMinBorder", "valueMaxBorder", "plantValue", "barHeight"],
  created() {},
  methods: {},
};
</script>

<style lang="scss">
@import "../style/main-style";
@import "../style/main-colors";

.progress-bar-container {
  width: 100%;
  margin: 0.4rem 0;
}

.progress-bar {
  animation: load 2s normal forwards;
  height: 100%;
  border-radius: $standard-border-radius;
  opacity: 85%;
  font-size: 50%;
  text-align: right;
  display: grid;
  align-content: center;
  @keyframes load {
    0% {
      width: 0;
    }
    100% {
      width: (#{width});
    }
  }
}

.progress-bar-background {
  background-color: $main-light-gray;
  border-radius: $standard-border-radius;
}
</style>
