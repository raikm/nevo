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
        .get("http://192.168.0.33:8181/HomeAPI/rest/plants/allLastData/", {
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
