import { SpotifyService } from "./spotify.service";

const service = new SpotifyService();

export const useSpotifyService = () => service;
