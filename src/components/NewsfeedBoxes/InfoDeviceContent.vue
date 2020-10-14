<template>
  <main>
  <p :key="deviceInfo.id" :deviceInfo="deviceInfo">{{deviceInfo.deviceTitle}}: {{deviceInfo.message}}</p>
  </main>
</template>

<script>



export default {
  name: "InfoDeviceContent",
 data() {
    return {
      deviceInfo:
        { 
          id: 1,
          deviceTitle: "Laundry Done",
          message: "since 10 min",
        }
    };
  },
  computed: {
    packagesToday: function() {
      return this.packages.filter(function(p) {
        return p.status == "del_today";
      });
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 5vh;
  line-height: 5vh;
  display:inline-block;
  font-size: 1.8vh;
  padding-left: 4.5vh;
}
.delivery-icon {
  height: 70%;
  vertical-align: middle;
}
</style>
