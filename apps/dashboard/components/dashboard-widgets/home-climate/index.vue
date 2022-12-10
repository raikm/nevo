<template>
  <div class="room-climate-wrapper" v-if="store.homeclimateSensors">
    <RoomClimate
      :room-climate="roomClimate"
      v-for="roomClimate in Object.entries(homeclimateSensorsForEachRoom)"
    />
  </div>
</template>

<script lang="ts" setup>
import { HassEntity } from 'home-assistant-js-websocket'
import { useHomeAssistantStore } from '~~/store/homeassistant'
import RoomClimate from './RoomClimate.vue'

export interface Rooms {
  [roomName: string]: HassEntity[]
}

const store = useHomeAssistantStore()

const homeclimateSensorsForEachRoom = computed((): Rooms => {
  return store.homeclimateSensors.reduce((groups, item) => {
    const group = groups[item.attributes.Room] || []
    group.push(item)
    groups[item.attributes.Room] = group
    return groups
  }, {})
})
</script>

<style lang="scss">
.room-climate-wrapper {
  overflow-y: scroll;
}
</style>
