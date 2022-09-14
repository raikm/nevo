import {
  Connection,
  HassEntities,
  HassEntity,
} from "home-assistant-js-websocket";
import { defineStore } from "pinia";
export interface HomeAssistantState {
  haEntities: HassEntities | undefined;
  haConnection: Connection | undefined;
}

export const useHomeAssistantStore = defineStore("homeassistant", {
  state: (): HomeAssistantState => {
    return {
      haEntities: undefined,
      haConnection: undefined,
    };
  },
  getters: {
    shortcutEntities: (state) => {
      if (!state.haEntities) return;
      state.haEntities.filter((entity: HassEntity) =>
        entity.entity_id.startsWith("script.shortcut_")
      );
    },
  },
});
