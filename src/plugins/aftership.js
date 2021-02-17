const config = require("../../config.json");


const { AfterShip } = require('aftership');
const aftership = new AfterShip(config.aftership.api_key);

export default {
    install (Vue) {
        Vue.prototype.$aftership = aftership
    }
}

