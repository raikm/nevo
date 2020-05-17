<template>
<main>
  <div>
    <div id="plantCard" v-bind:key="plant._id.counter" v-for="plant in plantInformation">
      <h1 id="plantTitle">{{ plant.name.replace(/[_-]/g, " ") }}</h1>
      <PlantInfo id="plantCardLayer" :plantIcons="plantIcons" :plant="plant" />
      <img id="plantImage" :src="'../img/plants/' + plant.name + '.png'" />
    </div>
  </div>
  </main>
</template>
<script>
import PlantInfo from "./PlantInfo";

export default {
  name: "PlantCard",
  components: {
    PlantInfo,
  },
  props: ["plantInformation"],
  data() {
    return {
       plantIcons: [
        {
          id: 1,
          //  test if @ works
          url: "../img/plantinfoicons/mercury.svg",
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
      plant: {}
    };
    
  },
};
</script>

<style scoped>
main {
  float: left;
}


#plantCard {
  float: left;
  border-radius: 15px;
  height: 28vh;
  width: 28vh;
  margin: 20px;
  box-shadow: 0 14px 28px;
  position: relative; /* import for the right corner image */
}

#plantTitle {
  height: 48px;
  margin: 6px 20px 0px 20px;
  padding-top: 5px;
  font-weight: 800;
  font-size: 22px;
  color: rgba(25, 103, 25, 0.681);

  /* background-color: darksalmon; */
}

#plantImage{
  /* testing */
  /* background-color: darksalmon; */
  border-radius: 15px;
  /* testing */
  height: 13vh;
  width: 13vh;
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
