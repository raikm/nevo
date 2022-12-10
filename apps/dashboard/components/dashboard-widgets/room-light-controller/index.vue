<template>
  <div class="room-light-controller-wrapper">
    <div class="room-light-controller">
      <div
        class="roomlight-button"
        :class="room.state == 'on' ? 'roomlight-button-on' : 'roomlight-button-off'"
        :key="room.entity_id"
        v-for="room in store.homerooms"
        @click="triggerGroupState(room.entity_id, room.state)"
      >
        <div v-if="room.state == 'on'">💡</div>
        <div v-else-if="room.state == 'off'">⭕️</div>
        <div v-else-if="room.state == 'unavailable'">🚧</div>
        <span class="room-name">{{ room.attributes.friendly_name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useHomeAssistantStore } from '~~/store/homeassistant'

const store = useHomeAssistantStore()

const triggerGroupState = (entity_id: string, state: string) => {
  if (state === 'unavailable') return
  let service = state == 'on' ? 'turn_off' : 'turn_on'
  let domain = entity_id.split('.')[0]
  store.haConnection.sendMessagePromise({
    type: 'call_service',
    domain: domain,
    service: service,
    service_data: {
      entity_id: entity_id
    }
  })
}
</script>

<style lang="scss">
.room-light-controller {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  column-gap: 25px;
  grid-auto-columns: minmax(110px, 1fr);
  grid-auto-flow: column;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
  align-content: flex-end;
}

.roomlight-button {
  height: 60px;
  width: 100px;
  border-radius: 12px;
  margin: 5px;
  // background: gray;
  display: grid;
  grid-template-rows: 4fr 1fr;
  padding: 10px;
  border: solid 1px rgba(222, 222, 222, 0.176);
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);

  transition: all 0.3s ease 0s;
  cursor: pointer;
}

.roomlight-button-on {
  background-color: white;
}

.roomlight-button-off {
  background-color: rgba(236, 236, 236, 0.5);
}

.room-name {
  font-size: small;
}
</style>
