import { io } from "socket.io-client";
import { App, Plugin } from "vue";

const Socketio: Plugin = {
  install: async (app: App, options: any): Promise<void> => {
    app.provide("socket", io(options.connection));
  },
};
export { Socketio };
