<template>
  <div class="setting-main-page">
    <div class="setting-menu">
      <h1 class="title-1">Settings</h1>

      <div class="setting-menu-wrapper element-wrapper">
        <div class="setting" @click="openSettingDetail('General')">
          <svgicon class="settings-icon" icon="settings_general"></svgicon>
          <div class="settings-title">General</div>
        </div>
        <div class="setting" @click="openSettingDetail('Server')">
          <svgicon class="settings-icon" icon="settings_server"></svgicon>
          <div class="settings-title">Server</div>
        </div>
      </div>
      <div class="setting-menu-wrapper element-wrapper">
        <div class="setting" @click="openSettingDetail('Calendar')">
          <svgicon class="settings-icon" icon="settings_calendar"></svgicon>
          <div class="settings-title">Calendar</div>
        </div>
        <div class="setting" @click="openSettingDetail('Spotify')">
          <svgicon class="settings-icon" icon="settings_spotify"></svgicon>
          <div class="settings-title">Spotify</div>
        </div>
        <div class="setting" @click="openSettingDetail('AppleMusic')">
          <svgicon class="settings-icon" icon="settings_apple_music"></svgicon>
          <div class="settings-title">Apple Music</div>
        </div>
        <div class="setting" @click="openSettingDetail('Speaker')">
          <svgicon class="settings-icon" icon="settings_speaker"></svgicon>
          <div class="settings-title">Speaker</div>
        </div>
        <div class="setting" @click="openSettingDetail('PublicTransport')">
          <svgicon
            class="settings-icon"
            icon="settings_public_transport"
          ></svgicon>
          <div class="settings-title">Public Transport</div>
        </div>
        <div class="setting" @click="openSettingDetail('Weather')">
          <svgicon class="settings-icon" icon="settings_weather"></svgicon>
          <div class="settings-title">Weather</div>
        </div>
        <div class="setting" @click="openSettingDetail('Plants')">
          <svgicon
            class="settings-icon plant-icon active"
            icon="settings_plants"
          ></svgicon>
          <div class="settings-title">Plants</div>
        </div>
        <div class="setting" @click="openSettingDetail('PackageTracking')">
          <svgicon
            class="settings-icon package-icon active"
            icon="settings_package"
          ></svgicon>
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
import "@/compiled-icons/settings_apple_music";
import "@/compiled-icons/settings_calendar";
import "@/compiled-icons/settings_general";
import "@/compiled-icons/settings_public_transport";
import "@/compiled-icons/settings_server";
import "@/compiled-icons/settings_speaker";
import "@/compiled-icons/settings_spotify";
import "@/compiled-icons/settings_weather";
import "@/compiled-icons/settings_package";
import "@/compiled-icons/settings_plants";

export default {
  name: "SettingsPage",
  created() {
    // this.router.push("SettingsPage/General");
  },
  computed: {
    ...mapGetters(["config"]),
  },
  methods: {
    openSettingDetail(childrenPageName) {
      this.router.push(`/SettingsPage/${childrenPageName}`);
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
    border-right: 1px solid rgba(0, 0, 0, 0.5);
    margin-bottom: $standard-space*4;
    min-width: 260px;
    max-width: 380px;
    .setting-menu-wrapper {
      margin-right: $standard-space;
      padding: 0 !important;
      height: auto;
      margin-bottom: $standard-space;
      .setting {
        display: flex;
        align-items: center;
        .settings-icon {
          height: 80%;
          margin-right: 0.5vh;
          border: solid;
          border-width: 1px; 
          border-color: rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          fill: none;
        }
      }
      .setting:hover {
        background-color: $main-light-gray;
        overflow: hidden;
      }
    }
  }
  .setting-detail {
    padding: 0 $standard-space;
  }
}
.element-wrapper-header {
  width: 100%;
  display: grid;
  justify-content: right;
}
.element-wrapper {
  background-color: white;
  backdrop-filter: blur(10px);
  border-radius: 5px;
  margin: 1vh 0;
}

.element-wrapper > div {
  border-bottom: 1px solid $main-light-gray;
  padding-left: 15px;
  height: 4vh;
}
.element-wrapper > div:last-child {
  border: none;
}
.info-element {
  height: 100%;
}

.lable-name {
  font-weight: 500;
}

.info-text {
  justify-self: right;
  color: $main-gray;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  text-align: right;
  margin-right: 5%;
  font-size: 16px;
}

.input-element {
  border: none;
  text-align: right;
  justify-self: right;
  white-space: nowrap;
  width: 100%;
  text-align: right;
  margin-right: 5%;
  font-size: 16px;
}

.action-setting-element {
  color: $main-blue;
  cursor: pointer;
}
</style>
