<template>
    <div>
        <div id="boxes">



        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>

#boxes {
    display: flex;
    column-gap: 15px;
    row-gap: 15px;
    flex-wrap: wrap;

    .small-box {
      height: 120px;
      width: 380px;
    }
    .large-box {
      height: 200px;
      width: 380px;
    }
  }
</style>