<template><div class="settings-container">
<Menu />
<Details />
</div></template>

<script lang="ts" setup>
import Details from "./details.vue";
import Menu from "./menu.vue";
</script>

<style lang="scss">
.settings-container {
    display: grid;
    grid-template-columns: 20% auto;
    gap: 1rem;
}
</style>

