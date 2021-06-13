<template>
  <div class="box white-box click-element device-box" @click="clickDevice">
    <div class="device-box-header">
      <svgicon
        class="device-icon"
        :class="{
          'device-off': deviceStatus === 'off',
          'device-unavailable': deviceStatus === 'unavailable',
        }"
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
//long click opens individual window
// import "@/compiled-icons/device_vacuum";
import "@/compiled-icons/vacuum";
import "@/compiled-icons/humidifier";
export default {
  props: ["iconName", "deviceTitle", "deviceStatus", "deviceId"],
  methods: {
    clickDevice() {
      this.$emit("click-device", this.deviceId, this.deviceStatus);
    },
  },
};
</script>

<style lang="scss">

</style>
