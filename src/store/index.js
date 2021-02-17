import Vue from "vue";
import Vuex from "vuex";
try {
  var config = require("../../config.json");
} catch (err) {
  console.log("CONFIG FILE NOT FOUND");
}

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentEntities: [],
    config: config,
  },
  mutations: {
    //sync
    setCurrentEntities(state, updatedEntities) {
      state.currentEntities = updatedEntities;
    },
  },
  modules: {},
  getters: {
    getCurrentEntities: (state) => state.currentEntities,
    getConfig: (state) => state.config,
  },
});
