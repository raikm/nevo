<template>
  <main>
  
    <div class="left">
      <div
        class="iconContainer"
        v-bind:key="icon.id"
        v-for="icon in plantIcons"
      >
        <img class="iconImg" :src="icon.url" />
      </div>
    </div>
    <div class="right" >
      <div class="infoContainer" v-bind:key="info.id"
        v-for="info in plantInfos"><progress id="file" value="32" max="100"> 32% </progress></div>
    </div>
  </main>
</template>

<script>
export default {
  name: "PlantInfoIcon",
  computed: {},
  props: ["plantIcons", "plantInfos"],
};
</script>

<style>
main {
  /* background-color: aqua; */
  display: inline;
}


.left {
  margin: 5px;
  margin-left: 20px;
  
  width: 25px;
  /* background-color: deeppink; */
  float: left;
}

.right {
  margin: 5px;
  width: 45px;
  /* background-color: darkseagreen; */
  overflow: hidden;
}

.iconImg {
  height: 15px;
  width: 15px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
}

.iconContainer {
  /* float: left; */
  display: flex;
  border: black;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  height: 23px;
  width: 23px;
  margin: 4%;
}

.infoContainer {
  font-size: 16px;
  font-weight: 500;
  /* height: 20px; */
  /* width: 100px; */
  padding-left: 3px;
  /* align-content: center; */
  /* margin: 4%; */
  /* display: flex; */
}
</style>
