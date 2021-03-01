import Vue from "vue";
import colors from "../style/main-colors.scss";

Vue.mixin({
  methods: {
    changePage: function(path, name) {
      this.$router.push(path, () => {});
      var elements = document.getElementsByClassName("active");
      for (var i = 0; i < elements.length; i++) {
        elements[0].classList.remove("active");
      }
      document.getElementsByClassName(name)[0].classList.add("active");

      if (this.$router.currentRoute.name == "dashboard-page") {
        this.$store.commit("setShowNotification", true);
        document.getElementById("page").style.width = "65%";
      } else {
        this.$store.commit("setShowNotification", false);
        document.getElementById("page").style.width = "90%";
      }
    },
    showToastError(text) {
      this.$buefy.toast.open({
        duration: 5000,
        message: text,
        position: "is-bottom",
        type: "is-danger",
      });
    },
    showToastInfo(text) {
      this.$buefy.toast.open({
        duration: 5000,
        message: text,
        position: "is-bottom",
        type: "is-light",
      });
    },

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
      this.$axios
        .get("https://api.aftership.com/v4/trackings", {
          headers: {
            "aftership-api-key": this.$store.getters.getConfig.aftership
              .api_key,
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
        .catch((error) => {
          this.showToastError(error);
        });
    },
    simplifyArray(displayArray) {
      // var simpliedArray = []

      displayArray.forEach((element) => {
        var duplicates = displayArray.filter(
          (e) => e.timestamp.getHours() == element.timestamp.getHours()
        );
        if (duplicates.length > 1) {
          //var newestDate = duplicates.map(e => e.timestamp ).sort().reverse()[0]
          //console.log(newestDate)
          //TODO: delete now all from the duplicated who dont have this date
        }
      });
      // var hour = timestamp.getHours();
      // var minutes = timestamp.getMinutes();
      // if (!Number.isInteger(hour / 2)) {
      //   if (minutes > 30) {
      //     hour = hour + 1;
      //   } else {
      //     hour += 1;
      //   }
      // }
      // timestamp.setMinutes(0);
      // timestamp.setSeconds(0);
      // timestamp.setHours(hour);
      return displayArray;
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
    convertHex(hexCode, opacity) {
      var hex = hexCode.replace("#", "");

      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }

      var r = parseInt(hex.substring(0, 2), 16),
        g = parseInt(hex.substring(2, 4), 16),
        b = parseInt(hex.substring(4, 6), 16);

      return "rgba(" + r + "," + g + "," + b + "," + opacity / 100 + ")";
    },
    //TODO: make to one generic method: https://gist.github.com/danieliser/b4b24c9f772066bcf0a6
    preparePlantChart(data, min, max, mainColor, timeFormat, start, end) {
      // console.log(start)
      // console.log(end)
      // const dataModified = data.filter(entry => entry.length > 6);
      // console.log(data)

      const opactiyColor = () => {
        let hex = mainColor.replace("#", "");

        if (hex.length === 3) {
          hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
        }

        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        return `rgba(${r},${g},${b},${60 / 100})`;
      };

      return {
        type: "line",
        data: {
          datasets: [
            {
              data: data,
              borderWidth: 0,
              backgroundColor: opactiyColor,
              pointRadius: 1,
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
            xAxes: [
              {
                type: "time",
                time: {
                  parser: timeFormat,
                },
                gridLines: {
                  color: colors.mainLightGray,
                  display: true,
                },
                ticks: {
                  fontSize: 10,
                  maxTicksLimit: 6,
                  min: start,
                  max: end,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                  display: false,
                },
                ticks: {
                  max: max,
                  min: min,
                  maxTicksLimit: 4,
                  display: false,
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
