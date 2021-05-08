<template>
  <div>
    <div class="main-info-title-big room-title">{{ room.roomName }}</div>
    <div class="room-line"></div>
    <!-- <div class="room-scene-wrapper" :key="scene.id" v-for="scene in scenes">
      <SceneBox :sceneIcon="scene.iconSource" :sceneName="scene.title" />
    </div> -->

    <div class="room-lights">
      <DeviceBox
        :deviceTitle="light.attributes.friendly_name"
        :iconName="light.attributes.type"
        :deviceStatus="light.state"
        :deviceId="light.entity_id"
        :key="light.attributes.friendly_name"
        v-for="light in room"
        @click-device-box="changeLampSatues"
      />
    </div>
  </div>
</template>

<script>
// import SceneBox from "../../components/SceneBoxes/SceneBox";

import DeviceBox from "../../components/DeviceBox/DeviceBox";

export default {
  name: "Room",
  props: ["room"],
  components: { DeviceBox },
  data() {
    return {
      scenes: [
        {
          id: 1,
          iconSource: "sun",
          title: "Day Light",
        },
        {
          id: 2,
          iconSource: "moon",
          title: "Evening Night",
        },
      ],
    };
  },
  methods: {
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
  },
};
</script>

<style lang="scss">
.room-scene-wrapper {
  width: 100%;
  max-width: 245px;
  margin-top: $standard-space;
}
.room-title {
  width: auto;
  white-space: nowrap;
  overflow: hidden;
}
.room-line {
  width: 100%;
  height: 0.1rem;
  border-radius: 10px;
  background: white;
}

.room-lights {
  // float: left;
  margin-top: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: $standard-space;
  grid-row-gap: $standard-space;
}
</style>
