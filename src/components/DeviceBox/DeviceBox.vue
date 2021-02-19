<template>
  <div class="basic-card click-element device-box">
    <div class="device-box-header">
      <svgicon
        class="bulb-icon"
        :class="{ 'bulb-on': deviceStatus === 'on' }"
        :icon="iconName"
        height="100%"
        width="30%"
      ></svgicon>
    </div>
    <div class="device-box-title">
      <div class="box-title">
        {{ deviceTitle }}
      </div>
    </div>
    <div class="device-box-status">
      {{ deviceStatus }}
    </div>
  </div>
</template>

<script>
import "../../compiled-icons/bulb";
import "../../compiled-icons/stand_lamp";
import "../../compiled-icons/spot";

export default {
  // mounted() {console.log(this.iconName)},
  props: ["iconName", "deviceTitle", "deviceStatus"],
};
</script>

<style lang="scss">
@import "../../style/main-style";

.device-box {
  width: 6vw;
  min-width: 115px;
  max-width: 140px;
  height: 6vw;
  min-height: 115px;
  max-height: 140px;
}

.device-box-header {
  height: 40%;
  overflow: hidden;

  width: 100%;
}

.device-box-title {
  height: 40%;
  width: 100%;

  font-weight: 700;
  line-height: 100%;
  display: flex;
  font-size: 100%;
  // width: 100%;

  .box-title {
    position: absolute;
    bottom: 24%;
    width: auto;
   
  }
}

.device-box-status {
  font-size: 100%;
  width: auto;
  height: 20%;
  position: absolute;
  overflow: hidden;
}
</style>
