import Vue from "vue";

Vue.mixin({
  methods: {
    getConfigFile: function() {
      //TODO: request also the value and return already the value not the config
      var config = require("../../config.json");
      return config;
    },
    changePage: function(path) {
      this.$router.push(path);
    },
    showToastError: function() {},
    defineSupplierShort(supplier) {
      if (supplier.includes("AUSTRIAN")) {
        return supplier.replace("AUSTRIAN ", "");
      }
      return supplier;
    },
    defineStatusTagColor(status) {
      var green = "#53c66ebd";
      var greenAlternative = "#53c66ebd";
      var yellow = "#e3ea60bd";
      var startColor = "#e66718bd";

      var backgroundColor = startColor;

      if (
        status == "Delivered" ||
        status == "OutForDelivery" ||
        status == "InfoReceived" ||
        status == "AvailableForPickup"
      ) {
        backgroundColor = green;
      } else if (status == "InTransit" || status == "Pending") {
        backgroundColor = yellow;
      } else if (status == "Avaible for Pickup") {
        backgroundColor = greenAlternative;
      }
      return backgroundColor;
    },
    getPackageInfos(packages) {
      if (packages.length > 1) {
        packages = [];
      }
      var config = this.getConfigFile();
      this.$axios
        .get("https://api.aftership.com/v4/trackings", {
          headers: {
            "aftership-api-key": config.aftership.api_key,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          var packagesInformation = response.data.data.trackings;
          for (var i = 0; i < packagesInformation.length; i++) {
            var info = packagesInformation[i];

            var delivery_date_string =
              info.expected_delivery != null
                ? info.expected_delivery
                : info.shipment_delivery_date; //<--
            var status = info.tag;
            var backgroundColor = this.defineStatusTagColor(status);
            var delivery_date = new Date(delivery_date_string);
            var supplier = info.slug.replace("-", " ").toUpperCase();
            var supplierShort = this.defineSupplierShort(supplier);
            var p = {
              id: i,
              supplier: supplier,
              supplier_short: supplierShort,
              package_information: info.title,
              trackingnumber: info.tracking_number,
              status: status,
              delivery_date: delivery_date,
              delivery_information: "",
              backgroundColor: backgroundColor,
            };
            this.packages.push(p);
          }
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    },
    cleanUpTimeStamp(timestamp) {
      var hour = timestamp.getHours();
      var minutes = timestamp.getMinutes();
      if (!Number.isInteger(hour / 2)) {
        if (minutes > 30) {
          hour = hour + 1;
        } else {
          hour += 1;
        }
      }
      timestamp.setMinutes(0);
      timestamp.setSeconds(0);
      timestamp.setHours(hour);
      return timestamp;
    },
    cleanUpOldData(plantDataTimestamp, plantDetailArray) {
      for (var i = 0; i < plantDetailArray.length; i++) {
        if (
          plantDetailArray[i].timestamp.getDate() ===
            plantDataTimestamp.getDate() &&
            plantDetailArray[i].timestamp.getTime() ===
            plantDataTimestamp.getTime()
        ) {
          plantDetailArray.splice(i);
        }
        
      }
    },
    preparePlantChart(labels, data, min, max) {
      return {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              borderWidth: 1,
              backgroundColor: "rgba(32.0, 99.0, 155.0, 0.7)",
              pointRadius: 0,
            },
          ],
        },
        options: {
          responsive: true,
          lineTension: 1,
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                },
                ticks: {
                  max: max,
                  min: min,
                  display: false,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                  display: false,
                },
                ticks: {
                  fontSize: 15,
                },
              },
            ],
          },
        },
      };
    },
  },
});

//TODO: showToast Methode
