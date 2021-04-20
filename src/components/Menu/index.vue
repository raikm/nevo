<template>
  <div >
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
    <!-- <div
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
    </div> -->
    <div
      class="menu-button click-element"
      @click="changePage('/PlantsPage', 'plant-icon')"
    >
      <svgicon class="menu-icon plant-icon" icon="menu_plant"></svgicon>
    </div>

    <div
      class="menu-button click-element"
      @click="changePage('SettingsPage', 'settings-icon')"
    >
      <svgicon class="menu-icon settings-icon" icon="menu_settings"></svgicon>
    </div>
  </div>
</template>

<script>
import "@/compiled-icons/menu_dashboard";
import "@/compiled-icons/menu_device";
import "@/compiled-icons/menu_lamp";
import "@/compiled-icons/menu_package";
import "@/compiled-icons/menu_plant";
import "@/compiled-icons/menu_rooms";
import "@/compiled-icons/menu_settings";

export default {};
</script>

<style lang="scss">

</style>
