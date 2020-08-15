<template>
    <div class="basic-card" id="overview">
      <h1 class="main-info-header systemsettings-header" >Automations</h1>
      <div
        v-for="status in scriptStatus"
        :key="status.name"
        class="basic-card automation-status-info-card"
      >
        <div
          class="status-color"
          :class="{
            greenFillClass: status.status_code == 0,
            redFillClass: status.status_code == 1,
          }"
        ></div>
        <div class="status-name">{{ status.name }}</div>
        <div class="script-last-update">{{ status.timestamp }}</div>
      </div>
    </div>
</template>

<script>
export default {
  name: "AutomationOverviewPage",
  props: ["scriptStatus"]
};
</script>

<style lang="scss">
@import "../../style/main-colors";

#overview {
  margin: 1.6%;
  overflow: hidden;
}



.automation-status-info-card {
  width: 32.3%;
  float: left;
  height: 4vh;
  margin: 0.5vh;
  padding: 0.5vh 1vh;
}

.status-color {
  border-radius: 2px;
  width: 0.6vh;
  height: 100%;
  float: left;
}



.status-name {
  margin: 0 5%;
  float: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: x-large;
  font-weight: 500;
}

.script-last-update{
  float: right;
}
</style>
