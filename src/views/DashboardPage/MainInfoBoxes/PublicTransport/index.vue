<template>
  <div>
    <div class="public-transport-box">
      <div class="public-transport-header">
        <div
          class="
            public-transport-header-title public-transport-header-title-line
          "
        >
          Line
        </div>
        <div
          class="
            public-transport-header-title public-transport-header-direction
          "
        >
          Direction
        </div>
        <div class="public-transport-header-title public-transport-header-time">
          Time
        </div>
      </div>
      <div class="public-transport-content-wrapper">
        <div
          :key="transport.id"
          v-for="transport in departuresFromHome"
          class="public-transport-content"
        >
          <div
            class="public-transport-header-title-line-info"
            :class="transport.line.product"
          >
            {{ transport.line.name }}
          </div>
          <div class="public-transport-header-direction-info">
            {{ transport.direction }}
          </div>
          <div class="public-transport-header-time-info">
            {{ mapETATime(transport.plannedWhen) }} min
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { mapState } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PublicTransportMainInfoBox",
  computed: {
    ...mapState(["config"]),
  },
  created() {
    this.connectToHafasWebSocket();
  },
  data() {
    return {
      hafasConnection: null,
      departuresFromHome: null,
    };
  },
  methods: {
    mapETATime(timeString) {
      let plannedTime = new Date(timeString);
      let difference = (plannedTime.getTime() - new Date().getTime()) / 1000;
      difference /= 60;
      return Math.abs(Math.round(difference));
    },
    connectToHafasWebSocket() {
      console.log("start websocket connection");
      console.log(this.config.public_transport.websocketUrl);
      // this.hafasConnection = new WebSocket(
      //   `ws://${this.config.public_transport.websocketUrl}`
      // );
      let self = this;
      this.hafasConnection = new WebSocket(`ws://localhost:3000`);
      this.hafasConnection.onmessage = function (event) {
        // console.log(JSON.parse(event.data));
        self.departuresFromHome = JSON.parse(event.data);
        console.log(self.departuresFromHome);
      };
    },
  },
  unmounted() {
    this.hafasConnection.close();
  },
});
</script>

<style lang="scss">
@import "./PublicTransportBerlin.scss";

.public-transport-box {
  height: 95%;
  overflow: scroll;
}

.public-transport-header,
.public-transport-content {
  display: grid;
  grid-template-columns: 1fr 8fr 4fr;
  height: 22px;
  column-gap: 5px;
  font-size: $standard-text-medium;
}

.public-transport-content-wrapper {
  margin-top: 5px;
}

.public-transport-header {
  font-weight: bold;
}

.public-transport-header-title {
}

.public-transport-header-title-line {
  text-align: center;
  font-weight: bold;
}
.public-transport-header-title-line-info {
  border-radius: 4px;
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
