import Vue from "vue";
import Vuex from "vuex";

try {
  var config = require("../../config.json");
} catch (error) {
  if (error.code === "MODULE_NOT_FOUND") {
    config = require("../../config_example.json");
    console.error("CONFIG FILE NOT FOUND - EXAMPLE CONFIG IS BEEING USED");
  } else {
    console.error("CONFIG FILE NOT FOUND");
  }
}
Object.freeze(config);

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
console.log(config)

export default new Vuex.Store({
  state: {
    currentEntities: [],
    config: config,
    showNotification: true,
    weather: {},
    dayOfTheWeek: getDayOfTheWeek(),
    gCalendars: [],
    speakers: [],
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
    setSpeakers(state, newSpeakers) {      
      state.activeSpeaker =
        newSpeakers.find((speaker) =>
          speaker.state !== undefined
            ? speaker.state.playbackState === "PLAYING"
            : []
        ) || [];
        //TODO necessary ?
      state.speakers = newSpeakers;
    },
    setNewSpeakerVolume(state, newVolumeObject) {
      let result = state.speakers.find(
        (speaker) => speaker.roomName === newVolumeObject.roomName
      );
      //BUGFIX: handle multiroom
      if (result !== "undefined") {
        let index = state.speakers.indexOf(result);
        state.speakers[index].state.volume = newVolumeObject.newVolume;
      }
    },
    updateSpeakers(state, updatedSpeakers) {
      let result = state.speakers.find(
        (speaker) => speaker.roomName === updatedSpeakers.roomName
      );
      if (result !== "undefined") {
        let index = state.speakers.indexOf(result);
        state.speakers[index] = updatedSpeakers;
        if (updatedSpeakers.roomName === state.activeSpeaker.roomName) {
          // console.log(updatedSpeakers)
          state.activeSpeaker = updatedSpeakers;
        }
      }
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
    speakers: (state) => state.speakers,
    activeSpeaker: (state) => state.activeSpeaker,
    activeSpeakerState: (state) => state.activeSpeaker.state,
  },
});
