<template>
  <div class="plant-popup">
    <div class="plant-main-info">
      <div class="plant-header-popup">
        <div></div>

        <PlantTimeChanger
          :borderRange="borderRange"
          @update-range="updateRange"
        />

        <!-- <div class="temperature-info">
        {{ currentPlant.temperature.split(".")[0] }}°C
      </div> -->
        <!-- <div class="hover-button settings-button" @click="showSettingsChange()">
        <svgicon icon="pin" width="2vh" height="2vh"></svgicon>
      </div> -->
        <!-- <div class="hover-button settings-button" @click="showSettingsChange()">
        <svgicon icon="settings" width="2vh" height="2vh"></svgicon>
      </div> -->
      </div>

      <div class="plant-history-container">
        <!-- container 1 -->
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

              <ProgressBarWithTrend
                :barColor="colors.mainBlue"
                :plantValue="currentPlant.soil_moisture"
                :valueMinBorder="currentPlant.soil_moisture_borders.min"
                :valueMaxBorder="currentPlant.soil_moisture_borders.max"
                :barHeight="'0.5vw'"
              />
            </div>
          </div>
          <div class="diagram-container">
            <canvas id="moisture-chart"></canvas>
          </div>
        </div>
        <!-- container 2 -->
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

              <ProgressBarWithTrend
                :barColor="colors.mainGreen"
                :plantValue="currentPlant.soil_fertility"
                :valueMinBorder="currentPlant.soil_fertitlity_borders.min"
                :valueMaxBorder="currentPlant.soil_fertitlity_borders.max"
                :barHeight="'0.5vw'"
              />
            </div>
          </div>
          <div class="diagram-container">
            <canvas id="fertilizer-chart"></canvas>
          </div>
        </div>
        <!-- container 3 -->
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

              <ProgressBarWithTrend
                :barColor="colors.mainYellow"
                :plantValue="currentPlant.sunlight"
                :valueMinBorder="currentPlant.sunlight_intensity_borders.min"
                :valueMaxBorder="currentPlant.sunlight_intensity_borders.max"
                :barHeight="'0.5vw'"
              />
            </div>
          </div>

          <div class="diagram-container">
            <canvas id="sunlight-chart"></canvas>
          </div>
        </div>
      </div>

      <div class="plant-history-container">
        <div class="past-viewer-wrapper">
          <div class="day-week-review-info">7 DAYS REVIEW</div>
          <div class="past-viewer">
            <div
              :key="pastWaterDay.index"
              v-for="pastWaterDay in pastWaterReviewArray"
              class="past-viewer-square"
              :class="{
                waterDayColorActive: pastWaterDay == 1,
                waterDayColorInactive: pastWaterDay == 0,
              }"
            ></div>
          </div>
        </div>
        <div class="past-viewer-wrapper">
          <div class="day-week-review-info">7 WEEKS REVIEWS</div>
          <div class="past-viewer">
            <div
              :key="pastFertilizerWeek.index"
              v-for="pastFertilizerWeek in pastFertilizerReviewArray"
              class="past-viewer-square"
              :class="{
                fertilizerWeekColorActive: pastFertilizerWeek == 1,
                fertilizerWeekColorInactive: pastFertilizerWeek == 0,
              }"
            ></div>
          </div>
        </div>

        <div class="sensor-and-history-data"></div>
      </div>
    </div>

    <PlantSettingsPage
      :currentPlant="currentPlant"
      :showSettings="showSettings"
    />
    <div class="plant-history-footer">
      <div></div>
      <div></div>

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
import "../../compiled-icons/pin";
import ProgressBarWithTrend from "../../components/ProgressBarWithTrend";

export default {
  name: "PlantHistoryPage",
  components: { PlantTimeChanger, PlantSettingsPage, ProgressBarWithTrend },
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
      colors: colors,
      todayDay: this.$root.$children[0].day, //get day from <Homeapp>
    };
  },
  methods: {
    showSettingsChange() {
      this.showSettings == false
        ? (this.showSettings = true)
        : (this.showSettings = false);
    },
    updateRange(borderRange) {
      this.borderRange = borderRange;
    },
    getCurrentPlantData(plant_id) {
      this.$axios
        .get(this.$store.getters.config.homeserver.url + ":8080/planthistory/" + plant_id + "/", {})
        .then((response) => {
          this.prepareHistoryData(response.data);
        })
        .catch((error) => {
          this.showToastError(error.toString());
        });
    },
    createChart(chartId, planDetailArray, plantDetailValueBorder) {
      let data = [];
      let mainColor;
      switch (chartId) {
        case "fertilizer-chart":
          planDetailArray.forEach((element) => {
            let _plantData = {
              x: element.timestamp,
              y: element.soil_fertility,
            };
            data.push(_plantData);
          });
          mainColor = colors.mainGreen;

          break;
        case "moisture-chart":
          planDetailArray.forEach((element) => {
            let _plantData = {
              x: element.timestamp,
              y: element.soil_moisture,
            };
            data.push(_plantData);
          });
          mainColor = colors.mainBlue;
          break;
        case "sunlight-chart":
          planDetailArray.forEach((element) => {
            let _plantData = {
              x: element.timestamp,
              y: element.sunlight,
            };
            data.push(_plantData);
          });
          mainColor = colors.mainYellow;
          break;
      }

      const ctx = document.getElementById(chartId);
      let timeFormat = "hA";
      let start = this.borderRange.start;
      let end = this.borderRange.end;
      let plantChart = this.preparePlantChart(
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
        let plantData = historyData[key];

        let plantDataTimestamp = new Date(plantData.timestamp);
        plantDataTimestamp.setHours(plantDataTimestamp.getHours() - 1); //TODO: more general for time changes
        // if (plantDataTimestamp <  this.borderRange.start){
        //   return
        // }
        // --- SOIL FERTILITY
        let _plantSoilfertility = {
          timestamp: plantDataTimestamp,
          soil_fertility: plantData.soil_fertility,
        };
        this.soilfertitlityArray.push(_plantSoilfertility);

        // --- SOIL MOISTURE
        let _plantSoilMoisture = {
          timestamp: plantDataTimestamp,
          soil_moisture: plantData.soil_moisture,
        };
        this.soilmoistureArray.push(_plantSoilMoisture);
        // --- SUNLIGHT
        let _plantsunlight = {
          timestamp: plantDataTimestamp,
          sunlight: plantData.sunlight,
        };
        this.sunlightIntensityArray.push(_plantsunlight);
      });
      this.pastWaterReviewArray = historyData.pastWaterReviewArray.reverse();
      this.pastFertilizerReviewArray = historyData.pastFertilizerReviewArray.reverse();
      this.soilfertitlityBorders = historyData[0].soil_fertitlity_borders;
      this.soilmoistureBorders = historyData[0].soil_moisture_borders;
      this.sunlightIntensityBorders = historyData[0].sunlight_intensity_borders;

      this.createCharts();
    },
  },
};
</script>

<style lang="scss">


.plant-main-info {
  margin: $standard-space;
  padding: $standard-space;

  background: white;
  border-radius: $standard-border-radius;
}

.plant-header-popup {
  height: 13%;
  display: grid;
  grid-template-columns: auto 40vh;
  column-gap: 5px;
  //padding: 0.7rem 0;
  // padding: 0.6%;

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
    border-radius: $standard-border-radius;
    // background: white;
    text-align: center;
    color: $main-black;
    line-height: 2.5vh;
    display: grid;
    place-items: center;
    font-size: $standard-text-small;
    //margin-left: 0.5%;
    height: 1.7rem;
  }
  .settings-button {
    justify-self: center;
    height: 3vh;
    width: 3vh;
  }
}

.plant-history-container {
  margin: $standard-space 0;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: $standard-space * 2;
}

.plant-history-footer {
  margin: $standard-space $standard-space * 2;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: $standard-space * 2;
}

// .border-info-wrapper {
//   margin: 1vh;
// }

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
    width: 100%;
    height: 4%;
    float: left;
  }

  .info-bar-big {
    height: 1.2vh;

    border-radius: $standard-border-radius;
  }
}

.plant-detail-container {
  display: grid;
  row-gap: $standard-space;
  // min-height: 65%;
  

  .plant-detail-header {
    // margin: -1.5% 1.5% 1.5% 1.5%;
    height: 3vh;
  }

  .diagram-container {
    background-color: white;
    border-radius: $standard-border-radius;
    border-color: rgb(243, 244, 254);
    border-width: 2px;
    border-style: solid;
    // margin: 1.6% 1.6%;
    height: auto;
    // overflow: hidden;
    padding: $standard-space;
    // width: 96.8%;
  }
}

.past-viewer {
  margin: $standard-space 0;
  border-radius: $standard-border-radius;
  height: 2rem;
  display: grid;
  column-gap: 0.1rem;
  grid-template-columns: repeat(7, 1fr);
  overflow: hidden;

  .past-viewer-square {
    width: 100%;
    height: 2rem;
    //border: 1px solid;
    justify-self: center;
    align-self: center;
    display: flex;
    place-content: center;
  }
  .waterDayColorActive {
    background-color: $main-blue;
  }
  .fertilizerWeekColorActive {
    background-color: $main-green;
  }

  .waterDayColorInactive,
  .fertilizerWeekColorInactive {
    background-color: $main-light-gray;
    backdrop-filter: blur(10px);
  }

  .day-week-review-info {
    margin: 1rem;
    //font-size: $standard-text-small;
  }
  //double values auslagern und nur die Farben trennen
  //Farbe wie Diagram nur blasser
}

.sensor-and-history-data {
  margin-top: $standard-space;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 0.5vh;
  justify-content: right;
  align-content: center;

  .update-text {
    font-size: $standard-text-small;
  }

  .batterry-bar-container {
    width: 3vh;
    display: grid;
    grid-template-columns: 3vh 0.5vh;
    column-gap: 0vh;
    height: 1rem;
    align-self: center;

    .baterry-info-bar {
      //height: 1.1vh;
      height: 1rem;
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
