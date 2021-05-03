<template>
  <div class="current-track click-element-hover">
    <div class="equalizer">
      <span class="bar bar-1"></span>
      <span class="bar bar-2"></span>
      <span class="bar bar-3"></span>
    </div>
    <div class="current-track-info" >
      {{ this.currentTrack.artist }} -
      {{ this.currentTrack.title }}
    </div>
  </div>
</template>

<script>
export default {
    props: ["currentTrack"]
};
</script>

<style lang="scss">
.current-track {
  display: grid;
  grid-template-columns: 10% 90%;
}

.equalizer {
  justify-self: center;
  align-self: center;
  position: relative;
  height: 50%;
  width: 50%;

  // transform: translate(-50%, -50%) scale(0.25);
}

.bar {
  width: 18%;
  height: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  background: black;
  transition: height 0.4s ease;
  animation: bar 0.4s 0s both alternate ease infinite;
}

.bar-1 {
  animation-delay: 0.2s;
}

.bar-2 {
  left: 33%;
  animation-delay: 0.4s;
}

.bar-3 {
  left: 66%;
  animation-delay: 0.6s;
}

@keyframes bar {
  0% {
    height: 0;
  }

  100% {
    height: 100%;
  }
}

.current-track-info {
  font-size: 1vh;
  align-self: center;
}
</style>
