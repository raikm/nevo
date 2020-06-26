<template>
  <div class="main-info-box main-info-box-small">
    <div id="humidity-info-box" :humidityInfo="humidityInfo">
      <div class="main-info-header">
        <img
          class="main-info-icon"
          src="../../../public/img/icons/humidity.svg"
        />
        <h1 class="main-info-title" id="humidity-header">
          Humidity
        </h1>
      </div>
      <div v-if="humidityInfo.value != 101">
        <span id="humidity-value">{{ humidityInfo.value }}%</span>
      </div>
      <div v-else>
        <span id="humidity-value">--</span>
      </div>
    </div>
   
  </div>
</template>

<script>
export default {
  name: "HumidityMainInfoBox",
  components: {},
  props: [],
  data() {
    return {
      humidityInfo: {
        id: 1,
        value: 68,
      },
    };
  },
};
</script>

<style lang="scss">
#humidity-info-box {
  float: left;
  margin-right: 10px;
  width: 85%;
}


#humidity-value {
  font-size: 7vh;
  padding-left: 3vh;
}

#humidity-controller {
  
  background-color: rgba(116, 188, 203, 0.456);
  
  border-radius: 10px;
  height: 100%;
  overflow: hidden;
}
</style>
