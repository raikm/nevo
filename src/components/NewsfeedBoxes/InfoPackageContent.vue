<template>
  <div>
    <table id="table-package-info" :key="p.id" v-for="p in packages">
      <tr>
        <td class="td-package-info" id="supplier-information" >{{ p.supplier_short }}</td>
        <td class="td-package-info" id="sender-information">{{ p.package_information }}</td>
        <td width="15%">
          <img
            class="delivery-icon"
            src="../../../public/img/icons/postcar.svg"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "InfoPackageContent",
  data() {
    return {
      packages: [],
    };
  },
  mounted() {
    // this.getPackageInfos(this.packages);
    this.sortPackages();
    
  },  
 methods: {
    sortPackages(){
       return this.packages.filter(function(p) {
        return p.status == "OutForDelivery";
      });
    }
  },
};
</script>

<style lang="scss" scoped>
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

#table-package-info {
  width: 100%;
}

.td-package-info {
  display: inline-block;
  font-size: 1.8vh;
  height: 5vh;
  line-height: 5vh;
}
#supplier-information{
  overflow: hidden;
  padding-right: 1%;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 30%;
}

#sender-information {
  width: 50%;
  overflow: hidden;
  padding: 0 1%;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.delivery-icon {
  height: 4vh;
  padding-left: 20%;
  vertical-align: middle;
}
</style>
