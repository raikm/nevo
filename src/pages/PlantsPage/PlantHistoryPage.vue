<template>
  <div>
    <div class="plant-header">
      <h1 class="plant-title">
        {{ currentPlant.name.replace(/[_-]/g, " ") }}
      </h1>

      <PlantTimeChanger
        :borderRange="borderRange"
        @update-range="updateRange"
      />

      <div class="temperature-info">
        {{ currentPlant.temperature.split(".")[0] }}°C
      </div>
    </div>

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
                class="info-bar-big"
                v-if="
                  currentPlant.soil_moisture /
                    currentPlant.soil_moisture_borders.max >
                    0.1
                "
                :style="{
                  width:
                    (currentPlant.soil_moisture /
                      currentPlant.soil_moisture_borders.max) *
                      100 +
                    '%',
                }"
              ></div>
              <div
                class="info-bar-big"
                v-if="
                  currentPlant.soil_moisture /
                    currentPlant.soil_moisture_borders.max <
                    0.1
                "
                :style="{
                  width: 0 + '%',
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="diagram-container">
        <canvas id="moisture-chart"></canvas>
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
                class="info-bar-big"
                v-if="
                  currentPlant.soil_fertility /
                    currentPlant.soil_fertitlity_borders.max >
                    0.1
                "
                :style="{
                  width:
                    (currentPlant.soil_fertility /
                      currentPlant.soil_fertitlity_borders.max) *
                      100 +
                    '%',
                }"
              ></div>
              <div
                class="info-bar-big"
                v-if="
                  currentPlant.soil_fertility /
                    currentPlant.soil_fertitlity_borders.max <
                    0.1
                "
                :style="{
                  width: 0 + '%',
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="diagram-container">
        <canvas id="fertilizer-chart"></canvas>
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
                class="info-bar-big"
                v-if="
                  currentPlant.sunlight /
                    currentPlant.sunlight_intensity_borders.max >
                    0.1
                "
                :style="{
                  width:
                    (currentPlant.sunlight /
                      currentPlant.sunlight_intensity_borders.max) *
                      100 +
                    '%',
                }"
              ></div>
              <div
                class="info-bar-big"
                v-if="
                  currentPlant.sunlight /
                    currentPlant.sunlight_intensity_borders.max <
                    0.1
                "
                :style="{
                  width: 0 + '%',
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="diagram-container">
        <canvas id="sunlight-chart"></canvas>
      </div>
    </div>
    <div class="plant-history-footer">
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
      </div>
      <p class="update-text">
        last updated:
        {{ new Date(currentPlant.timestamp).toLocaleDateString("de-DE") }}
      </p>
    </div>
  </div>
</template>

<script>
import PlantTimeChanger from "./PlantTimeChanger";
import Chart from "chart.js";
import "../../compiled-icons/soil_moist";
import "../../compiled-icons/fertilizer";
import "../../compiled-icons/sun";

export default {
  name: "PlantHistoryPage",
  components: { PlantTimeChanger },
  props: ["currentPlant"],
  created: function() {
    this.getCurrentPlantData(this.currentPlant.plant_id);
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
      soilferilityDisplayArray: [],
      soilmoisutreDisplayArray: [],
      sunlightDisplayArray: [],

      borderRange: {
        start: new Date(new Date().setHours(new Date().getHours() - 12)),
        end: new Date(),
      },
    };
  },
  methods: {
    updateRange(borderRange) {
      this.borderRange = borderRange;
    },
    getCurrentPlantData(plant_id) {
      this.$axios
        .get("http://192.168.1.80:8000/planthistory/" + plant_id + "/", {})
        .then((response) => {
          this.prepareHistoryData(response.data);
        })
        .catch((error) => {
          this.showToastError(error.toString());
        });
    },
    createChart(chartId, planDetailArray, plantDetailValueBorder) {
      var data = [];
      switch (chartId) {
        case "fertilizer-chart":
          planDetailArray.forEach((element) => {
            var _plantData = {
              x: element.timestamp.toLocaleTimeString(),
              y: element.soil_fertility,
            };
            data.push(_plantData);
          });
          break;
        case "moisture-chart":
          planDetailArray.forEach((element) => {
            var _plantData = {
              x: element.timestamp.toLocaleTimeString(),
              y: element.soil_moisture,
            };
            data.push(_plantData);
          });
          break;
        case "sunlight-chart":
          planDetailArray.forEach((element) => {
            var _plantData = {
              x: element.timestamp.toLocaleTimeString(),
              y: element.sunlight,
            };
            data.push(_plantData);
          });
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
        plantDataTimestamp.setHours(plantDataTimestamp.getHours() - 2);

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

.plant-header {
  height: 13%;
  width: 100%;
  padding: 0.6%;
  .plant-title {
    font-weight: bold;
    float: left;
    width: 75.5%; //<--------------
    font-size: 2.8vh;
    height: 3vh;
    line-height: 3vh;
  }
  .time-button-container {
    float: left;
    height: 4vh;
    width: 20%; //<--------------
    .time-button {
      margin: 0 1.6%;
      width: 30%;
      height: 80%;
    }
  }
  .temperature-info {
    border: rgba(0, 0, 0, 0.8);
    border-style: solid;
    border-width: 2px;
    border-radius: 10px;
    width: 4%; //<--------------
    float: left;
    text-align: center;
    line-height: 2.5vh;
    font-size: 1.5vh;
    margin-left: 0.5%;
    height: 3vh;
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
    background-color: $main-green;
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
    max-height: 38vh;
    overflow: hidden;
    width: 96.8%;
  }
}

.plant-history-footer {
  .update-text {
    float: right;
    text-align: center;
    line-height: 1.4vh;
    font-size: 1vh;
    top: 50%;
    margin-right: 0.4vh;
  }

  .batterry-bar-container {
    width: 3vh; //<--------------
    margin: 0 1%;
    float: right;
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
  }
}
</style>
