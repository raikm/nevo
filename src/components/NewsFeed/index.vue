<template>
  <div id="newsfeed">
    <div class="newsfeed-header"></div>

    <div
      id="info-box"
      :key="infoBoxContent.id"
      v-for="infoBoxContent in infoBoxContentList"
    >
      <InfoBox class="click-element" :infoBoxContent="infoBoxContent" />
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
        {
          id: 1,
          iconSource: "menu_package",
          title: "Package Tracking",
          contentType: "package",
          iconClass: "package-icon active",
        },
        {
          id: 2,
          iconSource: "menu_plant",
          title: "Plant Alert",
          contentType: "plant",
          iconClass: "plant-icon active",
        },
        {
          id: 3,
          iconSource: "washing_machine",
          title: "Washing Machine",
          contentType: "device",
          iconClass: "",
        },
      ],
    };
  },
};
</script>

<style lang="scss">

.newsfeed-header {
  height: 2.5rem;
}
#newsfeed {
  // border-radius: 40px 0px;
  padding: 0 2.5rem 2.5rem 2.5rem;
  // background-color: rgba(247, 246, 249, 1);
  float: right;
  // max-width: 450px;
  width: 25%;
}
</style>
