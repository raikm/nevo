<template>
  <div class="setting-main-page">
    <div class="setting-menu">
      <h1 class="title-1">Settings</h1>

      <div class="setting-menu-wrapper element-wrapper">
        <div class="setting" @click="openSettingDetail('General')">
          <svgicon class="settings-icon" icon="gear"></svgicon>
          <div class="settings-title">General</div>
        </div>
        <div class="setting" @click="openSettingDetail('Server')">
          <svgicon class="settings-icon" icon="server"></svgicon>
          <div class="settings-title">Server</div>
        </div>
      </div>
      <div class="setting-menu-wrapper element-wrapper">
        <div class="setting" @click="openSettingDetail('Calendar')">
          <svgicon class="settings-icon" icon=""></svgicon>
          <div class="settings-title">Calendar</div>
        </div>
        <div class="setting" @click="openSettingDetail('Spotify')">
          <svgicon class="settings-icon" icon="spotify_without_background"></svgicon>
          <div class="settings-title">Spotify</div>
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
          <svgicon
            class="settings-icon plant-icon active"
            icon="menu_plant"
          ></svgicon>
          <div class="settings-title">Plants</div>
        </div>
        <div class="setting" @click="openSettingDetail('PackageTracking')">
          <svgicon
            class="settings-icon package-icon active"
            icon="menu_package"
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
import "@/compiled-icons/menu_plants";
import "@/compiled-icons/menu_package";
import "@/compiled-icons/gear";
import "@/compiled-icons/server";
import "@/compiled-icons/apple_music";
import "@/compiled-icons/spotify_without_background";
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
        display: flex;
        align-items: center;
        .settings-icon {
          height: 80%;
          padding: 0.3vh;
          margin-right: 0.5vh;
          border-radius: 5px;
          background-color: rgba(211, 211, 211, 0.301);
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
  margin-left: 15px;
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
