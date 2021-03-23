let config;

try {
  config = require("../../config.json");
} catch (error) {
  if (error.code === "MODULE_NOT_FOUND") {
    config = require("../../config_example.json");
    console.error("CONFIG FILE NOT FOUND - EXAMPLE CONFIG IS BEEING USED");
  } else {
    console.error("CONFIG FILE NOT FOUND");
  }
}


const { AfterShip } = require("aftership");


const aftership = new AfterShip(config.aftership.api_key);

export default {
  install(Vue) {
    Vue.prototype.$aftership = aftership;
  },
};
