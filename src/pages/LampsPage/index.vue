<template>
  <div>
    <div class="page-header">
      <InfoBoxWithIcon :iconName="'bulb'" headerValue="Turn off all lights" />
    </div>
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
import { mapState } from "vuex";
import InfoBoxWithIcon from "@/components/Pageheaders/InfoBoxWithIcon";

import Room from "./Room";

export default {
  name: "LampsPage",
  components: { Room, InfoBoxWithIcon },
  created() {
    this.getDeviceStates();
  },
  mounted() {
    // document.getElementById("page").style.width = "90%";
  },
  computed: mapState(["currentEntities"]),
  watch: {
    currentEntities() {
      this.getDeviceStates();
    },
  },
  methods: {
    getDeviceStates() {
      this.filterAllLightsFromDevices();
    },
    filterAllLightsFromDevices() {
      //TODO: only lights!
      const lights = this.$store.getters.currentEntities.filter((d) => {
        // console.log(d)
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
    };
  },
};
</script>

<style lang="scss">
.room-wrapper {
  overflow-y: scroll;

  display: flex;
  flex-wrap: nowrap;
  // width: 100%;
  // justify-content: space-between;
  // width: 100%;
  height: 100%;
}

.room-with-lamps {
  // min-width: 295px;
  // width: 6vw * 2;
  max-width: 295px;
  height: 100%;
  margin-right: $standard-space;
}

.lamps-on {
  background-color: rgba(255, 255, 255, 0.95);
}

.bulb-icon {
  fill: rgb(230, 230, 230);
}

.bulb-on {
  fill: #f2bd4b;
  filter: url(#sofGlow);
}

.light-stand-body {
  fill: $main-blue;
}

.light-bulb-body {
  // stroke: rgb(66, 66, 66);
  fill: rgb(230, 230, 230);
}
</style>
