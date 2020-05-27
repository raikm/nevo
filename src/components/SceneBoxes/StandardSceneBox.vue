<template>
<div>
        <img
          class="scene-icon"
          :src="scene.iconSource"
        />
        <h1 class="scene-name" :scene="scene">
          {{scene.title}}
        </h1>


</div>
</template>

<script>
export default {
  name: "StandardSceneBox",
  props: ["scene"]
 
};
</script>

<style lang="scss">

.scene-icon{  
  height: 4vh;
  margin: 1vh;
}

.scene-name{
  margin-top: 4vh;
  margin-right: 1vh;
  float: right;
  font-size: 1.5vh;
  height: 4vh;
  line-height: 4vh;
}

</style>
