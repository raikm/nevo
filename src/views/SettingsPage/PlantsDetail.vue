<template>
  <div>
    <h1 class="title-1">{{ this.plant.name }}</h1>
    <div class="element-wrapper-header">
      <div
        v-if="readonly === true"
        class="action-setting-element"
        @click="setElementsToEdit"
      >
        Edit
      </div>
      <div v-else class="action-setting-element" @click="saveChanges">Save</div>
    </div>
    <div class="element-wrapper">
      <EditableInfoElement
        :readonly="readonly"
        lableName="Name"
        :infotext="plant.name"
        v-model="plant.name"
      />
      <InfoElement
        lableName="Identifier"
        :infotext="plant.id"
        v-model="plant.id"
      />
      <EditableInfoElement
        :readonly="readonly"
        lableName="Address"
        :infotext="plant.address"
        v-model="plant.address"
      />
      <EditableInfoElement
        :readonly="readonly"
        lableName="Location"
        :infotext="plant.location.location"
        v-model="plant.location.location"
      />
    </div>
    <div class="element-wrapper">
      <EditableInfoElement
        :readonly="readonly"
        lableName="Soil Fertility Border Min"
        :infotext="plant.soil_fertitlity_borders.min"
        v-model="plant.soil_fertitlity_borders.min"
      />
      <EditableInfoElement
        :readonly="readonly"
        lableName="Soil Fertility Border Max"
        :infotext="plant.soil_fertitlity_borders.max"
        v-model="plant.soil_fertitlity_borders.max"
      />
      <EditableInfoElement
        :readonly="readonly"
        lableName="Soil Fertility Currency"
        :infotext="plant.soil_fertitlity_borders.currency"
        v-model="plant.soil_fertitlity_borders.currency"
      />
    </div>
    <div class="element-wrapper">
      <EditableInfoElement
        :readonly="readonly"
        lableName="Soil Moisture Border Min"
        :infotext="plant.soil_moisture_borders.min"
        v-model="plant.soil_moisture_borders.min"
      />
      <EditableInfoElement
        :readonly="readonly"
        lableName="Soil Moisture Border Max"
        :infotext="plant.soil_moisture_borders.max"
        v-model="plant.soil_moisture_borders.max"
      />
      <EditableInfoElement
        :readonly="readonly"
        lableName="Soil Moisture Currency"
        :infotext="plant.soil_moisture_borders.currency"
        v-model="plant.soil_moisture_borders.currency"
      />
    </div>
    <div class="element-wrapper">
      <EditableInfoElement
        :readonly="readonly"
        lableName="Sunlight Intensity Border Min"
        :infotext="plant.sunlight_intensity_borders.min"
        v-model="plant.sunlight_intensity_borders.min"
      />
      <EditableInfoElement
        :readonly="readonly"
        lableName="Sunlight Intensity Border Max"
        :infotext="plant.sunlight_intensity_borders.max"
        v-model="plant.sunlight_intensity_borders.max"
      />
      <EditableInfoElement
        :readonly="readonly"
        lableName="Sunlight Intensity Currency"
        :infotext="plant.sunlight_intensity_borders.currency"
        v-model="plant.sunlight_intensity_borders.currency"
      />
    </div>
    <div class="element-wrapper">
      <EditableInfoElement
        :readonly="readonly"
        lableName="Temperature Border Min"
        :infotext="plant.temperature_borders.min"
        v-model="plant.temperature_borders.min"
      />
      <EditableInfoElement
        :readonly="readonly"
        lableName="Temperature Border Max"
        :infotext="plant.temperature_borders.max"
        v-model="plant.temperature_borders.max"
      />
      <EditableInfoElement
        :readonly="readonly"
        lableName="Temperature Currency"
        :infotext="plant.temperature_borders.currency"
        v-model="plant.temperature_borders.currency"
      />
    </div>
    <div class="element-wrapper">
      <ActionElement lableName="Locate Plantsensor"></ActionElement>
    </div>
  </div>
</template>

<script>
import EditableInfoElement from "@/components/Inputs/EditableInfoElement";
import InfoElement from "@/components/Inputs/ActionElement";
import ActionElement from "@/components/Inputs/ActionElement";
export default {
  name: "Plant Detail",
  components: { EditableInfoElement, ActionElement, InfoElement },
  created() {
    this.plant = this.$route.query;
  },
  mounted() {
    if (this.plant.id === "") {
      this.setElementsToEdit();
      this.setAvailableID();
      // this.getAvailableAddresses();
    }
  },
  methods: {
    getAvailableAddresses() {
      this.axios
        .get(
          `${this.$store.getters.config.homeserver.url}:8080/getAvailableMacAddresses/`
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          this.showToastError(error.toString());
        });
    },
    setAvailableID() {
      this.axios
        .get(`${this.$store.getters.config.homeserver.url}:8080/getNewId/`)
        .then((response) => {
          if (typeof response.data === "number") {
            this.plant.id = response.data;
          } else {
            this.plant.id = "ERROR";
          }
        })
        .catch((error) => {
          this.showToastError(error.toString());
        });
    },
    setElementsToEdit() {
      this.readonly = false;
    },
    saveChanges() {
      //check if mendetory fields are filledup
      this.axios
        .put(
          `${this.$store.getters.config.homeserver.url}:8080/create_update_plant/${this.plant.id}/`,
          this.plant
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          this.showToastError(error.toString());
        });

      this.readonly = true;
    },
  },
  data() {
    return {
      plant: {},
      readonly: true,
    };
  },
};
</script>

<style></style>
