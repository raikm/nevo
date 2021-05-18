<template>
  <div>
    <div class="main-info-title-big room-title">{{ room.roomName }}</div>
    <div class="light-container">
      <Light
        :deviceTitle="light.attributes.friendly_name"
        :iconName="light.attributes.type"
        :deviceStatus="light.state"
        :deviceId="light.entity_id"
        :key="light.attributes.friendly_name"
        v-for="light in room.lights"
        @click-light="changeLampSatues"
      />
    </div>
    <div class="device-container">
      <Device
        :iconName="device.attributes.type"
        :deviceTitle="device.attributes.friendly_name"
        :deviceStatus="device.state"
        :deviceId="device.entity_id"
        :key="device.attributes.friendly_name"
        v-for="device in room.otherDevices"
        @click-device="changeDeviceSatues"
      />
    </div>
    <div class="room-background-image">
      <svgicon width="125%" height="110%" :icon="room.roomName"></svgicon>
    </div>
  </div>
</template>

<script>
// import SceneBox from "../../components/SceneBoxes/SceneBox";
import "@/compiled-icons/Living Room";
import "@/compiled-icons/Floor";
import "@/compiled-icons/Bedroom";

import Light from "../../components/DeviceBoxes/Light";
import Device from "../../components/DeviceBoxes/Device";

export default {
  name: "Room",
  props: ["room"],
  watch: {
    room() {
      this.checkForEffect();
    },
  },
  components: { Light, Device },
  methods: {
    checkForEffect() {
      if (this.room.roomName === "Living Room") {
        let result = this.room.lights.some((element) => element.state === "on");
        if (result === true) {
          document.getElementsByClassName(
            "light-bulb-background"
          )[0].style.fill = "#F3A826";
        } else {
          document.getElementsByClassName(
            "light-bulb-background"
          )[0].style.fill = "#b6b6b6";
        }
      }
    },
    changeLampSatues(entity_id, state) {
      if (state === "unavailable") return;
      let service = state == "on" ? "turn_off" : "turn_on";
      let domain = entity_id.split(".")[0];
      this.$store.getters.hAConnection.sendMessagePromise({
        type: "call_service",
        domain: domain,
        service: service,

        service_data: {
          entity_id: entity_id,
        },
      });
    },
    changeDeviceSatues(entity_id, state) {
      if (state === "unavailable") return;
      let service = state == "on" ? "turn_off" : "turn_on";
      let domain = entity_id.split(".")[0];
      this.$store.getters.hAConnection.sendMessagePromise({
        type: "call_service",
        domain: domain,
        service: service,
        service_data: {
          entity_id: entity_id,
        },
      });
    }
  },
};
</script>

<style lang="scss">
.room-title {
  font-weight: 600;
  letter-spacing: 2px;
  color: $main-orange;
}

.light-container,
.device-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  position: relative;
  z-index: 100;
}

.light-container > div,
.device-container > div {
  margin: $standard-space / 2;
}

.room-background-image {
  z-index: 99;
  position: absolute;
  right: 0;
  bottom: 0;
  height: 100%;
}
</style>
