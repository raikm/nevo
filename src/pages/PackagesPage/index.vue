<template>
  <section>
    <PackageCard class="package-cards" :packages="packages" />
  </section>
</template>

<script>
import PackageCard from "./PackageCard";

export default {
  name: "PackagesPage",
  components: { PackageCard },
  data() {
    return {
      packages: [],
    };
  },
  mounted() {
    // this.getPackageInfos(this.packages);
  },
  methods: {
  
  },
};
</script>

<style lang="scss">
.package-table {
  padding: 50px;
}

.package-cards {
  margin-top: 4vh;
  width: 100%;
  padding: 0 50px;
}
</style>
