import { createStore } from "vuex";
import { Config } from "../../render/types/config.interface";

const store = createStore({
    state() {
        return {
          config: {} as Config
        }
      },
      mutations: {
          setConfigFile(state, loadedConfigFile){
              state.config = loadedConfigFile;
          }
      }
});

export default store;
