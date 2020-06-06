import Vue from "vue";

Vue.mixin({
  methods: {
    getConfigFile: function() {
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
