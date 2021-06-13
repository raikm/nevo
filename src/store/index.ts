import { createStore } from "vuex";

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

const store = createStore({
  state() {
    return {
      currentEntities: [],
      hAConnection: null,
      config: config,
      showNotification: true,
      dayOfTheWeek: getDayOfTheWeek(),
      gCalendars: [],
      speakers: [],
      activeGroup: null,
      spotifyAccessToken: "",
    };
  },
  mutations: {
    // sync
    setCurrentEntities(state, updatedEntities) {
      state.currentEntities = updatedEntities;
    },
    setHaConnection(state, newHaConnection) {
      state.hAConnection = newHaConnection;
    },
    // setWeather(state:any, updatedWeather) {
    //   state.weather = updatedWeather;
    // },
    setShowNotification(state, notificationStatus) {
      state.showNotification = notificationStatus;
    },
    setGCalendars(state, updatedCalendars) {
      state.gCalendars = updatedCalendars;
    },
    setSpeakers(state, newSpeakerGroups) {
      let newSpeakers: any = [];
      newSpeakerGroups.forEach((speakergroup: any) => {
        speakergroup.members.forEach((member: any) => {
          newSpeakers.push(member);
        });
      });
      newSpeakers.sort((a: any, b: any) =>
        a.roomName.localeCompare(b.roomName)
      );
      state.activeGroup =
        newSpeakerGroups.filter((speakerGroup: any) =>
          speakerGroup.coordinator.state != null
            ? speakerGroup.coordinator.state.playbackState === "PLAYING"
            : []
        )[0] || null;
      state.speakers = newSpeakers;
    },
    setNewSpeakerVolume(state: any, newVolumeObject) {
      // console.log("old: " + state.activeGroup.coordinator.state.volume)
      // console.log(newVolumeObject.newVolume)
      state.activeGroup.coordinator.state.volume = newVolumeObject.newVolume;
      // console.log("new: " + state.activeGroup.coordinator.state.volume)
    },
    updateSpeakers(state, updatedSpeakers) {
      console.log(updatedSpeakers)

      // let result = state.speakers.find(
      //   (speaker) => speaker.roomName === updatedSpeakers.roomName
      // );

      // if (result != null) {
      //   let index = state.speakers.indexOf(result);
      //   state.speakers[index] = updatedSpeakers;
      //   if (updatedSpeakers.roomName === state.activeGroup.roomName) {
      //     // console.log(updatedSpeakers)
      //     state.activeGroup = updatedSpeakers;
      //   }
      // }
    },
    setSpotifyAccessToken(state, newAccessToken) {
      state.spotifyAccessToken = newAccessToken;
    },
  },
  modules: {},
  getters: {
    currentEntities: (state) => state.currentEntities,
    hAConnection: (state) => state.hAConnection,
    shortcutEntities: (state) =>
      state.currentEntities.filter((entity: any) =>
        entity.entity_id.startsWith("script.shortcut_")
      ),
    showNotification: (state) => state.showNotification,
    // currentWeather: (state) => state.weather,
    currentDayOfTheWeek: (state) => state.dayOfTheWeek,
    googleCalendars: (state) => state.gCalendars,
    speakers: (state) => state.speakers,
    activeGroup: (state) => state.activeGroup,
    activeGroupState: (state: any) =>
      state.activeGroup != null ? state.activeGroup.coordinator.state : null,
    spotifyAccessToken: (state) => state.spotifyAccessToken,
  },
});

export default store;
