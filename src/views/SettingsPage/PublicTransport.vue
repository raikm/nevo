<template>
  <div>
    <h1 class="title-1">{{ this.$options.name }}</h1>
    <div class="element-wrapper">
      <SelectionElement
        :key="station.id"
        v-for="station in stations"
        :lableName="station.name"
        :selections="station.lines"
        v-on:click-select="saveSelection"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { defineComponent } from "vue";
import SelectionElement from "@/components/Inputs/SelectionElement.vue";
// import { StationElement } from "@/types/stationTypes.interface";

export default defineComponent({
  name: "Public Transport",
  components: { SelectionElement },
  computed: {
    ...mapState(["config"]),
  },
  created() {
    this.connectToHafasWebSocket();
  },
  data() {
    return {
      hafasConnection: null,
      stations: [],
    };
  },
  methods: {
    //TODO: Method that validates that line can be only picked for one station
    connectToHafasWebSocket() {
      this.hafasConnection = new WebSocket(
        `ws://${this.config.public_transport.websocketUrl}`
      );

      this.hafasConnection.onopen = () => {
        this.requestStationsNearHome();
      };
      this.hafasConnection.onmessage = (event) => {
        this.stations = JSON.parse(event.data);
      };
    },
    requestStationsNearHome() {
      this.hafasConnection.send(
        JSON.stringify({
          methode: "requestStations",
          homeCoordinates: this.config.public_transport.home_address,
        })
      );
    },
    saveSelection(stationname, line) {
      console.log(stationname);
      let station = this.stations.find(
        (station) => station.name === stationname
      );
      var selectedLine = {
        stationId: station.id,
        name: station.name,
        line: line.id,
      };
      this.hafasConnection.send(
        JSON.stringify({
          methode: "saveSelection",
          selectedLine: selectedLine,
        })
      );
    },
  },
  unmounted() {
    this.hafasConnection.close();
  },
});
</script>

<style></style>
