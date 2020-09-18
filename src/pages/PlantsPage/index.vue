<template>
  <div>
    <PlantCard :plantInformation="plantInformation" />
  </div>
</template>

<script>
import PlantCard from "./PlantCard";

export default {
  name: "PlantsPage",
  components: {
    PlantCard,
  },
  created: function() {
    {
      this.$axios
        .get("http://192.168.1.80:8000/allplants/", {
        })
        .then((response) => {
          this.plantInformation = response.data;
        })
        .catch((error) => {
           this.showToastError(error.toString())
        });
    }
  },
  data() {
    return {
      plantInformation: {},
    };
  },
  methods: {
    imagePath(image) {
      return require(image.url.default);
    },
  },
};
</script>
