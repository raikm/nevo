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
      {{ deviceTitle }}
    </div>
    <div class="device-box-status">
      {{ deviceStatus }}
    </div>
  </div>
</template>

<script>
import "@/compiled-icons/bulb";
import "@/compiled-icons/stand_lamp";
import "@/compiled-icons/spot";

export default {
  props: ["iconName", "deviceTitle", "deviceStatus"],
};
</script>

<style lang="scss">
.device-box {
  width: 6vw;
  min-width: 115px;
  max-width: 140px;
  height: 6vw;
  min-height: 115px;
  max-height: 140px;
  display: grid;
  grid-template-rows: 3fr 1fr 1fr;
}

.device-box-header {
  // overflow: hidden;
  width: 100%;
}

.device-box-title {
  // width: 100%;
  font-weight: 700;
  line-height: 100%;
  height: 100%;
  display: grid;
  align-content: baseline;
}

.device-box-status {
  font-size: 100%;
  overflow: hidden;
}
</style>
