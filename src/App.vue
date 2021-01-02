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
            <!-- <svgicon class="menu-icon device-icon" icon="menu_rooms"></svgicon> -->
<svg class="menu-icon" width="335" height="335" viewBox="0 0 335 335" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="5" y="5" width="325" height="325" rx="25" stroke="#686868" stroke-width="15"/>
<path d="M335 167H167V335" stroke="#686868" stroke-width="15"/>
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
import './mixins/helpersMixin'
const myMixin = {
  methods: {
    getConfigFile: function() {
      //TODO: request also the value and return already the value not the config
      var config = require("../config.json");
      return config;
    },
    changePage: function(path, name) {
      this.$router.push(path);
      var elements = document.getElementsByClassName("active");
      for (var i = 0; i < elements.length; i++) {
        elements[0].classList.remove("active");
      }
      document.getElementsByClassName(name)[0].classList.add("active");
    },
    showToastError(text) {
      this.$buefy.toast.open({
        duration: 5000,
        message: text,
        position: "is-bottom",
        type: "is-danger",
      });
    },
    showToastInfo(text) {
      this.$buefy.toast.open({
        duration: 5000,
        message: text,
        position: "is-bottom",
        type: "is-light",
      });
    },

    defineSupplierShort(supplier) {
      if (supplier.includes("AUSTRIAN")) {
        return supplier.replace("AUSTRIAN ", "");
      }
      return supplier;
    },
    defineStatusTagColor(status) {
      var green = "#53c66ebd";
      var greenAlternative = "#53c66ebd";
      var yellow = "#e3ea60bd";
      var startColor = "#e66718bd";

      var backgroundColor = startColor;

      if (
        status == "Delivered" ||
        status == "OutForDelivery" ||
        status == "InfoReceived" ||
        status == "AvailableForPickup"
      ) {
        backgroundColor = green;
      } else if (status == "InTransit" || status == "Pending") {
        backgroundColor = yellow;
      } else if (status == "Avaible for Pickup") {
        backgroundColor = greenAlternative;
      }
      return backgroundColor;
    },
    // getPackageInfos(packages) {
    //   if (packages.length > 1) {
    //     packages = [];
    //   }
    //   var config = this.getConfigFile();
    //   this.$axios
    //     .get("https://api.aftership.com/v4/trackings", {
    //       headers: {
    //         "aftership-api-key": config.aftership.api_key,
    //         "Content-Type": "application/json",
    //       },
    //     })
    //     .then((response) => {
    //       var packagesInformation = response.data.data.trackings;
    //       for (var i = 0; i < packagesInformation.length; i++) {
    //         var info = packagesInformation[i];

    //         var delivery_date_string =
    //           info.expected_delivery != null
    //             ? info.expected_delivery
    //             : info.shipment_delivery_date; //<--
    //         var status = info.tag;
    //         var backgroundColor = this.defineStatusTagColor(status);
    //         var delivery_date = new Date(delivery_date_string);
    //         var supplier = info.slug.replace("-", " ").toUpperCase();
    //         var supplierShort = this.defineSupplierShort(supplier);
    //         var p = {
    //           id: i,
    //           supplier: supplier,
    //           supplier_short: supplierShort,
    //           package_information: info.title,
    //           trackingnumber: info.tracking_number,
    //           status: status,
    //           delivery_date: delivery_date,
    //           delivery_information: "",
    //           backgroundColor: backgroundColor,
    //         };
    //         this.packages.push(p);
    //       }
    //     })
    //     .catch((error) => {
    //       this.showToastError(error);
    //     });
    // },
    simplifyArray(displayArray) {
      // var simpliedArray = []

      displayArray.forEach((element) => {
        var duplicates = displayArray.filter(
          (e) => e.timestamp.getHours() == element.timestamp.getHours()
        );
        if (duplicates.length > 1) {
          //var newestDate = duplicates.map(e => e.timestamp ).sort().reverse()[0]
          //console.log(newestDate)
          //TODO: delete now all from the duplicated who dont have this date
        }
      });
      // var hour = timestamp.getHours();
      // var minutes = timestamp.getMinutes();
      // if (!Number.isInteger(hour / 2)) {
      //   if (minutes > 30) {
      //     hour = hour + 1;
      //   } else {
      //     hour += 1;
      //   }
      // }
      // timestamp.setMinutes(0);
      // timestamp.setSeconds(0);
      // timestamp.setHours(hour);
      return displayArray;
    },
    cleanUpOldData(plantDataTimestamp, plantDetailArray) {
      for (var i = 0; i < plantDetailArray.length; i++) {
        if (
          plantDetailArray[i].timestamp.getDate() ===
            plantDataTimestamp.getDate() &&
          plantDetailArray[i].timestamp.getTime() ===
            plantDataTimestamp.getTime()
        ) {
          plantDetailArray.splice(i);
        }
      }
    },
    convertHex(hexCode, opacity) {
      var hex = hexCode.replace("#", "");

      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }

      var r = parseInt(hex.substring(0, 2), 16),
        g = parseInt(hex.substring(2, 4), 16),
        b = parseInt(hex.substring(4, 6), 16);

      return "rgba(" + r + "," + g + "," + b + "," + opacity / 100 + ")";
    },
    //TODO: make to one generic method: https://gist.github.com/danieliser/b4b24c9f772066bcf0a6
    preparePlantChart(data, min, max, mainColor, timeFormat, start, end) {

      // console.log(start)
      // console.log(end)
      // const dataModified = data.filter(entry => entry.length > 6);
      // console.log(data)


      const opactiyColor = () => {
        let hex = mainColor.replace("#", "");

        if (hex.length === 3) {
          hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
        }

        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        return `rgba(${r},${g},${b},${70 / 100})`;
      };

      return {
        type: "line",
        data: {
          datasets: [
            {
              data: data,
              borderWidth: 1,
              backgroundColor: opactiyColor,
              pointRadius: 1,
            },
          ],
        },
        options: {
          responsive: true,
          lineTension: 1,
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                type: "time",
                time: {
                  parser: timeFormat,
                },
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                  display: false,
                },
                ticks: {
                  fontSize: 10,
                  maxTicksLimit: 6,
                  min: start,
                  max: end,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                },
                ticks: {
                  max: max,
                  min: min,
                  display: false,
                },
              },
            ],
          },
        },
      };
    },
  },
}

//TODO: showToast Methode

export default {
  name: "homeapp",
  mixins: [myMixin],
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
  unmounted() {
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
          iconClass: "package-icon active"
        },
        {
          id: 2,
          iconSource: "menu_plant",
          title: "Plant Alert",
          contentType: "plant",
          iconClass: "plant-icon active"
        },
        {
          id: 3,
          iconSource: "washing_machine",
          title: "Washing Machine",
          contentType: "device",
          iconClass: ""
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
#header-container {
  max-width: 2200px;
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
  height: 100vh;
}

#main-container {
  max-width: 2200px;
  height: 1080px;
  // background: rgb(172, 27, 27);
  //https://webgradients.com/
  //background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%); //day
  //background-image: linear-gradient(to top, #fddb92 0%, #d1fdff 100%);
  background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
  margin: 0 auto !important;
  #menu {
    border-radius: 0px 40px;
    padding: 4vh;
    float: left;
    width: 10%;
  }

  #infobox-container {
    
    float: left;
    padding: 4vh;
    width: 65%;
    overflow: hidden;
  }

  #newsfeed {
    // border-radius: 40px 0px;
    padding: 4vh;
    // background-color: rgba(247, 246, 249, 1);
    float: right;
    max-width: 450px;
    width: 25%;
  }
}

#svgbackground {
  fill: rgb(252, 252, 252);
  width: 100%;
  height: 100%;
}
</style>
