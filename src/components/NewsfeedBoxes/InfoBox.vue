<template>
  <div
    @click="changePage('/PackagesPage')"
    class="info-box"
    
    :data="infoBoxContent"
  >
    <svgicon
      :class="infoBoxContent.iconClass"
      class="info-icon"
      :original="true"
      :icon="infoBoxContent.iconSource"
    ></svgicon>
    <h1 class="info-title">{{ infoBoxContent.title }}</h1>

    <div v-if="infoBoxContent.contentType === 'package'">
      <InfoPackageContent />
    </div>

    <div v-else-if="infoBoxContent.contentType === 'plant'">
      <InfoPlantContent />
    </div>

    <div v-else-if="infoBoxContent.contentType === 'device'">
      <InfoDeviceContent />
    </div>
  </div>
</template>

<script>
// import InfoContent from './InfoContent'
import InfoPackageContent from './InfoPackageContent'
import InfoPlantContent from './InfoPlantContent'
import InfoDeviceContent from './InfoDeviceContent'
import "../../compiled-icons/menu_plant";
import "../../compiled-icons/menu_package";
import "../../compiled-icons/washing_machine";

export default {
  name: "InfoBox",
  components: {InfoPackageContent, InfoPlantContent, InfoDeviceContent},
  props: ["infoBoxContent"],
};
</script>

<style lang="scss" scoped>
@import "../../style/menu-style";

.info-box {
  background-color: rgba(255, 255, 255, .45);   
    backdrop-filter: blur(10px);
  border-radius: 10px;
  border-color: rgb(243, 244, 254);
  border-width: 0px;
  border-style: solid;
  margin-bottom: 1vh;
  width: 100%;
  padding: 10px;
}

.info-icon,
.info-title {
  height: 3vh;
  margin: 1vh 0;
  padding: 0 0.5vh;
  line-height: 3vh;
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
