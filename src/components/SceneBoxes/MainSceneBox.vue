<template>
  <div>
    <div
      class="scene-button basic-card click-element"
      :key="scene.id"
      v-for="scene in scenes"
    >
      <StandardSceneBox :scene="scene" />
      
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
  display: inline-block;
  height: 10vh;
  margin: 0 1.05%;
  width: 14.5%;
}
</style>
