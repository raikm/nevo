<template>
  <div id="app">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, 
     user-scalable=0"
    />

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
            <!-- <svgicon class="menu-icon device-icon" icon="menu_rooms"></svgicon> -->
            <svg
              class="menu-icon"
              width="335"
              height="335"
              viewBox="0 0 335 335"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="5"
                y="5"
                width="325"
                height="325"
                rx="25"
                stroke="#686868"
                stroke-width="15"
              />
              <path d="M335 167H167V335" stroke="#686868" stroke-width="15" />
            </svg>
          </div>
          <div
            id="package-menu-button"
            class="menu-button click-element"
            @click="changePage('/PackagesPage', 'package-icon')"
          >
            <svgicon
              class="menu-icon package-icon"
              icon="menu_package"
            ></svgicon>
          </div>
          <!-- <div
            class="menu-button click-element"
            @click="changePage('SettingsPage', 'automation-icon')"
          >
            <svgicon
              class="menu-icon automation-icon"
              icon="menu_settings"
            ></svgicon>
          </div> -->
        </div>
        <div id="infobox-container" class="main-menu">
          <router-view></router-view>
        </div>
        <div id="newsfeed" class="main-menu">
          <div class="newsfeed-header"></div>

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
import "./compiled-icons/menu_rooms";

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
@import "/style/menu-style", "/style/main-colors", "/style/main-style"; // add with comma

body {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}
#app {
}

#header-container {
  // max-width: 2200px;
  width: 100%;
  margin: 0 auto !important;
  float: left;
  #time-container {
    float: right;
    padding: 10px;
    font-size: 4vh;
    text-align: center;
    margin-right: 1.6%;
  }
}

.main-menu {
  // height: 100vh;
}

.page-header {
  display: grid;

  height: 2.5rem;
}

#main-container {
  // background: rgb(172, 27, 27);
  //https://webgradients.com/
  //background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%); //day
  //background-image: linear-gradient(to top, #fddb92 0%, #d1fdff 100%);
  //background-image: linear-gradient(120deg, #215F60 0%, #215f609b 100%);
  //background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);
  background-color: #cddcdc;
  background-image: radial-gradient(
      at 50% 100%,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(0, 0, 0, 0.5) 100%
    ),
    linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.25) 0%,
      rgba(0, 0, 0, 0.25) 100%
    );
  background-blend-mode: screen, overlay;
  height: 100vh;
  width: 100vw;
  #menu {
    border-radius: 0px 40px;
    padding: 2.5rem;
    float: left;
    width: 10%;
  }

  #infobox-container {
    padding-right: 2.5rem;
    float: left;
    width: 65%;
    height: 100%;
  }
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
}

#svgbackground {
  fill: rgb(252, 252, 252);
  width: 100%;
  height: 100%;
}
</style>
