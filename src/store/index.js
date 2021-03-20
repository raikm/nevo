import Vue from "vue";
import Vuex from "vuex";

try {
  var config = require("../../config.json");
} catch (err) {
  console.log("CONFIG FILE NOT FOUND");
}

Vue.use(Vuex);

function getDayOfTheWeek() {
  let date = new Date();
  const weekday = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  );

  return weekday[date.getDay()];
}

export default new Vuex.Store({
  state: {
    currentEntities: [],
    config: config,
    showNotification: true,
    weather: {},
    dayOfTheWeek: getDayOfTheWeek(),
    gCalendars: [],
    speaker: [],
    activeSpeaker: [],
  },
  mutations: {
    //sync
    setCurrentEntities(state, updatedEntities) {
      state.currentEntities = updatedEntities;
    },
    setWeather(state, updatedWeather) {
      state.weather = updatedWeather;
    },
    setShowNotification(state, notificationStatus) {
      state.showNotification = notificationStatus;
    },
    setGCalendars(state, updatedCalendars) {
      state.gCalendars = updatedCalendars;
    },
    setZones(state, updatedZones) {
      state.speaker = updatedZones;
    },
    setactiveSpeaker(state, updatedMainZone) {
      state.activeSpeaker = updatedMainZone;
    },
  },
  modules: {},
  getters: {
    currentEntities: (state) => state.currentEntities,
    config: (state) => state.config,
    showNotification: (state) => state.showNotification,
    currentWeather: (state) => state.weather,
    currentDayOfTheWeek: (state) => state.dayOfTheWeek,
    googleCalendars: (state) => state.gCalendars,
    speaker: (state) => state.speaker,
    activeSpeaker: (state) => state.activeSpeaker,
    activeSpeakerState: (state) => state.activeSpeaker.coordinator.state,
  }
});
