<template>
  <div id="menu" class="main-menu">
    <div
      class="menu-button click-element"
      @click="changePage('/DashboardPage', 'dashboard-icon')"
    >
      <svgicon
        class="menu-icon dashboard-icon active"
        icon="menu_dashboard"
      ></svgicon>
    </div>
    <div
      class="menu-button click-element"
      @click="changePage('/LampsPage', 'lamp-icon')"
    >
      <svgicon class="menu-icon lamp-icon" icon="menu_lamp"></svgicon>
    </div>
    <div
      class="menu-button click-element"
      @click="changePage('/DashboardPage', 'calendar-icon')"
    >
      <div class="menu-icon calendar-icon">
        <div id="calendar-day">
          {{
            this.$store.getters.currentDayOfTheWeek
              .substring(0, 3)
              .toUpperCase()
          }}
        </div>
        <div id="calendar-date">
          {{ new Date().getUTCDate() }}
        </div>
      </div>
    </div>
    <div
      class="menu-button click-element"
      @click="changePage('/PlantsPage', 'plant-icon')"
    >
      <svgicon class="menu-icon plant-icon" icon="menu_plant"></svgicon>
    </div>
    <div
      class="menu-button click-element"
      @click="changePage('/PlantsPage', 'device-icon')"
    >
      <!-- <svgicon class="menu-icon device-icon" icon="menu_rooms"></svgicon> -->
      <svg
        class="menu-icon"
        width="335"
        height="335"
        viewBox="0 0 335 335"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="5"
          y="5"
          width="325"
          height="325"
          rx="25"
          stroke="#686868"
          stroke-width="15"
        />
        <path d="M335 167H167V335" stroke="#686868" stroke-width="15" />
      </svg>
    </div>
    <div
      id="package-menu-button"
      class="menu-button click-element"
      @click="changePage('/PackagesPage', 'package-icon')"
    >
      <svgicon class="menu-icon package-icon" icon="menu_package"></svgicon>
    </div>
    <!-- <div
            class="menu-button click-element"
            @click="changePage('SettingsPage', 'automation-icon')"
          >
            <svgicon
              class="menu-icon automation-icon"
              icon="menu_settings"
            ></svgicon>
          </div> -->
  </div>
</template>

<script>
import "@/compiled-icons/menu_dashboard";
import "@/compiled-icons/menu_device";
import "@/compiled-icons/menu_lamp";
import "@/compiled-icons/menu_package";
import "@/compiled-icons/menu_plant";
import "@/compiled-icons/menu_settings";
import "@/compiled-icons/menu_rooms";

export default {};
</script>

<style>
#menu {
  border-radius: 0px 40px;
  padding: 2.5rem;
  float: left;
  width: 10%;
}
</style>
