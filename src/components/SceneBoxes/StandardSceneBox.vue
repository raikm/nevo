<template>
<div>
        <svgicon class="scene-icon" :icon="scene.iconSource"></svgicon>
        
        <h1 class="scene-name" :scene="scene">
          {{scene.title}}
        </h1>


</div>
</template>

<script>
//npm run generate-icons
import '../../compiled-icons/login';
import '../../compiled-icons/logout';
import '../../compiled-icons/morning';
import '../../compiled-icons/projector';
import '../../compiled-icons/vacuum';
import '../../compiled-icons/moon';
import '../../compiled-icons/curtain';

export default {
  name: "StandardSceneBox",
  props: ["scene"]
 
};
</script>

<style lang="scss">

.scene-icon{  
  height: 2.8vh;
  
}

.scene-name{
  margin-top: 30%;
  margin-right: 1vh;
  float: right;
  font-size: 1.5vh;
  height: 4vh;
  line-height: 4vh;
  font-weight: 500;
}

</style>
