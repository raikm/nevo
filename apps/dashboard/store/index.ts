import { defineStore } from "pinia";
import { NevoConfig } from "../types/nevoConfig";
export interface State {
  config: NevoConfig | undefined;
  spotifyAccessToken: string;
}

export const useStore = defineStore("store", {
  state: (): State => {
    return {
      config: undefined,
      spotifyAccessToken: "",
    };
  },
});
