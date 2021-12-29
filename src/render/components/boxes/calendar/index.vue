<template>
    <div>
        <div id="calendar-header">
            <div id="calendar-info">
                <!-- TODO <div id="calendar-day-info">{{ title.title }}</div>
                <div id="calendar-month-info">, {{ title.dateMonth }}</div>-->
            </div>
        </div>

        <div v-if="!gCalendars" class="calendar-body service-info">Service not available</div>

        <div
            v-else-if="appointments.length === 0"
            class="calendar-body no-events-info"
        >No events today</div>

        <div v-else class="calendar-body">
            <div class="calendar-events">
                <div class="calendar-next-events">
                    <calendar-appointment
                        v-for="appointment in appointments.slice(0, 3)"
                        :key="appointment.id"
                        :appointment="appointment"
                    />
                </div>

                <div v-if="appointments.length > 3" class="preview-calendar-appointment">
                    <div :key="appointment.id" v-for="appointment in appointments.slice(3, 6)">
                        <div
                            class="calendar-color-bar"
                            :style="{ background: appointment.calendarColor }"
                        ></div>
                    </div>
                    <div class="preview-text">{{ appointments.length - 3 }} more events</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue';
import { VueGapi } from 'vue-gapi';
import { Entry, GapiResult, Item } from '../../../types/gapiResult';
import CalendarAppointment from "./CalendarAppointment.vue";
export default defineComponent({
    components: { CalendarAppointment },
    setup() {
        const gapi = inject('gapi') as VueGapi

        const gCalendars = ref([] as Item[])
        const appointments = ref([] as Entry[])
        const startDay = ref(new Date().setHours(0, 0, 0, 0))
        const endDay = ref(new Date().setHours(23, 59, 59, 999))

        const initClient = async () => {
            if (!await gapi.isSignedIn()) {
                await gapi.login()
            }
        }
        const setGoogleCalendars = async () => {
            const gapieClient = await gapi.getGapiClient()
            await gapieClient.client.calendar.calendarList
                .list()
                .then((response: any) => {
                    gCalendars.value = (response.result as GapiResult).items;
                    getCalendarEvents()
                })
                .catch((error: any) => {
                    console.log(error);
                });
        }

        const getCalendarEvents = async () => {
            if (gCalendars.value.length == 0) return;
            //remove calendarweeks infos
            let calendars = gCalendars.value.filter(function (obj) {
                return obj.id !== "e_2_de#weeknum@group.v.calendar.google.com";
            });
            for await (let calendar of calendars) {
                let calendarColor = calendar.backgroundColor;
                const gapieClient = await gapi.getGapiClient()

                await gapieClient.client.calendar.events
                    .list({
                        calendarId: calendar.id,
                        timeMin: new Date(startDay.value).toISOString(),
                        timeMax: new Date(endDay.value).toISOString(),
                        showDeleted: false,
                        singleEvents: true,
                        orderBy: "startTime",
                    })
                    .then((response: any) => {
                        response.result.items.forEach((entry: Entry) => {
                            if (new Date(entry.end.dateTime) > new Date()) {
                                entry["calendarColor"] = calendarColor;
                                appointments.value.push(entry);
                                appointments.value.sort((a, b) =>
                                    new Date(a.start.dateTime) > new Date(b.start.dateTime)
                                        ? 1
                                        : -1
                                );
                            }
                        });
                    })
                    .then(() => { })
                    .catch((error: Error) => {
                        console.log(error.message);
                    });
            }
        }
        // if (appointments.length === 0) {
        //     this.showNextDay();
        // }




        initClient()
        setGoogleCalendars()


        return { gCalendars, appointments }
    }
})
</script>

<style lang="scss">
#calendar-header {
    height: 15%;
    #calendar-day-info {
        color: red;
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
    grid-template-rows: 95% 5%;
    .calendar-next-events {
        display: flex;
        flex-direction: column;
    }
}
.preview-calendar-appointment {
    display: flex;
    width: 100%;
}
.preview-text {
    font-size: small;
    margin-left: 0.5vh;
    display: flex;
}
.calendar-color-bar {
    width: 3px;
    border-radius: 20px;
    height: 100%;
    margin-right: 2px;
}
</style>