<template>
  <div>
    <div class="scene-button" :key="scene.id" v-for="scene in scenes">
      
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
  box-shadow: 0 1px 2px 0;
  border-radius: 10px;

  height: 15vh;
  margin: 0 2%;
  width: 12.3vh;
}
</style>
