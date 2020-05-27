<template>
<div id="volume-container">
  <div id="volume-bar-border">
    <div id="volume-bar"></div>
  </div>
  </div>
</template>

<script>
export default {
  name: "VolumeController",
};
</script>

<style lang="scss">

#volume-container {
float: left;
margin: 1.6%;
}

#volume-bar-border {
  background-color: rgba(245, 245, 245, 0.971);
  border-radius: 10px;
  width: 100%;

}

#volume-bar {
  background-color: rgba(128, 128, 128, 0.331);
  border-radius: 10px;
  height: 5vh;
  overflow: hidden;
  width: 80%;
    
}
</style>
