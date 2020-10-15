<template>
  <div class="basic-card main-info-box main-info-box-big">
    <div class="public-transport-content">
      <table class="table-public-transport">
        <tr>
          <td id="public-transport-line" class="td-public-transport-title">
            Line
          </td>
          <td class="td-public-transport-title public-transport-direction">
            Direction
          </td>
          <td id="public-transport-time" class="td-public-transport-title">
            Time
          </td>
        </tr>
      </table>

      <table
        class="table-public-transport"
        :key="transport.id"
        v-for="transport in publicTransportInfos"
      >
        <tr>
          <td
            id="public-transport-line"
            class="td-public-transport"
            :style="{
              background: transport.lineColor,
              color: transport.textColor,
            }"
          >
            {{ transport.line }}
          </td>
          <td class="td-public-transport public-transport-direction">
            {{ transport.direction }}
          </td>
          <td id="public-transport-time-value" class="td-public-transport">
            {{ transport.time }} min
          </td>
        </tr>
      </table>
    </div>
    Duration to next Appoinment:
    <div class="eta-content-container">
      
      <div
        class="eta-content"
        :key="etaContent.id"
        v-for="etaContent in etaContents"
      >
        <ETAInfo :etaContent="etaContent" />
      </div>
    </div>
  </div>
</template>

<script>
import "../../compiled-icons/public-transport";
import ETAInfo from "./ETAInfo";

export default {
  name: "PublicTransportMainInfoBox",
  components: { ETAInfo },
  props: [],
  data() {
    var BUS = "bus";
    var SUBWAY = "subway";
    var SBAHN = "sbahn";

    return {
      publicTransportInfos: [
        {
          id: 1,
          type: SUBWAY,
          direction: "S+U Pankow",
          line: "U1",
          lineColor: "#DA421E",
          textColor: "white",
          time: 3,
        },
        {
          id: 2,
          type: BUS,
          direction: "Airport Berlin Tegel",
          line: "TXL",
          lineColor: "#95276e",
          textColor: "white",
          time: 4,
        },
        {
          id: 3,
          type: SBAHN,
          direction: "S Spandau Bhf",
          line: "S6",
          lineColor: "#45935d",
          textColor: "white",
          time: 10,
        },
        {
          id: 4,
          type: SUBWAY,
          direction: "Alt Tegel",
          line: "U6",
          lineColor: "	#8c6dab",
          textColor: "white",
          time: 12,
        },
        {
          id: 5,
          type: SUBWAY,
          direction: "Rudow",
          line: "U7",
          lineColor: "	#528EBA",
          textColor: "white",
          time: 13,
        },
      ],

      etaContents: [
        { id: 1, etaIcon: "bike", etaTime: "10 min" },
        { id: 2, etaIcon: "public-transport", etaTime: "22 min" },
      ],
    };
  },
  computed: {},
};
</script>

<style lang="scss">
@import "../../style/main-style";

.table-public-transport {
  margin-bottom: 0.8%;
  width: 100%;
}

.td-public-transport,
.td-public-transport-title {
  display: inline-block;
  font-size: $standard-text-medium;
  height: 2.1vh;
  line-height: 2.1vh;
}

.td-public-transport-title {
  font-weight: 500;
}

// to overwrite td = left
#public-transport-line {
  text-align: center;
  width: 15%;
  font-weight: 600;
  border-radius: $standard-border-radius;
  opacity: 0.85;
}

.public-transport-direction {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 4%;
}

.public-transport-direction {
  margin-left: 4%;
  width: 56%;
}

#public-transport-time {
  text-align: right;
  width: 20%;
}

#public-transport-time-value {
  text-align: right;
  font-size: $standard-text-small;
  width: 20%;
}

.eta-content-container {
  margin-top: 2%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 5%;
}
</style>
