import { HassEntity } from 'home-assistant-js-websocket'
import { createStore } from 'vuex'
import { Config } from '../../render/types/config.interface'
import { HaConnection } from '../types/haConnection'

export interface RootState {
  config: Config
  haConnection: HaConnection
  haEntities: HassEntity[]
  dayOfTheWeek: string
  spotifyAccessToken: string
}

function getDayOfTheWeek() {
  let date = new Date()
  const weekday = new Array(
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  )

  return weekday[date.getDay()]
}

const store = createStore<RootState>({
  state() {
    return {
      config: {} as Config,
      haEntities: [],
      dayOfTheWeek: getDayOfTheWeek(),
      haConnection: {} as HaConnection,
      spotifyAccessToken: '',
    }
  },
  mutations: {
    setConfigFile(state: any, loadedConfigFile: Config) {
      state.config = loadedConfigFile
    },
    setHaEntities(state: any, updatedEntities: HassEntity[]) {
      state.haEntities = updatedEntities
    },
    setHaConnection(state, newHaConnection) {
      state.haConnection = newHaConnection
    },
  },
  getters: {
    homeclimateSensors: (state) => {
      return Object.values(state.haEntities).filter((entity: any) => {
        return entity.attributes?.type === 'homeclimate'
      })
    },
    homerooms: (state) => {
      return Object.values(state.haEntities).filter((entity: any) => {
        return entity.attributes?.type === 'room_group'
      })
    },
    shortcutEntities: (state) =>
      state.haEntities.filter((entity: HassEntity) =>
        entity.entity_id.startsWith('script.shortcut_')
      ),
    persontEntities: (state) =>
      state.haEntities.filter((entity: HassEntity) =>
        entity.entity_id.startsWith('person.')
      ),
  },
})

export default store
