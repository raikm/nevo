<template>
  <div class="public-transport-box">
    <div class="public-transport-header">
      <div class="public-transport-header-title public-transport-header-title-line">Line</div>
      <div class="public-transport-header-title public-transport-header-direction">Direction</div>
      <div class="public-transport-header-title public-transport-header-time">Time</div>
    </div>
    <div class="public-transport-content-wrapper">
      <div
        :key="transport.tripId"
        v-for="transport in departuresFromHome"
        class="public-transport-content"
      >
        <div class="public-transport-header-title-line-info">
          <div :class="transport.line?.product">{{ transport.line?.name }}</div>
        </div>
        <div class="public-transport-header-direction-info">{{ transport.direction }}</div>
        <div class="public-transport-header-time-info">{{ mapETATime(transport.plannedWhen) }} min</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Alternative } from "hafas-client";
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "PublicTransport",
  computed: {
    ...mapState(["config"]),
  },
  created() {
    this.connectToHafasWebSocket();
  },
  data() {
    return {
      hafasConnection: {} as WebSocket,
      departuresFromHome: [] as Alternative[],
    };
  },
  methods: {
    connectToHafasWebSocket() {
      this.hafasConnection = new WebSocket(
        `ws://${this.config.public_transport.websocketUrl}`
      );

      this.hafasConnection.onmessage = (event) => {
        let trips: Array<Alternative> = [];
        let stationInformations: Array<Alternative[]> = JSON.parse(event.data);
        stationInformations.forEach((stationElment) => {
          stationElment.forEach((element) => {
            trips.push(element);
          });
        });
        this.departuresFromHome = trips.sort((a: Alternative, b: Alternative) =>
          new Date(a.plannedWhen!) > new Date(b.plannedWhen!) ? 1 : -1
        );
      };
    },
    mapETATime(timeString: string) {
      let plannedTime = new Date(timeString);
      let difference = (plannedTime.getTime() - new Date().getTime()) / 1000;
      difference /= 60;
      return Math.abs(Math.round(difference));
    },
  },
  unmounted() {
    this.hafasConnection.close();
  },
});
</script>

<style lang="scss">
@import "../../../../../../../libs/style/variables.scss";
@import "../../../styles/publictransport.scss";
.public-transport-content-wrapper {
  overflow: scroll;
  scrollbar-width: 0;
  height: 85%;
}

.public-transport-header {
  font-weight: 500;
}

.public-transport-header,
.public-transport-content {
  display: grid;
  grid-template-columns: 2fr 8fr 4fr;
  // height: 22px;
  column-gap: 5px;
  font-size: $standard-text-medium;
}

.public-transport-header-title-line {
  text-align: center;
  font-weight: bold;
}
.public-transport-header-title-line-info {
  color: white;
  margin: 2px 0;
  display: grid;
  align-content: center;
  justify-content: center;
}

.public-transport-header-direction,
.public-transport-header-direction-info {
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.public-transport-header-time,
.public-transport-header-time-info {
  text-align: right;
  justify-self: right;
}

.public-transport-header-time-info {
  font-size: $standard-text-small;
  opacity: 0.85;
}
</style>
