<template>
  <div class="info-element-with-more" @click="openDetails()">
    <div class="lable-name">{{ lableName }}</div>
    <div class="info-text">{{ infotext }}</div>
    <div class="info-more">⟩</div>
  </div>
</template>

<script>
export default {
  props: ["lableName", "infotext", "detailPageName", "data"],
  methods: {
    openDetails() {
      this.$router.push({path: `/SettingsPage/${this.detailPageName}`, query: this.data});
    },
  },
};
</script>

<style lang="scss">
.info-element-with-more {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1vh;
  padding: 0 1vh;
  height: 3vh;
  align-items: center;
   height: 100%;
}

.info-element-with-more:hover {
  background-color: $main-light-gray;
}

</style>
