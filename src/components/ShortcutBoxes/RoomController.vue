<template>
  <div class="lamp-shortcut-container">
    <button class="lamp-shortcut-button">o</button>
    {{ room.name }}
  </div>
</template>

<script>
export default {
  name: "RoomController",
  components: {},
  props: ["room"],
};
</script>

<style lang="scss">
.lamp-shortcut-container {
  height: 100%;
  width: 10vh;
  text-align: center;
  align-items: center;
  justify-content: center;
}
.lamp-shortcut-button {
  display: block;
  height: 5vh;
  width: 5vh;
  border-radius: 50%;
  margin: 0 auto;
}
</style>
