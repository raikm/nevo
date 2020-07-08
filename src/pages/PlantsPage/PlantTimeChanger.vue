<template>
  <div class="button-container">
    <button class="time-button">24h</button>
    <button class="time-button">7d</button>
    <button class="time-button">1m</button>
  </div>
</template>

<script>
export default {
  name: "PlantTimeChanger",
};
</script>

<style lang="scss">
.button-container {
//   background-color: steelblue;
  height: 3vh;
  margin: 1.6% 1.6%;
  width: 96.8%;
  
}

.time-button{
    margin: 0 0.2vh;
    width: 6vh;
    height: 70%;
}

</style>
