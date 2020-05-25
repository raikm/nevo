<template>
  <main>
    <div class="left">
      <div
        class="iconContainer"
        v-bind:key="icon.id"
        v-for="icon in plantIcons"
      >
        <img class="iconImg" :src="icon.url" />
      </div>
    </div>
    <div class="right">
      <div class="infoBarContainer">
        

        <div class="infoBarBackground" >
          <div class="infoText">{{plant.temperature}}</div>
        </div>
        <div class="infoBarBackground" >
          <div class="infoBar" :style="{width: plant.soil_moisture / plant.soil_moisture_borders.max * 100 + '%'} "></div>
        </div>
        <div class="infoBarBackground" >
          <div class="infoBar" :style="{width: plant.soil_fertility / plant.soil_fertitlity_borders.max * 100 + '%'}"></div>
        </div>
        <div class="infoBarBackground" >
          <div class="infoBar" :style="{width: plant.sunlight / plant.sunlight_intensity_borders.max * 100 + '%'}"></div>
        </div>  
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "PlantInfo",
  computed: {},
  props: ["plantIcons", "plantInformation" , "plant"],
};
</script>

<style>
main {
  /* background-color: aqua; */
  display: inline;
}

.left {
  margin-right: 1.5vh;
  margin-left: 20px;
  width: 25px;
  float: left;
}

.right {
  margin-left: 2vh;  
  width: 75px;
  height: 20vh;
  overflow: hidden;
}

.iconContainer {
  display: flex;
  border: rgba(0, 0, 0, 0.8);
  border-style: dotted;
  border-width: 0.6px;
  border-radius: 4px;
  height: 4vh;
  width: 4vh;
  margin-bottom: 1vh;

}

.iconImg {
  height: 2.5vh;
  width: 2.5vh;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
}

.infoBarContainer {
  width: 100%; /* Full width */
  /* background-color: pink; */
  height: 100%;
  /* margin-top: 2vh; */
  overflow: hidden;
  margin-top: 1vh;
}

.infoBar {
  
  margin-bottom:3.8vh;
  font-size: 5px;
  height: 1.2vh;
  text-align: right; /* Right-align text */
  color: white; /* White text color */
  background-color: rgba(247, 143, 79, 0.585);
}

.infoText {
  
  /* margin-bottom:2.8vh; */
  font-size: 5px;
  /* height: 5vh; */
  color: black; /* White text color */
}
.infoBarBackground {
  
  margin-bottom: 3.8vh;
  background-color: rgba(245, 245, 245, 0.639);
  /* width: 100%; */
  
}
</style>
