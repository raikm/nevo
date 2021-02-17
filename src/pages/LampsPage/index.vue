<template>
  <div>
    <div class="page-header"></div>
    <div class="room-wrapper">
      <div
        class="room-with-lamps"
        v-bind:key="room.roomName"
        v-for="room in rooms"
      >
        <Room :room="room" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"

import Room from "./Room";


export default {
  name: "LampsPage",
  components: { Room },
  created() {
    this.getDeviceStates();
  },
  computed: mapState(["currentEntities"]),
  watch: {
    currentEntities() {
      this.getDeviceStates()
    },
  },
  methods: {
    getDeviceStates() {
      this.entities = this.$store.getters.getCurrentEntities;
      this.filterAllLightsFromDevices();
    },
    filterAllLightsFromDevices() {
      const lights = this.entities.filter((d) => {
        return d.attributes["Room"];
      });

      const roomNames = [];

      for (let i = 0; i < lights.length; i++) {
        if (!roomNames.includes(lights[i].attributes.Room)) {
          roomNames.push(lights[i].attributes.Room);
        }
      }
      if (this.rooms.length > 0)  this.rooms = [];
      for (let i = 0; i < roomNames.length; i++) {
        // sort lights into Rooms
        var room = lights.filter((d) => {
          return d.attributes.Room == roomNames[i];
        });
        room.roomName = roomNames[i];
        this.rooms.push(room);
      }
    },
  },
  data() {
    return {
      // rooms: [
      //   {
      //     roomName: "Floor",
      //     backgroundImage: "",
      //     lamps: [
      //       { lampName: "Entrance", status: 1 },
      //       { lampName: "Floor", status: 1 },
      //     ],
      //   },
      //   //backgroundImage like a Table, Couch, Kitchen Counter, ...
      //   {
      //     roomName: "Kitchen",
      //     backgroundImage: "",
      //     lamps: [
      //       { lampName: "Entrance", status: 1, type: "bulb" },
      //       { lampName: "Floor", status: 1, type: "bulb" },
      //       { lampName: "Floor", status: 1, type: "bulb" },
      //       { lampName: "Floor", status: 1, type: "bulb" },
      //     ],
      //   },
      //   {
      //     roomName: "Living Room",
      //     backgroundImage: "",
      //     lamps: [
      //       { lampName: "Entrance", status: 1 },
      //       { lampName: "Floor", status: 1 },
      //       { lampName: "Floor", status: 1 },
      //       { lampName: "Floor", status: 1 },
      //       { lampName: "Floor", status: 1 },
      //       { lampName: "Floor", status: 1 },
      //       { lampName: "Floor", status: 1 },
      //     ],
      //   },
      //   {
      //     roomName: "Dinning Room",
      //     backgroundImage: "",
      //     lamps: [
      //       { lampName: "Entrance", status: 1 },
      //       { lampName: "Floor", status: 1 },
      //       { lampName: "Floor", status: 1 },
      //       { lampName: "Floor", status: 1 },
      //       { lampName: "Floor", status: 1 },
      //     ],
      //   },
      //   {
      //     roomName: "Bed Room",
      //     backgroundImage: "",
      //     lamps: [
      //       { lampName: "Entrance", status: 1 },
      //       { lampName: "Floor", status: 1 },
      //     ],
      //   },
      //   {
      //     roomName: "Bed 2 Room",
      //     backgroundImage: "",
      //     lamps: [
      //       { lampName: "Entrance", status: 1 },
      //       { lampName: "Floor", status: 1 },
      //     ],
      //   },
      // ],
      rooms: [],
      entities: null,
    };
  },
};
</script>

<style lang="scss">
@import "../../style/main-style";

.room-wrapper {
  overflow: auto;

  display: flex;
  flex-wrap: nowrap;
  // width: 100%;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

.room-with-lamps {
  //min-width: 6vw * 2;
  max-width: 300px;

  height: 100%;
  //margin-right: $standard-space;
  
}
</style>
