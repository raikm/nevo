import { io } from "socket.io-client";
// const Socketio: Plugin = {
//   install: async (app: App, options: any): Promise<void> => {
//     app.provide("socket", io(options.connection));
//   },
// };
// export { Socketio };
import { App } from "vue";

export default {
  install: (app: App, options: any) => {
    const socket = io(options.connection, { transports: ["websocket"] });

    app.config.globalProperties.$socket = socket;

    app.provide("socket", socket);
  },
};
