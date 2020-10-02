<template>
  <div>
    <div
      class="basic-card click-element"
      :key="scene.id"
      v-for="scene in scenes"
    >
      <StandardSceneBox class="scene-button" :scene="scene" />
      
    </div>
  </div>
</template>

<script>
import StandardSceneBox from "./StandardSceneBox";

export default {
  name: "MainSceneBox",
  components: { StandardSceneBox },
  data() {
    return {
      scenes: [
        {
          id: 1,
          iconSource: "morning",
          title: "Start Morning",
        },
        {
          id: 2,
          iconSource: "moon",
          title: "Night Mode",
        },
        {
          id: 3,
          iconSource: "login",
          title: "Back Home",
        },
        {
          id: 4,
          iconSource: "logout",
          title: "Leave Home",
        },
        {
          id: 5,
          iconSource: "vacuum",
          title: "Cleanup",
        },
        {
          id: 6,
          iconSource: "projector",
          title: "Movie Mode",
        },
        {
          id: 7,
          iconSource: "curtain",
          title: "Curtains low",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.scene-button {
  width: 10vw;
  
}
</style>
