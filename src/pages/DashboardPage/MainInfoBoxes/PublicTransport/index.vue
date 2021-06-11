<template>
  <div class="basic-card main-info-box large-widget">
    <div class="public-transport-box">
      <div class="public-transport-header">
        <div
          class="public-transport-header-title public-transport-header-title-line"
        >
          Line
        </div>
        <div
          class="public-transport-header-title public-transport-header-direction"
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
            :class="transport.line.name.replace(/\s/g, '')"
          >
            {{ transport.line.name.replace(/^\D+/g, "") }}
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

<script>
import { mapState } from "vuex";

export default {
  name: "PublicTransportMainInfoBox",
  computed: {
    ...mapState(["config"]),
  },
  created() {
    this.getDepatureTime();
    this.interval = setInterval(() => {
      try {
        this.getDepatureTime();
      } catch (e) {
        console.error("Hafas Client ist not setup: " + e);
      }
    }, 20000);
  },
  data() {
    return {
      departuresFromHome: [],
      favoriteLineIds: ["svv-1-2-j21-1", "svv-1-4-j21-1", "svv-1-12-j21-1"],
      stationsNearHome: [
        { id: "455654100", name: "Salzburg Stadtwerk Lehen" },
        { id: "455079400", name: "Salzburg Roseggerstraße" },
        // { id: "455104600", name: "Salzburg Kuenburgstraße" }, //define bus lines who have to be filtered out
        // { id: "455081900", name: "Salzburg Strubergasse" },
        // { id: "455079300", name: "Salzburg Esshaverstraße" },
        // { id: "455001300", name: "Salzburg Gaswerkgasse" },
        // { id: "455102400", name: "Salzburg Aiglhof S-Bahn" },
        // { id: "455102300", name: "Salzburg Mülln-Altstadt S-Bahn" },
      ],
    };
  },
  methods: {
    mapETATime(timeString) {
      let plannedTime = new Date(timeString);
      let difference = (plannedTime.getTime() - new Date().getTime()) / 1000;
      difference /= 60;
      return Math.abs(Math.round(difference));
    },
    getDepatureTime() {
      this.departuresFromHome = [];
      const createRoundRobin = require("@derhuerst/round-robin-scheduler");
      const createClient = require("hafas-client-rpc/ws/client");

      const hafasClient = createClient(
        createRoundRobin,
        ["ws://" + this.config.public_transport.websocketUrl + ":3000"],
        (_, hafas) => {
          this.stationsNearHome.forEach((station) => {
            hafas.departures(station.id, { duration: 15 }).then((result) =>
              result.forEach((element) => {
                // check if bus/train belongs to favorite lines
                if (
                  this.filterTime(element.plannedWhen) &&
                  (this.favoriteLineIds.includes(element.line.id) ||
                    element.line.product === "bahn-s-bahn")
                ) {
                  this.departuresFromHome.push(element);
                  this.departuresFromHome.sort((a, b) =>
                    new Date(a.plannedWhen) > new Date(b.plannedWhen) ? 1 : -1
                  );
                }
              })
            );
          });
        }
      );

      // console.log(hafasClient);
      hafasClient.on("message", () => {
        // console.log("a message occurred!");
      });
      // hafasClient.on("connection-open", () => {
      //   console.log("connection-open");
      // });
      // hafasClient.on("event", () => {
      //   console.log("event");
      // });
      hafasClient.on("error", console.error);
    },
    filterTime(depTime) {
      let time3MinutesExtra = new Date();
      time3MinutesExtra.setMinutes(time3MinutesExtra.getMinutes() + 3);
      time3MinutesExtra = new Date(time3MinutesExtra);
      if (new Date(depTime) >= time3MinutesExtra) return true;
      return false;
    },
  },
  destroyed() {
    clearInterval(this.interval);
  },
};
</script>

<style lang="scss">
@import "./PublicTransportSalzburg.scss";

.public-transport-box {
  height: 95%;
  overflow: scroll;
}

.public-transport-header,
.public-transport-content {
  display: grid;
  grid-template-columns: 1fr 8fr 4fr;
  column-gap: 5px;
  font-size: $standard-text-medium;
}

.public-transport-content-wrapper {
  margin-top: 1vh;
}

.public-transport-header {
  font-weight: bold;
}

.public-transport-header-title {
}

.public-transport-header-title-line,
.public-transport-header-title-line-info {
  text-align: center;
  font-weight: bold;
}
.public-transport-header-title-line-info {
  border-radius: 4px;
  color: white;
  margin: 0.1vh 0;
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
