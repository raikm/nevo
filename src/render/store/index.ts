import { createStore } from "vuex";
import { Config } from "../../render/types/config.interface";
import { HaEntities } from "../types/haEntities.interface";

export interface RootState {
  config: Config;
  haEntities: HaEntities;
  dayOfTheWeek: string;
}

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

const store = createStore<RootState>({
  state() {
    return {
      config: {} as Config,
      haEntities: {} as HaEntities,
      dayOfTheWeek: getDayOfTheWeek(),
    };
  },
  mutations: {
    setConfigFile(state: any, loadedConfigFile: Config) {
      state.config = loadedConfigFile;
    },
    setHaEntities(state: any, updatedEntities: HaEntities) {
      state.haEntities = updatedEntities;
    },
  },
  getters: {
    homeclimateSensors: (state) => {
      return Object.values(state.haEntities).filter((entity: any) => {
        return entity.attributes?.type === "homeclimate";
      });
    },
    homerooms: (state) => {
      return Object.values(state.haEntities).filter((entity: any) => {
        return entity.attributes?.type === "room_group";
      });
    },
  },
});

export default store;
