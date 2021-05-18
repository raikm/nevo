<template>
  <div>
    <div
      class="menu-button click-element"
      @click="changePage('/DashboardPage', 'dashboard-icon')"
    >
      <svgicon class="menu-icon" icon="menu_dashboard"></svgicon>
    </div>
    <div
      class="menu-button click-element"
      @click="changePage('/RoomsPage', 'lamp-icon')"
    >
      <svgicon class="menu-icon" icon="menu_lamp"></svgicon>
    </div>
    <div
      class="menu-button click-element"
      @click="changePage('SettingsPage', 'settings-icon')"
    >
      <svgicon class="menu-icon" icon="menu_rooms"></svgicon>
    </div>
    <div
      class="menu-button click-element"
      @click="changePage('/PlantsPage', 'plant-icon')"
    >
      <svgicon class="menu-icon" icon="menu_plants"></svgicon>
    </div>
  </div>
</template>
w
<script>
import "@/compiled-icons/menu_dashboard";
import "@/compiled-icons/menu_lamp";
import "@/compiled-icons/menu_package";
import "@/compiled-icons/menu_plants";
import "@/compiled-icons/menu_rooms";

export default {};
</script>

<style lang="scss"></style>
