<template>
  <div>
    <table :key="p.id" v-for="p in packagesToday">
      <tr>
        <td width="30%">{{ p.supplier }}</td>
        <td id="sender-information">{{ p.sender }}</td>
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
      packages: [
        {
          id: 1,
          supplier: "UPS",
          sender: "Zalando",
          trackingnumber: 123,
          status: "del_today",
        },
        {
          id: 2,
          supplier: "DHL",
          sender: "Mediamarkt Salzburg Apple Bla",
          trackingnumber: 123,
          status: "del_today",
        },
        {
          id: 3,
          supplier: "POST",
          sender: "Apple",
          trackingnumber: 123,
          status: "del_pending",
        },
      ],
    };
  },
  computed: {
    packagesToday: function() {
      return this.packages.filter(function(p) {
        return p.status == "del_today";
      });
    },
  },
  methods: {
    getCurrentPackages() {
   
    },
  },
  mounted() {},
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
#sender-information {
  width: 50%;
  overflow: hidden;
  padding-right: 1%;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.delivery-icon {
  height: 4vh;
  padding-left: 20%;
  vertical-align: middle;
}
</style>
