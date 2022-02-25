import { App, Plugin } from 'vue'
import VueGapi from 'vue-gapi'
import config from '../../../../../config.json'

const Gapi: Plugin = {
  install: async (app: App): Promise<void> => {
    const configParameter = {
      apiKey: config.google_calendar.api_key,
      clientId: config.google_calendar.client_id,
      discoveryDocs: config.google_calendar.discovery_docs,
      scope: config.google_calendar.scope,
      redirect_uri: 'localhost:8081', // TODO
    }
    VueGapi.install(app, configParameter)
    app.provide('gapi', app.config.globalProperties.$gapi)
  },
}
export { Gapi }
