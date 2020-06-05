<template>
  <section>
    <b-table class="package-table" :data="packages" :striped="true">
      <template slot-scope="props">
        <b-table-column field="supplier" label="Courrier">
          {{ props.row.supplier }}
        </b-table-column>
        <b-table-column field="package_information" label="Package Information">
          {{ props.row.package_information }}
        </b-table-column>
        <b-table-column field="delivery_data" label="Delivery Date">
          {{ props.row.delivery_data }}
        </b-table-column>
        <b-table-column
          field="delivery_information"
          label="Delivery Information"
        >
          {{ props.row.delivery_information }}
        </b-table-column>
        <b-table-column field="status" label="Status">
          <span class="tag">
            {{ props.row.status }}
          </span>
        </b-table-column>
      </template>
    </b-table>
  </section>
</template>

<script>
export default {
  name: "PackagesPage",
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
      //TODO: put config ones global in root (APP)
      var config = require("../../../config.json");
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
          console.log(packagesInformation);
          for (var i = 0; i < packagesInformation.length; i++) {
            var info = packagesInformation[i];

            var delivery_data =
              info.expected_delivery != null
                ? info.expected_delivery
                : info.shipment_delivery_date;
            var supplier = info.slug.replace("-", " ").toUpperCase() 
            var p = {
              id: i,
              supplier: supplier,
              package_information: info.title,
              trackingnumber: info.tracking_number,
              status: info.tag,
              delivery_data: delivery_data,
              delivery_information: "",
            };
            this.packages.push(p)
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
</style>
