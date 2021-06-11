<template>
  <div>
    <div class="page-header"></div>
    <div class="room-container">
      <Room
        :style="{ width: room.lights.length >= 5 ? 100 + '%' : 48 + '%' }"
        v-bind:key="room.roomName"
        v-for="room in rooms"
        :room="room"
        class="room"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Room from "./Room";

export default {
  name: "LampsPage",
  components: { Room },
  created() {
    this.setAllDevicesInRooms();
  },
  computed: mapState(["currentEntities"]),
  watch: {
    currentEntities() {
      this.setAllDevicesInRooms();
    },
  },
  methods: {
    setAllDevicesInRooms() {
      const roomNames = [];
      this.allDevicesInRooms = this.$store.getters.currentEntities.filter(
        (d) => {
          return d.attributes["Room"];
        }
      );
      for (let i = 0; i < this.allDevicesInRooms.length; i++) {
        if (!roomNames.includes(this.allDevicesInRooms[i].attributes.Room)) {
          roomNames.push(this.allDevicesInRooms[i].attributes.Room);
        }
      }
      const lights = this.allDevicesInRooms.filter((d) => {
        return d.entity_id.startsWith("light");
      });
      const otherRoomDevices = this.allDevicesInRooms.filter((d) => {
        return !d.entity_id.startsWith("light");
      });
      if (this.rooms.length > 0) this.rooms = [];
      for (let i = 0; i < roomNames.length; i++) {
        // sort lights into Rooms
        let room = [];
        room["lights"] = lights.filter((d) => {
          return d.attributes.Room == roomNames[i];
        });
        room["otherDevices"] = otherRoomDevices.filter((d) => {
          return d.attributes.Room == roomNames[i];
        });
        room.roomName = roomNames[i];
        this.rooms.push(room);
      }
    },
    filterAllLightsFromDevices() {
      const lights = this.$store.getters.currentEntities.filter((d) => {
        return d.attributes["Room"] && d.entity_id.startsWith("light");
      });

      const roomNames = [];

      for (let i = 0; i < lights.length; i++) {
        if (!roomNames.includes(lights[i].attributes.Room)) {
          roomNames.push(lights[i].attributes.Room);
        }
      }
      if (this.rooms.length > 0) this.rooms = [];
      for (let i = 0; i < roomNames.length; i++) {
        // sort lights into Rooms
        let room = lights.filter((d) => {
          return d.attributes.Room == roomNames[i];
        });
        room.roomName = roomNames[i];
        this.rooms.push(room);
      }
    },
  },
  data() {
    return {
      rooms: [],
      allDevicesInRooms: [],
    };
  },
};
</script>

<style lang="scss">
.room-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-bottom: $standard-space;
}

.room {
  margin: 1%;
  position: relative;
  overflow: hidden;
  background: rgba(247, 246, 243, 0.8);
  // backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 1vh;
}
</style>
