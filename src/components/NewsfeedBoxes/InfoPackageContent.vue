<template>
  <div class="columns">
    <div class="column is-one-quarter"><span>UPS</span></div>
    <div class="column"><span>Zalando</span></div>
    <div class="column is-one-fifth">
      <img class="delivery-icon" src="../../../public/img/icons/postcar.svg" />
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoPackageContent",
};
</script>
script

<style scoped>
.column {
  height: 8vh;
}

span {
  vertical-align: middle;
}

.delivery-icon {
  height: 80%;
  vertical-align: middle;
}
</style>
