import axios from "axios";
import config from "../../../config.json";
import { Zone } from "../../render/types/sonosTypes";

// https://www.zweitag.de/blog/vue-composition-api-introduction/
export default function useSonoService() {
  async function getZones(): Promise<Zone[]> {
    const response = await axios.get(`${config.sonos.rest_url}/zones`);
    return response.data;
  }
  async function resume(roomName: string) {
    axios.get(`${config.sonos.rest_url}/${roomName}/play`).catch((error) => {
      //  TODO
    });
  }

  function pauseMusic(roomName: string) {
    axios.get(`${config.sonos.rest_url}/${roomName}/pause`);
  }

  function nextTrack(roomName: string) {
    axios.get(`${config.sonos.rest_url}/${roomName}/next`);
  }

  function previousTrack(roomName: string) {
    axios.get(`${config.sonos.rest_url}/${roomName}/previous`);
  }

  function updateVolume(roomName: string, newVolume: number) {
    axios.get(`${config.sonos.rest_url}/${roomName}/groupVolume/${newVolume}`);
  }

  return {
    getZones,
    resume,
    pauseMusic,
    nextTrack,
    previousTrack,
    updateVolume,
  };
}
