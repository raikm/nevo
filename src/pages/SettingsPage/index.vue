<template>
  <div class="setting-main-page">
    <div class="setting-menu">
      <div class="setting-menu-wrapper basic-card">
        <div class="setting" @click="openSettingDetail('General')">
          <svgicon class="settings-icon" icon=""></svgicon>
          <div class="settings-title">General</div>
        </div>
        <div class="setting" @click="openSettingDetail('Server')">
          <svgicon class="settings-icon" icon=""></svgicon>
          <div class="settings-title">Server</div>
        </div>
      </div>
      <div class="setting-menu-wrapper basic-card">
        <div class="setting" @click="openSettingDetail('Calendar')">
          <svgicon class="settings-icon" icon=""></svgicon>
          <div class="settings-title">Calendar</div>
        </div>
        <div class="setting" @click="openSettingDetail('Spotify')">
          <svgicon class="settings-icon" icon=""></svgicon>
          <div class="settings-title">Spotify</div>
        </div>
        <div class="setting" @click="openSettingDetail('HomeAssistant')">
          <svgicon class="settings-icon" icon=""></svgicon>
          <div class="settings-title">Home Assistant</div>
        </div>
        <div class="setting" @click="openSettingDetail('Sonos')">
          <svgicon class="settings-icon" icon=""></svgicon>
          <div class="settings-title">Sonos</div>
        </div>
        <div class="setting" @click="openSettingDetail('PublicTransport')">
          <svgicon class="settings-icon" icon=""></svgicon>
          <div class="settings-title">Public Transport</div>
        </div>
        <div class="setting" @click="openSettingDetail('Weather')">
          <svgicon class="settings-icon" icon=""></svgicon>
          <div class="settings-title">Weather</div>
        </div>
        <div class="setting" @click="openSettingDetail('Plants')">
          <svgicon class="settings-icon" icon=""></svgicon>
          <div class="settings-title">Plants</div>
        </div>
        <div class="setting" @click="openSettingDetail('PackageTracking')">
          <svgicon class="settings-icon" icon=""></svgicon>
          <div class="settings-title">Package Tracking</div>
        </div>
      </div>
    </div>
    <div class="setting-detail">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import "@/compiled-icons/";

export default {
  name: "SettingsPage",
  created() {
    // this.$router.push("SettingsPage/General");
  },
  computed: {
    ...mapGetters(["config"]),
  },
  methods: {
    openSettingDetail(childrenPageName) {
      console.log("open: " + childrenPageName);
      this.$router.push(`/SettingsPage/${childrenPageName}`);
    },
    
  },
};
</script>

<style lang="scss">
.setting-main-page {
  display: grid;
  grid-template-columns: 2fr 6fr;
  .setting-menu {
    // background-color: yellow;
    border-right: 1px solid black;
    .setting-menu-wrapper {
      margin-right: $standard-space;
      padding: 0 !important;
      height: auto;
      margin-bottom: $standard-space;
      .setting {
        height: 4vh;
        display: flex;
        align-items: center;
        .settings-icon {
          height: 100%;
        }
      }
      .setting:hover {
        background-color: lightgray;
        overflow: hidden;
      }
    }
  }
  .setting-detail {
    padding: 0 $standard-space;
  }
}
.element-wrapper {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 5px;
  margin: 1vh 0;
}

</style>