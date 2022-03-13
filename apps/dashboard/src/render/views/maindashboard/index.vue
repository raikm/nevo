<template>
  <div id="dashboard-wrapper">
    <div id="boxes">
      <HomeClimate class="dashboard-box box-s" />
      <WeatherBox class="box dashboard-box box-s" />
      <RoomLightController class="box dashboard-box box-s box-white" />
      <PublicTransport class="box dashboard-box box-m box-white" />
      <Calendar class="box dashboard-box box-m box-white" />
      <Music class="box dashboard-box box-m box-white" />
    </div>
    <div id="shortcuts">
      <Shortcut :shortcut="shortcut" v-for="shortcut in $store.getters.shortcutEntities" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Calendar from "../../components/boxes/calendar/index.vue";
import HomeClimate from "../../components/boxes/homeclimate/index.vue";
import Music from "../../components/boxes/music/index.vue";
import PublicTransport from "../../components/boxes/publictransport/index.vue";
import RoomLightController from "../../components/boxes/roomlightcontroller/index.vue";
import WeatherBox from "../../components/boxes/weather/index.vue";
import Shortcut from "../../components/Shortcut.vue";


</script>

<style lang="scss" scoped>
@import "../../../../../../libs/style/mainstyle.scss";

#dashboard-wrapper {
  position: relative;
}

#boxes {
  display: flex;
  column-gap: 15px;
  row-gap: 15px;
  flex-wrap: wrap;
}

#shortcuts {
  position: absolute;
  bottom: 0px;
  width: 100%;
  display: inline-flex;
  overflow: scroll;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  // row-gap: $standard-space;
  column-gap: $standard-space;
}
</style>
