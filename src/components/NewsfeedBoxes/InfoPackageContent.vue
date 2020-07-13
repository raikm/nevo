<template>
  <div>
    <table :key="p.id" v-for="p in packages">
      <tr>
        <td id="supplier-information" >{{ p.supplier_short }}</td>
        <td id="sender-information">{{ p.package_information }}</td>
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
<script type="text/javascript" src="//www.17track.net/externalcall.js"></script>
<script>
export default {
  name: "InfoPackageContent",
  data() {
    return {
      packages: [],
    };
  },
  mounted() {
    this.getPackageInfos(this.packages);
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

table {
  width: 100%;
}

td {
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
