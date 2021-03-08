import Vue from "vue";
import Vuex from "vuex";



try {
  var config = require("../../config.json");
} catch (err) {
  console.log("CONFIG FILE NOT FOUND");
}

Vue.use(Vuex);

function getDayOfTheWeek() {
  var date = new Date();
  const weekday = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");

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
    }
  },
  modules: {},
  getters: {
    getCurrentEntities: (state) => state.currentEntities,
    getConfig: (state) => state.config,
    getShowNotification: (state) => state.showNotification,
    getWeather: (state) => state.weather,
    getCurrentDayOfTheWeek: (state) => state.dayOfTheWeek,
    getCalendars: (state) => state.gCalendars,
  },
 
});
