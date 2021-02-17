<template>
  <div>
    <div class="main-info-title-big room-title">{{ room.roomName }}</div>
    <div class="room-line"></div>
    <div class="room-lights">
      <div v-bind:key="light.attributes.friendly_name" v-for="light in room">
       <DeviceBox :deviceTitle="light.attributes.friendly_name" :iconName="light.attributes.type" :deviceStatus="light.state" />
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
.room-line{
  width: 80%;
  height: 0.1rem;
  border-radius: 10px;
  background: white;
}

.room-lights {
    float: left;
    margin-top: 8%;
  display: grid;
  grid-template-columns: 6vw 6vw;
  //grid-column-gap: $standard-space ; //TODO standard-space
  grid-row-gap: $standard-space ;
  
}


</style>
