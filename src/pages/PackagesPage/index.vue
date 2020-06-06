<template>
  <section>
    <PackageCard class="package-cards" :packages="packages" />
  </section>
</template>

<script>
import PackageCard from "./PackageCard";

export default {
  name: "PackagesPage",
  components: { PackageCard },
  data() {
    return {
      packages: [],
    };
  },
  mounted() {
    this.getPackageInfos();
  },
  methods: {
    getPackageInfos() {
      var config = this.getConfigFile()
      this.$axios
        .get("https://api.aftership.com/v4/trackings", {
          headers: {
            "aftership-api-key": config.aftership.api_key,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // handle success
          var packagesInformation = response.data.data.trackings;
          for (var i = 0; i < packagesInformation.length; i++) {
            var info = packagesInformation[i];

            var delivery_date =
              info.expected_delivery != null
                ? info.expected_delivery
                : info.shipment_delivery_date;
            var supplier = info.slug.replace("-", " ").toUpperCase();
            var p = {
              id: i,
              supplier: supplier,
              package_information: info.title,
              trackingnumber: info.tracking_number,
              status: info.tag,
              delivery_date: delivery_date,
              delivery_information: "",
            };
            this.packages.push(p);
          }
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
.package-table {
  padding: 50px;
}

.package-cards {
  margin-top: 4vh;
  width: 100%;
  padding: 0 50px;
}
</style>
