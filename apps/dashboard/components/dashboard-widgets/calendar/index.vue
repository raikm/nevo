<template>
  <div>
    <div id="calendar-header">
      <div id="calendar-info" v-if="calendarTitle">
        <div id="calendar-day-info">{{ calendarTitle.title }}</div>
        <div id="calendar-month-info">, {{ calendarTitle.dateMonth }}</div>
      </div>
    </div>
    <div class="calendar-body-wrapper" v-if="!loading">
      <div v-if="!isReady" class="calendar-body service-info">
        Service not available
        <button @click="navigateTo({ name: 'settings' })">Settings</button>
      </div>

      <div v-else-if="calendarEvents.length === 0" class="calendar-body no-events-info">
        No events today
      </div>

      <div v-else class="calendar-body">
        <div class="calendar-events">
          <div class="calendar-next-events">
            <CalendarEvent
              v-for="event in calendarEvents.slice(0, 3)"
              :key="event.id"
              :event="event"
            />
          </div>

          <div v-if="calendarEvents.length > 3" class="preview-calendar-event">
            <div
              class="calendar-color-bar"
              :key="event.id"
              v-for="event in calendarEvents.slice(3, 6)"
              :style="{ background: event.calendarColor }"
            ></div>
            <div class="preview-text">{{ calendarEvents.length - 3 }} more events</div>
          </div>
        </div>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script lang="ts" setup>
import { useCalendarService } from '~~/services/calendar'
import { Event } from '~~/types/googleCalendarResults'
import CalendarEvent from './CalendarEvent.vue'
const { isReady } = useTokenClient()

const calendarService = useCalendarService()
const calendarEvents = ref<Event[]>([])
const loading = ref(false)

onMounted(async () => {
  refreshCalendars()
})

const refreshCalendars = async () => {
  loading.value = true

  if (isReady) {
    calendarEvents.value = await calendarService.getTodayGoogleCalendarEvents()
  } else {
    // refreshToken: https://developers.google.com/identity/protocols/oauth2/web-server#sample-oauth-2.0-server-response
  }
  loading.value = false
}

const calendarTitle = computed(() => {
  let now = new Date()
  let dateMonth = now.getUTCDate() + '. ' + now.toLocaleString('default', { month: 'long' })
  return {
    title: now.toLocaleDateString('en-US', {
      weekday: 'long'
    }),
    dateMonth: dateMonth
  }
})
</script>

<style lang="scss">
@import '../../../../../packages/style/variables.scss';

#calendar-header {
  height: 15%;
  #calendar-day-info {
    color: $red;
    font-weight: bold;
  }
  #calendar-info {
    display: flex;
    font-size: medium;
  }
}
#calendar-body {
  height: 85%;
  width: 100%;
}
.calendar-events {
  height: 100%;
  display: grid;
  grid-template-rows: 90% auto;
  .calendar-next-events {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}
.preview-calendar-event {
  display: flex;
  width: 100%;
  height: 1rem;
}
.preview-text {
  font-size: small;
  margin-left: 0.5vh;
  display: flex;
  height: 1rem;
}
.calendar-color-bar {
  width: 3px;
  border-radius: 20px;
  height: 100%;
  margin-right: 2px;
}
</style>
