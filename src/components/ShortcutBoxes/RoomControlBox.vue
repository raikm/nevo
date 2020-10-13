<template>
  <div class="room-controler-box basic-card">
    <div id="room-light-control-container" :key="room.id" v-for="room in rooms">
      <div class="room-light-control click-element">
        <svgicon
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
        },
        {
          id: 9,
          name: "Couch Area",
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
          name: "Bed Room II",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "../../style/main-style";

.room-controler-box {
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  padding: 0 1vh;
  // width: 100%
  font-size: small;
  text-align: center;
  justify-content: center;

  // align-items: center;
}
#room-light-control-container {
  margin: auto 1.6%;
}
.room-light-control {
  display: grid;
  border-color: rgb(237, 238, 250);
  border-width: 1px;
  border-style: solid;
  width: 6.5vh;
  height: 6.5vh;
  place-items: center;

  border-radius: 50%;
}
.room-light-control:hover {
}

.light-bulb {
  fill: #f5bc42;
}
.light-bulb-body {
  // stroke: rgb(66, 66, 66);
  fill: rgb(234, 234, 234);
}
</style>
