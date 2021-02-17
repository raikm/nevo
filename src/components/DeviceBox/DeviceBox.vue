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
  max-width: 140px;
  height: 6vw;
  max-height: 140px;
}

.device-box-header {
  height: 40%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.device-box-title {
  height: 40%;
  font-weight: 700;
  line-height: 100%;
  font-size: 1rem;
  // width: 100%;
 
 
  

}

.box-title {
  position: absolute;
  bottom: 24%;
  
}

.device-box-status {
  font-size: 1rem;
  width: 100%;
  height: 20%;
  position: absolute;
    text-overflow: ellipsis;
  overflow: hidden;
}
</style>
