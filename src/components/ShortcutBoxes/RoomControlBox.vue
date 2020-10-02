<template>
  <div class="room-controler-box basic-card">
    <div id="lights-shortcuts" :key="room.id" v-for="room in rooms">
      <RoomController :room="room" />
    </div>
  </div>
</template>

<script>
import RoomController from "./RoomController";

export default {
  name: "RoomControlBox",
  components: { RoomController },
  props: [],
  data() {
    return {
      rooms: [
        {
          id: 1,
          name: "Living Room",
        },
        {
          id: 2,
          name: "Kitchen",
        },
        {
          id: 3,
          name: "Bed Room",
        },
        {
          id: 4,
          name: "Office",
        },
        {
          id: 5,
          name: "Entrance",
        },
        {
          id: 6,
          name: "Dinning",
        },        
        {
          id: 7,
          name: "Bed Room 2",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.room-controler-box {
  display: inline-block;
  height: 5vw;
  margin: 0 1.6%;
  width: 63.4%;
}

#lights-shortcuts {
  display: inline-block;
  
}
</style>
