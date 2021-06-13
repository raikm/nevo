<template>
  <div id="system-overview">
    <div
      v-for="status in systemStatus"
      :key="status.name"
      class="box white-box system-status-info-card"
    >
     <div
          class="status-color"
          :class="{
            greenFillClass: status.status_code == 0,
            redFillClass: status.status_code == 1,
          }"
        ></div>
      <div class="status-name">{{ status.name }}</div>


    </div>
  </div>
</template>

<script>
export default {
  name: "SystemOverview",
  props: ["systemStatus"],
};
</script>

<style lang="scss">

#system-overview {
  margin: 1%;
  overflow: hidden;
}

.system-status-info-card {
  width: 20%;
  float: left;
  height: 4vh;
  margin: 0.6%;
  padding: 0.5vh 0.5vh;
}

.system-status {
  line-height: 4vh;
  width: 1.1vh;
  height: 100%;
  float: right;
  padding-top: 0.3vh;
  
}

.system-status-color {
  border-radius: 50%;
  width: 1vh;
  height: 1vh;

  //   top: 50%;
}
</style>
