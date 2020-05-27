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
          <img class="menu-icon" :src="menu.iconSource" />
        </div>
      </div>
      <div id="mainControl" class="main-menu column">
        <TemperatureMainInfoBox />
        <HumidityMainInfoBox />
        <LightIntensityMainInfoBox />
        <PublicTransportMainInfoBox />
        <CalendarMainInfoBox />
        <MusicControlMainInfoBox />
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
import PublicTransportMainInfoBox from "../../components/MainInfoBoxes/PublicTransportMainInfoBox";
import CalendarMainInfoBox from "../../components/MainInfoBoxes/CalendarMainInfoBox";
import MusicControlMainInfoBox from "../../components/MainInfoBoxes/MusicControlMainInfoBox";


import InfoBox from "../../components/NewsfeedBoxes/InfoBox";

export default {
  name: "DashboardPage",
  components: {
    InfoBox,
    TemperatureMainInfoBox,
    HumidityMainInfoBox,
    LightIntensityMainInfoBox,
    PublicTransportMainInfoBox,
    CalendarMainInfoBox,
    MusicControlMainInfoBox
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
          iconSource: "/img/menuicons/dashboard.svg",
          link: "",
        },
        {
          id: 2,
          title: "Lights",
          iconSource: "/img/menuicons/lights.svg",
          link: "",
        },
        // {
        //   id: 3,
        //   title: "Devices",
        //   iconSource: "/img/menuicons/devices.svg",
        //   link: "",
        // },
        {
          id: 4,
          title: "Plants",
          iconSource: "/img/menuicons/plants.svg",
          link: "",
        },
        {
          id: 5,
          title: "Packages",
          iconSource: "/img/menuicons/packages.svg",
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
  min-height: 100vh;
  margin-top: 2vh;
}

#menu {
  border-radius: 0px 40px;
  background-color: #2980b9;
  padding-top: 4vh;
}

.menu-button {
  // background-color: rgba(243, 240, 240, 1);
  // border-color: grey;
  // border-style: dotted;
  // border-radius: 10px;
  // border-width: 1px;
  display: flex;
  height: 8vh;
  width: 8vh;
  margin-bottom: 1.5vh;
  margin-left: auto;
  margin-right: auto;
  text-align: center;

}

.menu-icon {
  // fill: red;
  margin: auto;
  width: 70%;
 
}

#mainControl {
  margin-left: 2vh;
  margin-right: 2vh;
  overflow: hidden;
  padding: 4vh;
}

.main-info-box {
  border-radius: 10px;
  float: left;
  width: 30%;
  margin: 1.6% 1.6%;
  padding: 1vh;
  box-shadow: 0 1px 2px 0 
}

.main-info-box-small {
  height: 15vh;
}

.main-info-box-big {
  height: 25vh;
}
.main-info-header {
  display: inline-flex;
  font-size: 2.8vh;
  height: 3vh;
  line-height: 3vh;

  overflow: hidden;
}
.main-info-icon {
  float: left;
  height: 3vh;
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
