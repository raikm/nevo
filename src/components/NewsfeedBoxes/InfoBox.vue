<template>
  <div class="info-box" :data="infoBoxContent">
      
      <img class="info-icon" :src="infoBoxContent.iconSource" />
      <h1 class="info-title">{{infoBoxContent.title}}</h1>
      
      <div v-if="infoBoxContent.contentType === 'package'">
        <InfoPackageContent />
      </div>

      <div v-else-if="infoBoxContent.contentType === 'plant'">
        <InfoPlantContent />

      </div>


  </div>
</template>

<script>
// import InfoContent from './InfoContent'
import InfoPackageContent from './InfoPackageContent'
import InfoPlantContent from './InfoPlantContent'

export default {
  name: "InfoBox",
  components: {InfoPackageContent, InfoPlantContent},
  props: ["infoBoxContent"],
};
</script>

<style scoped>
.info-box {
  border-color: grey;
  border-style: dotted;
  border-radius: 10px;
  border-width: 1px;
  margin-bottom: 1vh;
  width: 100%;
  padding: 10px;
}

.info-icon, .info-title {
  height: 3vh;
  margin: 1vh 0;
  padding: 0 0.5vh;
  line-height:3vh;
}

.info-icon {
  float: left;
  height: 3vh;
  
}

.info-title {
  font-size: 2.5vh;
  font-weight: 700;
  overflow: hidden;
  
 
  
}
</style>
