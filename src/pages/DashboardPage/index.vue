<template>
  <main>
    <div class="columns">
      <div id="leftheader" class="column header is-1"></div>
      <div id="middleheader" class="column header ">
        <h1 id="dashboard-title">DASHBOARD</h1>
      </div>
      <div id="rightheader" class="column header is-3"></div>
    </div>
    <div class="columns">
      <div id="menu" class="main-menu column is-1">
        <div class="menu-button" :key="menu.id" v-for="menu in menus">
          {{ menu.title }}
        </div>
      </div>
      <div id="mainControl" class="main-menu column">
        <TemperatureMainInfoBox />
        <HumidityMainInfoBox />
        <LightIntensityMainInfoBox />
      </div>
      <div id="newsfeed" class="main-menu column is-3">
        <div
          id="info-box"
          :key="infoBoxContent.id"
          v-for="infoBoxContent in infoBoxContentList"
        >
          <InfoBox :infoBoxContent="infoBoxContent" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import TemperatureMainInfoBox from "../../components/MainInfoBoxes/TemperatureMainInfoBox";
import HumidityMainInfoBox from "../../components/MainInfoBoxes/HumidityMainInfoBox";
import LightIntensityMainInfoBox from "../../components/MainInfoBoxes/LightIntensityMainInfoBox";
import InfoBox from "../../components/NewsfeedBoxes/InfoBox";

export default {
  name: "DashboardPage",
  components: {
    InfoBox,
    TemperatureMainInfoBox,
    HumidityMainInfoBox,
    LightIntensityMainInfoBox,
  },
  data() {
    return {
      infoBoxContentList: [
        {
          id: 1,
          iconSource: "/img/icons/shipping-and-delivery.svg",
          title: "Package Tracking",
          contentType: "package",
        },
        {
          id: 2,
          iconSource: "/img/icons/plant.svg",
          title: "Plant Alert",
          contentType: "plant",
        },
      ],
      menus: [
        {
          id: 1,
          title: "Home",
          iconSrc: "",
          link: "",
        },
        {
          id: 2,
          title: "Devices",
          iconSrc: "",
          link: "",
        },
        {
          id: 3,
          title: "Lights",
          iconSrc: "",
          link: "",
        },
        {
          id: 4,
          title: "Plants",
          iconSrc: "",
          link: "",
        },
        {
          id: 5,
          title: "Packages",
          iconSrc: "",
          link: "",
        },
        {
          id: 6,
          title: "Settings",
          iconSrc: "",
          link: "",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
#dashboard-title {
  font-size: 7vh;
  line-height: 9vh;
  height: 9vh;
}

#middleheader {
  margin: 0 2vh;
  // padding: 4vh;
}

.main-menu {
  min-height: 150vh;
  margin-top: 2vh;
}

#menu {
  border-radius: 0px 40px;
  background-color: rgb(226, 109, 55);
  padding-top: 4vh;
}

.menu-button {
  border-color: grey;
  border-style: dotted;
  border-radius: 10px;
  border-width: 1px;
  width: 8vh;
  height: 8vh;
  max-width: 100%;
  margin-bottom: 1vh;
  max-width: 10vh;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  background-color: rgba(243, 240, 240, 0.2);
}

#mainControl {
  margin-left: 2vh;
  margin-right: 2vh;
  overflow: hidden;
  padding: 4vh;
}

.main-info-box {
  border-color: grey;
  border-style: solid;
  border-radius: 10px;
  border-width: 1px;
  float: left;
  height: 15vh;
  width: 30%;
  margin: 0 1.6%;
  padding: 1vh;
}

.main-info-header {
  // background-color: yellowgreen;
  display: inline-flex;
  font-size: 2.8vh;
  height: 3vh;
  line-height: 3vh;
  overflow: hidden;
}

.main-info-title {
  padding-left: 1vh;
}

#newsfeed {
  border-radius: 40px 0px;
  padding: 4vh;
  background-color: rgba(224, 224, 224, 0.353);
}
</style>
