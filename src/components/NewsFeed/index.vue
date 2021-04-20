<template>
  <div id="newsfeed">
    <div class="newsfeed-header"></div>
    <div v-if="infoBoxContentList.length > 0">
      <div
        id="info-box"
        :key="infoBoxContent.id"
        v-for="infoBoxContent in infoBoxContentList"
      >
        <InfoBox class="click-element" :infoBoxContent="infoBoxContent" />
      </div>
    </div>
    <div id="no-notification-box" v-else>
      No Notifcations
    </div>
  </div>
</template>

<script>
import InfoBox from "../NewsfeedBoxes/InfoBox";
export default {
  components: { InfoBox },
  data() {
    return {
      infoBoxContentList: [
        // {
        //   id: 1,
        //   iconSource: "menu_package",
        //   title: "Package Tracking",
        //   contentType: "package",
        //   iconClass: "package-icon active",
        // },
        // {
        //   id: 2,
        //   iconSource: "menu_plant",
        //   title: "Plant Alert",
        //   contentType: "plant",
        //   iconClass: "plant-icon active",
        // },
        // {
        //   id: 3,
        //   iconSource: "washing_machine",
        //   title: "Washing Machine",
        //   contentType: "device",
        //   iconClass: "",
        // },
      ],
    };
  },
};
</script>

<style lang="scss">

#no-notification-box {
  width: 100%;
  text-align: center;
  font-size: $standard-text-medium;
  margin-top: 3vh;
  color: white;
}
</style>
