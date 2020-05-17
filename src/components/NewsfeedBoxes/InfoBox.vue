<template>
  <div class="infobox">
    <img class="info-icon" src="../../../public/img/icons/shipping-and-delivery.svg"><h1 class="info-title">Package Tracking</h1>
    <InfoPackageContent />


    
  </div>
</template>

<script>
// import InfoContent from './InfoContent'
import InfoPackageContent from './InfoPackageContent'

export default {
    name: "InfoBox",
    components: {InfoPackageContent}
}
</script>

<style scoped>
.infobox {
  border-color: grey;
  border-style: dotted;
  border-radius: 5px; 
  border-width: 1px;
  padding: 1vh;
}

.info-icon{
    margin: 1vh 0;
    height: 3vh;
    width: 3vh;
    float: left;
}

.info-title {
    margin: 1vh 0;
    padding: 0 1vh;
    height: 3vh;
    font-size: large;
    font-weight: 700;
    overflow: hidden;
}

</style>
