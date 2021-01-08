<template>
  <div class="time-button-container">
    <!-- <button class="time-button" @click="changeRange(borderHalfDayRange)">12h</button>
    <button class="time-button" @click="changeRange(borderDayRange)">24h</button>
    <button class="time-button" @click="changeRange(borderWeekRange)">7d</button> -->
    <!-- <button class="time-button" @click="changeRange(borderMonthRange)">14d</button> -->
    <div class="toggle_radio">
      <input
        checked
        type="radio"
        class="toggle_option"
        id="first_toggle"
        name="toggle_option"
      />
      <input
        type="radio"
        
        class="toggle_option"
        id="second_toggle"
        name="toggle_option"
      />
      <input
        type="radio"
        class="toggle_option"
        id="third_toggle"
        name="toggle_option"
      />
      <label @click="changeRange(borderHalfDayRange)" for="first_toggle"><div class="time-text">12h</div></label>
      <label @click="changeRange(borderDayRange)" for="second_toggle"><div class="time-text">24h</div></label>
      <label @click="changeRange(borderTwoWeekRange)" for="third_toggle"><div class="time-text">14d</div></label>
      <div class="toggle_option_slider"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlantTimeChanger",
  props: ["borderRange"],
  mounted: function() {},
  data() {
    return {
      borderHalfDayRange: {
        start: new Date(new Date().setHours(new Date().getHours() - 12)),
        end: Date.now(),
      },
      borderDayRange: {
        start: new Date(new Date().setHours(new Date().getHours() - 24)),
        end: Date.now(),
      },
      borderTwoWeekRange: {
        start: new Date(new Date().setDate(new Date().getDate() - 14)),
        end: Date.now(),
      },
      borderMonthRange: {
        start: new Date(new Date().setDate(new Date().getDate() - 14)),
        end: Date.now(),
      },
    };
  },
  methods: {
    changeRange(newRange) {
      var _borderRange = this.borderRange;
      _borderRange = newRange;
      this.$emit("update-range", _borderRange);
    },
  },
};
</script>

<style lang="scss">
@import "../../style/main-colors";
@import "../../style/main-style";

.toggle_radio {
  position: relative;
  background: rgba(255, 255, 255, 0.639);
  overflow: hidden;
  padding: 0 !important;
  -webkit-border-radius: $standard-border-radius;
  -moz-border-radius: $standard-border-radius;
  border-radius: $standard-border-radius;
  position: relative;
  height: 3vh;
  width: 100%;
}
.toggle_radio > * {
  float: left;
}
.toggle_radio input[type="radio"] {
  display: none;
}
.toggle_radio label {
  color: $main-black;
  z-index: 0;
  display: block;
  width: 33.3%;
  height: 100%;
  //margin: 3px 3px;
  -webkit-border-radius: $standard-border-radius;
  -moz-border-radius: $standard-border-radius;
  border-radius: $standard-border-radius;
  cursor: pointer;
  z-index: 1;
}
.time-text {
  // line-height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.4vh;
  
}

.toggle_option_slider {
  width: 33.3%;
  height: 90%;
  position: absolute;
  top: 5%;
  -webkit-border-radius: $standard-border-radius;
  -moz-border-radius: $standard-border-radius;
  border-radius: $standard-border-radius;
  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  -o-transition: all 0.4s ease;
  -ms-transition: all 0.4s ease;
  transition: all 0.4s ease;
}

#first_toggle:checked ~ .toggle_option_slider {
  background: rgba($main-black, 0.25);
  left: 0%; 
}
#second_toggle:checked ~ .toggle_option_slider {
  background: rgba($main-black, 0.2);
  left: 33.3%;
}
#third_toggle:checked ~ .toggle_option_slider {
  background: rgba($main-black, 0.25);
  left: 66.6%;
}
</style>
