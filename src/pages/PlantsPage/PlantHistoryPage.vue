<template>
  <div>
    <div class="plant-header">
      <h1 class="title-1">
        {{ currentPlant.name.replace(/[_-]/g, " ") }}
      </h1>

      <PlantTimeChanger
        :borderRange="borderRange"
        @update-range="updateRange"
      />

      <div class="temperature-info">
        {{ currentPlant.temperature.split(".")[0] }}°C
      </div>
      <div
        class="hover-button settings-button"
        @click="showSettingsChange()"
      >
        <svgicon icon="settings" width="2vh" height="2vh"></svgicon>
      </div>
    </div>
    <div v-show="showHistory" class="plant-history-container">
      <div class="plant-detail-container">
        <div class="current-data-container">
          <div class="plant-detail-header">
            <div class="plant-attribute-header-info">
              <svgicon
                class="plant-detail-icon"
                icon="soil_moist"
                width="1.5vh"
                height="1.5vh"
              ></svgicon>
              <div class="plant-detail-title">Soil Moisture</div>
            </div>

            <div class="bar-container">
              <div class="info-bar-background">
                <div
                  class="info-bar-big info-bar-moisture"
                  :style="{
                    width:
                      (currentPlant.soil_moisture -
                        currentPlant.soil_moisture_borders.min >
                      0
                        ? (currentPlant.soil_moisture /
                            currentPlant.soil_moisture_borders.max) *
                          100
                        : 0) + '%',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div class="diagram-container">
          <canvas id="moisture-chart"></canvas>
        </div>

        <div class="past-viewer">
          <div
            :key="pastWaterDay.index"
            v-for="pastWaterDay in pastWaterReviewArray"
            class="past-viewer-circle"
            :class="{
              waterDayColorActive: pastWaterDay == 1,
              waterDayColorInactive: pastWaterDay == 0,
            }"
          ></div>
          <span id="day-week-review-info">7 Day's Review</span>
        </div>
      </div>

      <div id="fertilizer-container" class="plant-detail-container">
        <div class="current-data-container">
          <div class="plant-detail-header">
            <div class="plant-attribute-header-info">
              <svgicon
                class="plant-detail-icon"
                icon="fertilizer"
                width="1.5vh"
                height="1.5vh"
              ></svgicon>
              <div class="plant-detail-title">Fertilizer</div>
            </div>
            <div class="bar-container">
              <div class="info-bar-background">
                <div
                  class="info-bar-big info-bar-fertilizer"
                  :style="{
                    width:
                      (currentPlant.soil_fertility -
                        currentPlant.soil_fertitlity_borders.min >
                      0
                        ? (currentPlant.soil_fertility /
                            currentPlant.soil_fertitlity_borders.max) *
                          100
                        : 0) + '%',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div class="diagram-container">
          <canvas id="fertilizer-chart"></canvas>
        </div>

        <div class="past-viewer">
          <div
            :key="pastFertilizerWeek.index"
            v-for="pastFertilizerWeek in pastFertilizerReviewArray"
            class="past-viewer-circle"
            :class="{
              fertilizerWeekColorActive: pastFertilizerWeek == 1,
              fertilizerWeekColorInactive: pastFertilizerWeek == 0,
            }"
          ></div>
          <span id="day-week-review-info">7 Week's Review</span>
        </div>
      </div>

      <div class="plant-detail-container">
        <div class="current-data-container">
          <div class="plant-detail-header">
            <div class="plant-attribute-header-info">
              <svgicon
                class="plant-detail-icon"
                icon="sun"
                width="1.5vh"
                height="1.5vh"
              ></svgicon>
              <div class="plant-detail-title">Sun Intensity</div>
            </div>
            <div class="bar-container">
              <div class="info-bar-background">
                <div
                  class="info-bar-big info-bar-sun"
                  :style="{
                    width:
                      (currentPlant.sunlight -
                        currentPlant.sunlight_intensity_borders.min >
                      0
                        ? (currentPlant.sunlight /
                            currentPlant.sunlight_intensity_borders.max) *
                          100
                        : 0) + '%',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div class="diagram-container">
          <canvas id="sunlight-chart"></canvas>
        </div>
        <div class="sensor-and-history-data">
          <div class="update-text">
            last updated:
            {{ new Date(currentPlant.timestamp).toLocaleDateString("de-DE") }}
          </div>
          <div class="batterry-bar-container">
            <div class="battery-bar-background">
              <div
                class="baterry-info-bar"
                :style="[
                  currentPlant.battery < 15
                    ? {
                        backgroundColor: '#ff0000',
                        width: currentPlant.battery + '%',
                      }
                    : {
                        backgroundColor: 'rgb(25, 197, 68)',
                        width: currentPlant.battery + '%',
                      },
                ]"
              ></div>
            </div>
            <div class="battery-nipple"></div>
          </div>
        </div>
      </div>
    </div>
    <PlantSettingsPage
      :currentPlant="currentPlant"
      :showSettings="showSettings"
    />
  </div>
</template>

<script>
import PlantTimeChanger from "./PlantTimeChanger";
import PlantSettingsPage from "./PlantSettingsPage";
import Chart from "chart.js";
import "../../compiled-icons/soil_moist";
import "../../compiled-icons/settings";
import "../../compiled-icons/fertilizer";
import "../../compiled-icons/sun";
import colors from "../../style/main-colors.scss";

export default {
  name: "PlantHistoryPage",
  components: { PlantTimeChanger, PlantSettingsPage },
  props: ["currentPlant"],
  created: function() {
    this.getCurrentPlantData(this.currentPlant.id);
  },
  watch: {
    borderRange: function() {
      this.createCharts();
    },
  },
  data() {
    return {
      soilfertitlityArray: [],
      soilmoistureArray: [],
      sunlightIntensityArray: [],
      soilfertitlityBorders: [],
      soilmoistureBorders: [],
      sunlightIntensityBorders: [],
      // soilferilityDisplayArray: [],
      // soilmoisutreDisplayArray: [],
      // sunlightDisplayArray: [],

      borderRange: {
        start: new Date(new Date().setHours(new Date().getHours() - 12)),
        end: new Date(),
      },

      pastWaterReviewArray: [0, 0, 0, 0, 0, 0, 0],
      pastFertilizerReviewArray: [0, 0, 0, 0, 0, 0, 0],
      showHistory: true,
      showSettings: false,
    };
  },
  methods: {
    showSettingsChange() {
      this.showHistory == false
        ? (this.showHistory = true)
        : (this.showHistory = false);
      this.showSettings == false
        ? (this.showSettings = true)
        : (this.showSettings = false);
    },
    updateRange(borderRange) {
      this.borderRange = borderRange;
    },
    getCurrentPlantData(plant_id) {
      this.$axios
        .get("http://192.168.1.80:8080/planthistory/" + plant_id + "/", {})
        .then((response) => {
          this.prepareHistoryData(response.data);
        })
        .catch((error) => {
          this.showToastError(error.toString());
        });
    },
    createChart(chartId, planDetailArray, plantDetailValueBorder) {
      var data = [];
      var mainColor;
      switch (chartId) {
        case "fertilizer-chart":
          planDetailArray.forEach((element) => {
            var _plantData = {
              x: element.timestamp,
              y: element.soil_fertility,
            };
            data.push(_plantData);
          });
          mainColor = colors.mainGreen;

          break;
        case "moisture-chart":
          planDetailArray.forEach((element) => {
            var _plantData = {
              x: element.timestamp,
              y: element.soil_moisture,
            };
            data.push(_plantData);
          });
          mainColor = colors.mainBlue;
          break;
        case "sunlight-chart":
          planDetailArray.forEach((element) => {
            var _plantData = {
              x: element.timestamp,
              y: element.sunlight,
            };
            data.push(_plantData);
          });
          mainColor = colors.mainYellow;
          break;
      }

      const ctx = document.getElementById(chartId);
      var timeFormat = "hA";
      var start = this.borderRange.start;
      var end = this.borderRange.end;
      var plantChart = this.preparePlantChart(
        data,
        plantDetailValueBorder.min,
        plantDetailValueBorder.max,
        mainColor,
        timeFormat,
        start,
        end
      );

      /* eslint-disable no-unused-vars */
      const myChart = new Chart(ctx, {
        type: plantChart.type,
        data: plantChart.data,
        options: plantChart.options,
      }); /* eslint-disable no-unused-vars */
      // console.log(myChart);
    },
    createCharts() {
      this.createChart(
        "fertilizer-chart",
        this.soilfertitlityArray,
        this.soilfertitlityBorders
      );
      this.createChart(
        "moisture-chart",
        this.soilmoistureArray,
        this.soilmoistureBorders
      );
      this.createChart(
        "sunlight-chart",
        this.sunlightIntensityArray,
        this.sunlightIntensityBorders
      );
    },
    prepareHistoryData(historyData) {
      Object.keys(historyData).forEach((key) => {
        var plantData = historyData[key];

        var plantDataTimestamp = new Date(plantData.timestamp);
        plantDataTimestamp.setHours(plantDataTimestamp.getHours() - 1); //TODO: more general for time changes
        // if (plantDataTimestamp <  this.borderRange.start){
        //   return
        // }
        // --- SOIL FERTILITY
        var _plantSoilfertility = {
          timestamp: plantDataTimestamp,
          soil_fertility: plantData.soil_fertility,
        };
        this.soilfertitlityArray.push(_plantSoilfertility);

        // --- SOIL MOISTURE
        var _plantSoilMoisture = {
          timestamp: plantDataTimestamp,
          soil_moisture: plantData.soil_moisture,
        };
        this.soilmoistureArray.push(_plantSoilMoisture);
        // --- SUNLIGHT
        var _plantsunlight = {
          timestamp: plantDataTimestamp,
          sunlight: plantData.sunlight,
        };
        this.sunlightIntensityArray.push(_plantsunlight);
      });
      this.pastWaterReviewArray = historyData.pastWaterReviewArray;
      this.pastFertilizerReviewArray = historyData.pastFertilizerReviewArray;
      this.soilfertitlityBorders = historyData[0].soil_fertitlity_borders;
      this.soilmoistureBorders = historyData[0].soil_moisture_borders;
      this.sunlightIntensityBorders = historyData[0].sunlight_intensity_borders;

      this.createCharts();
    },
  },
};
</script>

<style lang="scss">
@import "../../style/main-colors";
@import "../../style/main-style";

.plant-header {
  height: 13%;
  display: grid;
  grid-template-columns: 75% auto 5vh 4vh;
  column-gap: 5px;
  padding: 0.6%;

  .time-button-container {
    height: 4vh;

    .time-button {
      margin: 0 1.6%;
      width: 30%;
      height: 80%;
    }
  }
  .temperature-info {
    //border: rgba(6, 6, 6, 0.6);
    border-style: solid;
    border-width: 0px;
    border-radius: 10px;
    background: white;
    text-align: center;
    line-height: 2.5vh;
    display: grid;
    place-items: center;
    font-size: 1.5vh;
    //margin-left: 0.5%;
    height: 3vh;
  }
  .settings-button {
    justify-self: center;
    height: 3vh;
    width: 3vh;
  }
}

.plant-history-container {
  height: 100%;
  //display: none;
}

.subtitle-plant-borders {
}

.border-info-wrapper {
  margin: 1vh;
}

.border-details {
  width: 60%;
  display: grid;
  grid-template-columns: 1fr 0.2fr 1fr 0.8fr;
  justify-items: center;
  align-items: center;
  column-gap: 5%;

  .border-input-info {
    border-radius: 10px;
    border: 1px solid #cbd8e3;
    width: 100%;
    height: 100%;
    align-self: center;
    background-color: #e0e0e050;
    text-align: center;
    display: grid;
    align-items: center;
  }
}

.current-data-container {
  .icon-detail-svg {
    display: flex;
    border: rgba(0, 0, 0, 0.8);
    border-style: solid;
    border-width: 0.4px;
    border-radius: 4px;
    height: 8%;
    width: 8%;
    padding: 1%;
    margin: 1.6%;
    fill: rgb(0, 0, 0);
    float: left;
  }

  .bar-container {
    width: 97%;
    height: 4%;
    float: left;
  }

  .info-bar-big {
    height: 1.2vh;

    border-radius: 5px;
  }
}

.plant-detail-container {
  float: left;
  min-height: 65%;
  width: 33.3%;

  .plant-detail-header {
    margin: -1.5% 1.5% 1.5% 1.5%;
    height: 3vh;
  }

  .diagram-container {
    background-color: white;
    border-radius: 10px;
    border-color: rgb(243, 244, 254);
    border-width: 1px;
    border-style: solid;
    margin: 1.6% 1.6%;
    height: 26vh;
    overflow: hidden;
    width: 96.8%;
  }

  .past-viewer {
    margin: 3% 1.6%;
    $circle-size: 1.8vh;
    display: grid;
    grid-template-columns: 2vh 2vh 2vh 2vh 2vh 2vh 2vh auto;
    justify-content: right;
    .past-viewer-circle {
      width: $circle-size;
      height: $circle-size;
      -moz-border-radius: $circle-size;
      -webkit-border-radius: $circle-size;
      border-radius: $circle-size;
      justify-self: center;
      align-self: center;
    }
    .waterDayColorActive {
      background-color: $main-blue;
    }
    .fertilizerWeekColorActive {
      background-color: $main-green;
    }

    .waterDayColorInactive,
    .fertilizerWeekColorInactive {
      background-color: rgba(181, 180, 180, 0.431);
    }

    #day-week-review-info {
      justify-self: right;
      align-self: center;
      margin-left: 0.5vh;
    }
    //double values auslagern und nur die Farben trennen
    //Farbe wie Diagram nur blasser
  }
}

.sensor-and-history-data {
  margin: 3% 1.6%;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 0.5vh;
  justify-content: right;
  .update-text {
    font-size: 1vh;
  }

  .batterry-bar-container {
    width: 3vh;
    display: grid;
    grid-template-columns: 3vh 0.5vh;
    column-gap: 0vh;

    .baterry-info-bar {
      height: 1.1vh;
      background-color: rgb(25, 197, 68);
      border-radius: 0.3vh;
    }
    .battery-bar-background {
      background-color: rgba(245, 245, 245, 0.639);
      padding: 1px;
      border-radius: 0.4vh;
      border-style: solid;
      border-width: 1px;
    }
    .battery-nipple {
      width: 0.2vh;
      height: 0.4vh; /* as the half of the width */
      border-radius: 0 0.5vh 0.5vh 0;
      border-width: 1px 1px 1px 0px;
      border-style: solid;
      // border-color: gray;
      // -webkit-box-sizing: border-box;
      // -moz-box-sizing: border-box;
      // box-sizing: border-box;
      //justify-self: center;
      align-self: center;

      // transform: rotate(90deg);
    }
  }
}
</style>
