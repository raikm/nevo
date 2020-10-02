<template>
  <div id="app">
    <main>
      <div id="header-container">
        <div id="time-container">{{ this.time }}</div>
      </div>
      <div id="main-container">
        <div id="menu" class="main-menu">
          <div
            class="menu-button click-element"
            @click="changePage('/DashboardPage', 'dashboard-icon')"
          >
            <svgicon
              class="menu-icon dashboard-icon active"
              icon="menu_dashboard"
            ></svgicon>
          </div>
          <div
            class="menu-button click-element"
            @click="changePage('/LampsPage', 'lamp-icon')"
          >
            <svgicon class="menu-icon lamp-icon" icon="menu_lamp"></svgicon>
          </div>
          <div
            class="menu-button click-element"
            @click="changePage('/DashboardPage', 'calendar-icon')"
          >
            <div class="menu-icon calendar-icon">
              <div id="calendar-day">
                {{ this.weekday }}
              </div>
              <div id="calendar-date">
                {{ this.day }}
              </div>
            </div>
          </div>
          <div
            class="menu-button click-element"
            @click="changePage('/PlantsPage', 'plant-icon')"
          >
            <svgicon class="menu-icon plant-icon" icon="menu_plant"></svgicon>
          </div>
          <div
            class="menu-button click-element"
            @click="changePage('/PlantsPage', 'device-icon')"
          >
            <svgicon class="menu-icon device-icon" icon="menu_device"></svgicon>
          </div>
          <div
            class="menu-button click-element"
            @click="changePage('/PackagesPage', 'package-icon')"
          >
            <svgicon
              class="menu-icon package-icon"
              icon="menu_package"
            ></svgicon>
          </div>
          <div
            class="menu-button click-element"
            @click="changePage('SettingsPage', 'automation-icon')"
          >
            <svgicon
              class="menu-icon automation-icon"
              icon="menu_settings"
            ></svgicon>
          </div>
        </div>
        <div id="main-control" class="main-menu">
          <router-view></router-view>
        </div>
        <div id="newsfeed" class="main-menu">
          <div
            id="info-box"
            :key="infoBoxContent.id"
            v-for="infoBoxContent in infoBoxContentList"
          >
            <InfoBox class="click-element" :infoBoxContent="infoBoxContent" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import InfoBox from "./components/NewsfeedBoxes/InfoBox";
import "./compiled-icons/menu_dashboard";
import "./compiled-icons/menu_device";
import "./compiled-icons/menu_lamp";
import "./compiled-icons/menu_package";
import "./compiled-icons/menu_plant";
import "./compiled-icons/menu_settings";

export default {
  name: "homeapp",
  components: {
    InfoBox,
  },
  mounted() {
    //TODO: check if no problem with perfomance
    this.interval = setInterval(() => {
      this.defineCurrentFormatedTime();
    }, 1000);
    this.defineCurrentFormatedDay();
  },
  methods: {
    defineCurrentFormatedTime() {
      const date = new Date();
      this.time =
        date.getHours().toString() +
        ":" +
        (date.getMinutes() < 10 ? "0" : "") +
        date.getMinutes();
    },
    defineCurrentFormatedDay() {
      var date = new Date();
      this.day = date.getUTCDate();
      var weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";

      this.weekday = weekday[date.getDay()];
    },
  },
  destroyed() {
    clearInterval(this.interval);
  },
  data() {
    return {
      time: "",
      day: "",
      weekday: "",
      outsideTemperatur: 23,
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
    };
  },
};
</script>

<style lang="scss">
@import "/style/menu-style", "/style/main-colors", "/style/main-style"; // add with comma

body {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
#header-container {
  width: 100%;
  float: left;
  #time-container {
    float: right;
    padding: 10px;
    font-size: 4vh;
    text-align: center;
  }
}

.main-menu {
  height: 100vh;
}

#main-container {
  #menu {
    border-radius: 0px 40px;
    padding: 4vh;
    float: left;
    width: 10%;
  }

  #main-control {
    //  background: beige;
    float: left;
    padding: 4vh;
    width: 70%;
  }

  #newsfeed {
    border-radius: 40px 0px;
    padding: 4vh;
    background-color: rgba(247, 246, 249, 1);
    float: right;
    max-width: 450px;
    width: 20%;
  }
}

#svgbackground {
  fill: rgb(252, 252, 252);
  width: 100%;
  height: 100%;
}
</style>
