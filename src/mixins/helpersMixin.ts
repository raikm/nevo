import { Timestamp } from "rxjs";
import Vue from "vue";
// import colors from "../style/main-colors.scss";
import {useStore} from 'vuex'
import { useRouter } from "vue-router";
import axios from "axios";
const store = useStore();
const router = useRouter();


const mixin = {
  methods: {
    cleanConfigName(configName: string) {
      let cleanName = configName.replace("_", " ").toUpperCase();
      return cleanName;
    },
    changePage: function(path: string) {
      router.push(path);
      if (router.currentRoute.value.name == "dashboard-page") {
        store.commit("setShowNotification", true);
        // document.getElementById("main-container").style.?gridTemplateColumns =
        //   "auto 70% 25%";
      } else {
        store.commit("setShowNotification", false);
      }
    },
    defineSupplierShort(supplier: string) {
      if (supplier.includes("AUSTRIAN")) {
        return supplier.replace("AUSTRIAN ", "");
      }
      return supplier;
    },
    defineStatusTagColor(status: string) {
      let green = "#53c66ebd";
      let greenAlternative = "#53c66ebd";
      let yellow = "#e3ea60bd";
      let startColor = "#e66718bd";

      let backgroundColor = startColor;

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
    getPackageInfos(packages: Array<object>) {
      if (packages.length > 1) {
        packages = [];
      }
      axios
        .get("https://api.aftership.com/v4/trackings", {
          headers: {
            "aftership-api-key": store.getters.config.aftership.api_key,
            "Content-Type": "application/json",
          },
        })
        // TODO declare specefic type
        .then((response: any) => {
          let packagesInformation = response.data.data.trackings;
          for (let i = 0; i < packagesInformation.length; i++) {
            let info = packagesInformation[i];

            let delivery_date_string =
              info.expected_delivery != null
                ? info.expected_delivery
                : info.shipment_delivery_date; //<--
            let status = info.tag;
            let backgroundColor = this.defineStatusTagColor(status);
            let delivery_date = new Date(delivery_date_string);
            let supplier = info.slug.replace("-", " ").toUpperCase();
            let supplierShort = this.defineSupplierShort(supplier);
            let p = {
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
            packages.push(p);
          }
        })
        .catch((error: Error) => {
          // this.showToastError(error);
          console.log(error)
        });
    },
    // cleanUpOldData(plantDataTimestamp: Date, plantDetailArray: Array) {
    //   for (let i = 0; i < plantDetailArray.length; i++) {
    //     if (
    //       plantDetailArray[i].timestamp.getDate() ===
    //         plantDataTimestamp.getDate() &&
    //       plantDetailArray[i].timestamp.getTime() ===
    //         plantDataTimestamp.getTime()
    //     ) {
    //       plantDetailArray.splice(i);
    //     }
    //   }
    // },
    // convertHex(hexCode, opacity) {
    //   let hex = hexCode.replace("#", "");

    //   if (hex.length === 3) {
    //     hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    //   }

    //   let r = parseInt(hex.substring(0, 2), 16),
    //     g = parseInt(hex.substring(2, 4), 16),
    //     b = parseInt(hex.substring(4, 6), 16);

    //   return "rgba(" + r + "," + g + "," + b + "," + opacity / 100 + ")";
    // },
    //TODO: make to one generic method: https://gist.github.com/danieliser/b4b24c9f772066bcf0a6
    preparePlantChart(data: object, min: number, max: number, mainColor: String, timeFormat: String, start: Date, end: Date) {
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
      // console.log(data);
      return {
        data: {
          datasets: [
            {
              type: "line",
              data: data,
              borderWidth: 2,
              borderColor: mainColor,
              backgroundColor: opactiyColor,
              pointRadius: 0,
              order: 2,
            },
            {
              type: "line",
              data: [
                { x: start, y: min },
                { x: end, y: min },
              ],
              borderWidth: 1,
              borderColor: "rgba(235, 75, 0, 0.2)",
              backgroundColor: "rgba(151,187,205,0)",
              pointRadius: 0,
              order: 1,
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
                  // color: colors.mainLightGray,
                  display: true,
                },
                ticks: {
                  fontSize: 9,
                  maxTicksLimit: 6,
                  min: start,
                  max: end,
                  display: true,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  // color: colors.mainLightGray,
                  display: false,
                },
                ticks: {
                  callback: function(value: number) {
                    return value >= 1000 ? value / 1e3 + "T" : value;
                  },
                  max: max,
                  min: 0,
                  fontSize: 9,
                  maxTicksLimit: 4,
                  display: true,
                  padding: 1,
                },
              },
            ],
          },
        },
      };
    },
  },
};

export default mixin;