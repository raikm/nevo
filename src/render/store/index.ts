import { createStore } from "vuex";
import { Config } from "../../render/types/config.interface";
import { HaEntities } from "../types/haEntities.interface";

const store = createStore({
    state() {
        return {
          config: {} as Config,
          haEntities: {} as HaEntities
        }
      },
      mutations: {
          setConfigFile(state: any, loadedConfigFile: Config){
              state.config = loadedConfigFile;
          },
          setHaEntities(state: any, updatedEntities: HaEntities){
            state.haEntities = updatedEntities;
          }
      },
      getters: {
        homeclimateSensors: state => {
          return Object.values(state.haEntities).filter((entity: any) => { 
            return entity.attributes?.type === "homeclimate"
          })
      },
    }
});

export default store;
