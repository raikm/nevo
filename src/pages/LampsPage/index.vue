<template>
  <div class="room-wrapper">
    <div
      class="room-with-lamps"
      v-bind:key="room.roomName"
      v-for="room in rooms"
    >
      <Room :room="room" />
    </div>
  </div>
</template>

<script>
import Room from "./Room";
export default {
  name: "LampsPage",
  components: { Room },
  data() {
    return {
      rooms: [
        {
          roomName: "Floor",
          backgroundImage: "",
          lamps: [
            { lampName: "Entrance", status: 1 },
            { lampName: "Floor", status: 1 },
          ],
        },
        //backgroundImage like a Table, Couch, Kitchen Counter, ...
        {
          roomName: "Kitchen",
          backgroundImage: "",
          lamps: [
            { lampName: "Entrance", status: 1, type: 'bulb' },
            { lampName: "Floor", status: 1, type: 'bulb' },
            { lampName: "Floor", status: 1, type: 'bulb' },
            { lampName: "Floor", status: 1, type: 'bulb' },
          ],
        },
        {
          roomName: "Living Room",
          backgroundImage: "",
          lamps: [
            { lampName: "Entrance", status: 1 },
            { lampName: "Floor", status: 1 },
            { lampName: "Floor", status: 1 },
            { lampName: "Floor", status: 1 },
            { lampName: "Floor", status: 1 },
            { lampName: "Floor", status: 1 },
            { lampName: "Floor", status: 1 },
          ],
        },
        {
          roomName: "Dinning Room",
          backgroundImage: "",
          lamps: [
            { lampName: "Entrance", status: 1 },
            { lampName: "Floor", status: 1 },
            { lampName: "Floor", status: 1 },
            { lampName: "Floor", status: 1 },
            { lampName: "Floor", status: 1 },
          ],
        },
        {
          roomName: "Bed Room",
          backgroundImage: "",
          lamps: [
            { lampName: "Entrance", status: 1 },
            { lampName: "Floor", status: 1 },
          ],
        },
         {
          roomName: "Bed 2 Room",
          backgroundImage: "",
          lamps: [
            { lampName: "Entrance", status: 1 },
            { lampName: "Floor", status: 1 },
          ],
        },
      ],
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
  
  height: 100%;
  margin-right: $standard-space;
}
</style>
