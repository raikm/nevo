<template>
  <div v-show="showSettings">
    <div id="plant-settings-container">
      <div class="meta-data-container">
        <div class="border-info-wrapper">
          <div class="border-details">
            <div class="input-wrapper">
              <input
                class="input-border"
                type="number"
                :value="currentPlant.soil_moisture_borders.min"
              />
            </div>
            <div class="border-minus">-</div>
            <div class="input-wrapper">
              <input
                class="input-border"
                type="number"
                :value="currentPlant.soil_moisture_borders.max"
              />
            </div>
            <div class="border-input-info">
              {{ currentPlant.soil_moisture_borders.currency }}
            </div>
            <div class="normal-button save-border-settings-button click-element">Save</div>
          </div>
        </div>
        <div class="border-info-wrapper">
          <div class="border-details">
            <div class="input-wrapper">
              <input
                class="input-border"
                type="number"
                :value="currentPlant.soil_fertitlity_borders.min"
              />
            </div>
            <div class="border-minus">-</div>
            <div class="input-wrapper">
              <input
                class="input-border"
                type="number"
                :value="currentPlant.soil_fertitlity_borders.max"
              />
            </div>
            <div class="border-input-info">
              {{ currentPlant.soil_fertitlity_borders.currency }}
            </div>
             <div class="normal-button save-border-settings-button click-element">Save</div>
          </div>
         
        </div>
        <div class="border-info-wrapper">
          <div class="border-details">
            <div class="input-wrapper">
              <input
                class="input-border"
                type="number"
                :value="currentPlant.sunlight_intensity_borders.min"
              />
            </div>
            <div class="border-minus">-</div>
            <div class="input-wrapper">
              <input
                class="input-border"
                type="number"
                :value="currentPlant.sunlight_intensity_borders.max"
              />
            </div>
            <div class="border-input-info">
              {{ currentPlant.sunlight_intensity_borders.currency }}
            </div>
             <div class="normal-button save-border-settings-button click-element">Save</div>
          </div>
         
        </div>
      </div>
    </div>
    <!-- <div id="plant-settings-container-footer">
      <div class="hover-button location-button" @click="locateSensor()">
        Locate Sensor<svgicon icon="pin" width="1.3vh" height="1.3vh"></svgicon>
      </div>
      <div class="hover-button save-border-settings-button">
        Save
      </div>
    </div> -->
  </div>
</template>

<script>

export default {
  name: "PlantSetingsPage",
  props: ["currentPlant", "showSettings"],
  methods: {
    locateSensor() {},
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">

#plant-settings-container {
  // height: 29vh;
  // background: white;
  font-size: 1.5vh;
  // border-radius: 10px;
  //   padding: 1.6%;
    margin: $standard-space 0;
  .meta-data-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: $standard-space;
    // padding: 1%;
  }

  .input-wrapper {
    width: 100%;
    position: relative;
  }
  .input,
  .input-border {
    height: 3vh;
    padding: 11px 15px;
    border-radius: 10px;
    border: 1px solid #cbd8e3;
    width: 100%;
    outline: none;
    box-sizing: border-box;
    text-align: center;
    font-size: 1.6vh;

}
  .input:disabled {
    background: white;
  }
  .placeholder {
    pointer-events: none;
    position: absolute;
    font-weight: 500;
    top: 1vh;
    left: 1vh;
    padding: 0 1vh;
    background-color: white;
    color: grey;
    transform: scale(0.75) translateY(-36px) translateX(-15%);
  }

  .input:focus {
    border-color: $main-blue;
  }

  .input:focus + .placeholder {
    transform: scale(0.75) translateY(-36px) translateX(-15%);
    color: $main-blue;
    transition: 0.2s ease;
  }

  // .input:invalid:not(:placeholder-shown) {
  //   transition: 0.2s ease;
  //   border-color: #f52c5c;
  // }

  // .input:invalid:not(:placeholder-shown) + .placeholder {
  //   transition: 0.2s ease;
  //   color: #f52c5c;
  // }
  // .input:invalid:not(:placeholder-shown).input:not(:focus) + .placeholder {
  //   transform: scale(0.75) translateY(-36px) translateX(-15%);
  //   color: #f52c5c;
  //   transition: 0.2s ease;
  // }
}

#plant-settings-container-footer {
  //   margin: 1vh;

  height: 3.5vh;
  display: grid;
  grid-template-columns: 1fr 1fr;

  justify-items: right;
  float: right;
  font-size: 1.3vh;
  .location-button {
    text-align: center;
    height: 3vh;
    width: 12vh;
    display: inline;
  }
}

.save-border-settings-button {
  text-align: center;
  height: 100%;
  width: 100%;
   align-self: center;
}

.border-details {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 0.2fr 1fr 0.8fr 1fr;
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
</style>
