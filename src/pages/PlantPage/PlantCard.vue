<template>
  <div>
    <div id="plantCard" v-bind:key="plant.id" v-for="plant in plants">
      <h1 id="plantTitle">{{ plant.name }}</h1>
      <PlantInfoIcon id="plantCardLayer" :plantIcons="plantIcons" :plantInfos="plantInfos" />
      <img id="plantImage" :src="plant.imgurl" />
    </div>
  </div>
</template>
<script>
import PlantInfoIcon from "./PlantInfoIcon";

export default {
  name: "PlantCard",
  components: {
    PlantInfoIcon,
  },
  props: ["plants"],
  data() {
    return {
      plantIcons: [
        {
          id: 1,
          //  test if @ works
          url: "../img/plantinfoicons/drop.svg",
        },
        {
          id: 2,
          url: "../img/plantinfoicons/dry.svg",
        },
        {
          id: 3,
          url: "../img/plantinfoicons/fertilizer.svg",
        },
        {
          id: 4,
          url: "../img/plantinfoicons/sun.svg",
        },
      ],
      plantInfos: [
        {
          id: 1,
          text: "20%"
        },
        {
          id: 2,
          text: "70%"
        },
        {
          id: 3,
          text: "60%"
        },
        {
          id: 4,
          text: "50%"
        },
      ]
    };
  },
};
</script>

<style scoped>
body {
  /* display: inline-flex; */
}

#plantCard {
  /* float: left; */
  border-radius: 15px;
  height: 180px;
  width: 180px;
  margin: 20px;
  box-shadow: 0 14px 28px;
  position: relative; /* import for the right corner image */
}
#plantTitle {
  height: 48px;
  margin: 20px 20px 0px 20px;
  padding-top: 5px;
  font-weight: 600;
  font-size: 25px;

  /* background-color: darksalmon; */
}

#plantImage{
  /* testing */
  /* background-color: darksalmon; */
  border-radius: 15px;
  /* testing */
  height: 100px;
  width: 100px;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
}

#plantCardLayer {
  /* padding: 20px; */
  /* height: 100%; */
  /* background-color: rgba(250, 250, 250, 0.3); */
  border-radius: 15px;
  z-index: 2;
}
</style>
