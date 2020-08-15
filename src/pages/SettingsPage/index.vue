<template>
  <div>
    <AutomationOverview :scriptStatus="scriptStatus" />
    <SystemOverview
      id="system-overview-container"
      :systemStatus="systemStatus"
    />
    <WifiCard id="wifi-container" />
  </div>
</template>

<script>
import AutomationOverview from "./AutomationOverview";
import SystemOverview from "./SystemOverview";
import WifiCard from "./WifiCard";

export default {
  name: "SettingsPage",
  components: { AutomationOverview, SystemOverview, WifiCard },
  data() {
    return {
      scriptStatus: [
        {
          script_id: 1,
          name: "MifloraReader",
          script_path: "path/xyfdas",
          status_code: 0,
          status_text: "successful",
          error_text: "",
          timestamp: "12.12.2020",
        },
        {
          script_id: 2,
          name: "MifloraRefresh",
          script_path: "path/xyfdas",
          status_code: 1,
          status_text: "error",
          error_text: "File Not Found",
          timestamp: "12.12.2020",
        },
        {
          script_id: 3,
          name: "Package Watch",
          script_path: "path/xyfdas",
          status_code: 1,
          status_text: "error",
          error_text: "File Not Found - long long long to long error message",
          timestamp: "12.12.2020",
        },
        {
          script_id: 1,
          name: "MifloraReader_2",
          script_path: "path/xyfdas",
          status_code: 0,
          status_text: "successful",
          error_text: "",
          timestamp: "12.12.2020",
        },
        {
          script_id: 2,
          name: "MifloraRefresh_2",
          script_path: "path/xyfdas",
          status_code: 1,
          status_text: "error",
          error_text: "File Not Found",
          timestamp: "12.12.2020",
        },
        {
          script_id: 3,
          name: "Package Watch_2",
          script_path: "path/xyfdas",
          status_code: 1,
          status_text: "error",
          error_text: "File Not Found - long long long to long error message",
          timestamp: "12.12.2020",
        },
        {
          script_id: 1,
          name: "MifloraReader_3",
          script_path: "path/xyfdas",
          status_code: 0,
          status_text: "successful",
          error_text: "",
          timestamp: "12.12.2020",
        },
        {
          script_id: 2,
          name: "MifloraRefresh_3",
          script_path: "path/xyfdas",
          status_code: 1,
          status_text: "error",
          error_text: "File Not Found",
          timestamp: "12.12.2020",
        },
        {
          script_id: 3,
          name: "Package Watch_3",
          script_path: "path/xyfdas",
          status_code: 1,
          status_text: "error",
          error_text: "File Not Found - long long long to long error message",
          timestamp: "12.12.2020",
        },
      ],
      systemStatus: [
        {
          name: "HomeServer",
          status_code: 0,
        },
        {
          name: "SQLite DB",
          status_code: 0,
        },
        {
          name: "WiFi",
          status_code: 1,
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "../../style/main-colors";

.systemsettings-header {
  margin: 1vh 1vh;
}

#system-overview-container {
  width: 70%;
  float: left;
  overflow: hidden;
  margin: 1.6%;
}

#wifi-container {
  width: 22%;
  float: right;
}

.greenFillClass {
  background-color: $main-green;
}

.redFillClass {
  background-color: $main-red;
}
</style>
