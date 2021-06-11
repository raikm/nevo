<template>
  <div>
    <div class="sensor-address-selection-wrapper">
      <select class="standard-selection-list" size="10">
        <option class="standard-select-option" value="">00:1B:44:11:3A:B7</option>
        <option value="">00:1B:44:12:3A:B7</option>
        <option value="">00:15:44:ac:3A:B7</option>
      </select>
    </div>
  </div>
</template>

<script>

export default {
};
</script>

<style lang="scss">
.sensor-address-selection-wrapper,
.search-dialog {
  display: grid;
  grid-template-columns: 100%;
}

.standard-selection-list {
  border-radius: 0;
  font-size: medium;
}


</style>
