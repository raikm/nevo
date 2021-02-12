<template>
  <section>
    <PackageCard class="package-cards" :packages="packages" />
    <PopUpWindow :windowWidth="50" :popupTitle="'New Package'">
      <component :is="newPackageContent"></component>
      </PopUpWindow>
  </section>
</template>

<script>
import PackageCard from "./PackageCard";
import PopUpWindow from "../../components/PopUpWindow/PopUpWindow"
import NewPackageContent from "./NewPackageContent"

export default {
  name: "PackagesPage",
  components: { PackageCard, PopUpWindow, NewPackageContent },
  data() {
    return {
      packages: [],
      newPackageContent: 'NewPackageContent'
    };
  },
  mounted() {
    this.getPackageInfos(this.packages);
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
