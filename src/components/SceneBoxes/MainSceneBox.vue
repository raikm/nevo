<template>
  <div>
    <div class="scene-button" :key="scene.id" v-for="scene in scenes">
      <!-- {{ scene.title }} -->
    </div>
  </div>
</template>

<script>
export default {
  name: "MainSceneBox",
  data() {
    return {
      scenes: [
        {
          id: 1,
          iconSource: "/img/icons/scenes/___",
          title: "Start Morning",
        },
        {
          id: 2,
          iconSource: "/img/icons/scenes/___",
          title: "Night Mode",
        },
        {
          id: 3,
          iconSource: "/img/icons/scenes/___",
          title: "Back Home",
        },
        {
          id: 4,
          iconSource: "/img/icons/scenes/___",
          title: "Leave Home",
        },
        {
          id: 5,
          iconSource: "/img/icons/scenes/___",
          title: "Cleanup",
        },
        {
          id: 6,
          iconSource: "/img/icons/scenes/___",
          title: "Movie Mode",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.scene-button {
  box-shadow: 0 1px 2px 0;
  border-radius: 10px;
  display: flex;
  float: left;
  height: 15vh;
  margin: 0 2.3vh;

  width: 13.3vh;
}
</style>
