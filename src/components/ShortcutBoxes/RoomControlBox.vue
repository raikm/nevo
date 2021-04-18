<template>
  <div class="room-controler-box">
    <div id="room-light-control-container" :key="room.id" v-for="room in rooms">
      <div
        class="room-light-control click-element"
        :class="{ 'lamps-on': room.status === 1 }"
      >
        <svgicon
          :class="{ 'bulb-on': room.status === 1 }"
          class="bulb-icon"
          icon="bulb"
          width="3vh"
          height="3vh"
        ></svgicon>
      </div>
      <span>{{ room.name }}</span>
    </div>
  </div>
</template>

<script>
import "../../compiled-icons/bulb";

export default {
  name: "RoomControlBox",
  components: {},
  props: [],
  data() {
    return {
      rooms: [
        {
          id: 1,
          name: "Living Room",
          status: 1,
        },
        {
          id: 9,
          name: "Couch Area",
          status: 1,
        },
        {
          id: 2,
          name: "Kitchen",
          status: 0,
        },
        {
          id: 3,
          name: "Bed Room",
          status: 0,
        },
        {
          id: 4,
          name: "Office",
          status: 1,
        },
        {
          id: 5,
          name: "Entrance",
          status: 0,
        },
        {
          id: 6,
          name: "Dinning",
          status: 0,
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.room-controler-box {
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  padding: 0 1vh;
  // width: 100%
  font-size: small;
  text-align: center;
  justify-content: left;

  // align-items: center;
}
#room-light-control-container {
  margin: auto 1.6%;
}
.room-light-control {
  display: grid;
  border-color: rgb(255, 255, 255);
  border-width: 0px;
  border-style: solid;
  background-color: rgba(255, 255, 255, 0.55);
  width: 6.5vh;
  height: 6.5vh;
  place-items: center;

  border-radius: 50%;
}
.room-light-control:hover {
}


</style>
