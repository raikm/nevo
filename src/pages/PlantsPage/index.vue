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
        .get("http://localhost:8000/allplants/", {
        })
        .then((response) => {
          this.plantInformation = response.data;
        })
        .catch(function(error) {
          // handle error
          console.log(error);
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
