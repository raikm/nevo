<template>
  <main>
  <p :plantIssue="plantIssue">{{plantIssue.plantname}}: {{plantIssue.message}}</p>
   
  
  </main>
</template>

<script>
export default {
  name: "InfoPackageContent",
  data() {
    return {
      plantIssue:
        { 
          plantname: "Strelizia",
          message: "not enough water!",
        }
    };
  },
  computed: {
    packagesToday: function() {
      return this.packages.filter(function(p) {
        return p.status == "del_today";
      });
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 5vh;
  line-height: 5vh;
  display:inline-block;
  font-size: 1.8vh;
  padding-left: 4.5vh;
}
.delivery-icon {
  height: 70%;
  vertical-align: middle;
}
</style>
