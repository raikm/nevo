<template>
  <div class="basic-card click-element device-box">
    <div class="device-box-header">
      <svgicon
        class="bulb-icon"
        :class="{ 'bulb-on' : deviceStatus === 1}"
        :icon="iconName"
        width="2.5rem"
        height="2.5rem"
      ></svgicon>
    </div>
    <div class="device-box-title">
        {{deviceTitle}}
    </div>
    <div class="device-box-status">
        On
    </div>
  </div>
</template>

<script>
import "../../compiled-icons/bulb";

export default {
  props: ["iconName", "deviceTitle", "deviceStatus"],
};
</script>

<style lang="scss">
@import "../../style/main-style";

.device-box {
  width: 6vw;
  height: 6vw;
}

.device-box-header{
    height: 60%;
}

.device-box-title{
    height: 20%;
    font-weight: 700;
}

.device-box-status{
    height: 20%;
}
</style>
