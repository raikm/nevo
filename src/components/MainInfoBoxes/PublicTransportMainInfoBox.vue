<template>
  <div class="basic-card main-info-box main-info-box-big">
    <div class="main-info-content">
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
          <td id="public-transport-time" class="td-public-transport">
            {{ transport.time }} min
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import "../../compiled-icons/public-transport";

export default {
  name: "PublicTransportMainInfoBox",
  components: {},
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
          time: 4,
        },
        {
          id: 2,
          type: BUS,
          direction: "Airport Berlin Tegel",
          line: "TXL",
          lineColor: "#95276e",
          textColor: "white",
          time: 2,
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
  height: 2.6vh;
  line-height: 2.6vh;
}

.td-public-transport-title {
  font-weight: bold;
}

// to overwrite td = left
#public-transport-line {
  text-align: center;
  width: 15%;
  font-weight: bold;
  border-radius: $standard-border-radius;
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
</style>
