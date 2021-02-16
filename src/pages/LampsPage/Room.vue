<template>
  <div>
    <div class="main-info-title-big room-title">{{ room.roomName }}</div>
    <div class="room-lights">
      <div v-bind:key="lamp.lampName" v-for="lamp in room.lamps">
       <DeviceBox :deviceTitle="lamp.lampName" :iconName="'bulb'" :deviceStatus="lamp.status" />
      </div>
    </div>
  </div>
</template>

<script>
import DeviceBox from '../../components/DeviceBox/DeviceBox'

export default {
  name: "Room",
  props: ["room"],
  components: {DeviceBox}
};
</script>

<style lang="scss">
@import "../../style/main-style";

.room-title{
    width: auto;
    
}

.room-lights {
    float: left;
    margin-top: 8%;
  display: grid;
  grid-template-columns: 6vw 6vw;
  grid-column-gap: $standard-space ; //TODO standard-space
  grid-row-gap: $standard-space ;
  
}


</style>
