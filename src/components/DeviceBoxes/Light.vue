<template>
  <div class="basic-card click-element device-box" @click="clickLight">
    <div class="device-box-header">
      <svgicon
        class="bulb-icon"
        :class="{
          'light-off': deviceStatus === 'off',
          'light-unavailable': deviceStatus === 'unavailable',
        }"
        :icon="'light_' + iconName"
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
import "@/compiled-icons/light_bulb";
import "@/compiled-icons/light_stand_lamp";
import "@/compiled-icons/light_spot";
import "@/compiled-icons/light_plant_light";

export default {
  props: ["iconName", "deviceTitle", "deviceStatus", "deviceId"],
  methods: {
    clickLight() {
      this.$emit("click-light", this.deviceId, this.deviceStatus);
    },
  },
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
  grid-template-rows: 3fr 1fr auto;
  justify-self: center;
  align-self: center;
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

.light-off {
  .accessoir-path {
    fill: rgb(112, 112, 112);
  }
}
.light-off {
  .light-path {
    fill: rgb(182, 182, 182);
  }
}

.light-unavailable {
  .accessoir-path {
    fill: rgba(112, 112, 112, 0.5);
  }
}

.light-unavailable {
  .light-path {
    fill: rgba(182, 182, 182, 0.5);
  }
}
</style>
