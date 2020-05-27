<template>
  <div>
    <div class="scene-button click-element" :key="scene.id" v-for="scene in scenes">
      
        <StandardSceneBox :scene="scene" />
      <!-- {{ scene.title }} -->
    </div>
  </div>
</template>

<script>
import StandardSceneBox from './StandardSceneBox'

export default {
  name: "MainSceneBox",
  components: {StandardSceneBox},
  data() {
    return {
      scenes: [
        {
          id: 1,
          iconSource: "/img/sceneicons/morning.svg",
          title: "Start Morning",
        },
        {
          id: 2,
          iconSource: "/img/sceneicons/moon.svg",
          title: "Night Mode",
        },
        {
          id: 3,
          iconSource: "/img/sceneicons/back.png",
          title: "Back Home",
        },
        {
          id: 4,
          iconSource: "/img/sceneicons/leave.png",
          title: "Leave Home",
        },
        {
          id: 5,
          iconSource: "/img/sceneicons/clean.png",
          title: "Cleanup",
        },
        {
          id: 6,
          iconSource: "/img/sceneicons/projector.png",
          title: "Movie Mode",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.scene-button {

 display: inline-block;
  background-color: white;
  border-radius: 10px;
  border-color: rgb(243, 244, 254);
  border-width: 1px;
  border-style: solid;
  height: 15vh;
  margin: 0 1.05%;
  width: 14.5%;
}
</style>
