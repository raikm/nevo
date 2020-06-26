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
  },
});

//TODO: showToast Methode
