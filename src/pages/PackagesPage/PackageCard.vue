<template>
  <main>
    <div class="package-card columns" v-bind:key="p.id" v-for="p in packages">
      <div class="first-row"> <img
          class="delivery-icon"
          src="../../../public/img/icons/shipping-and-delivery.svg"
        />
</div>
      <div class="column is-paddingless is-2 supplier">
        {{ p.supplier }}
      </div>
      <div class="column is-paddingless is-3">{{ p.package_information }}</div>
      <div class="column is-paddingless is-2">{{ p.delivery_date }}</div>
      <div class="column is-paddingless is-3">{{ p.delivery_information }}</div>
      <div class="column is-paddingless is-1">
        <span class="status-tag">
          <!-- TODO: change color depended on the status -->
          {{ p.status }}
        </span>
      </div>
    </div>
    <b-button @click="changeDisplayAddPackageFormular()" class="round-button"
      >+</b-button
    >

    <div class="package-card columns" id="new-package">
      <div class="first-row">  <img
          class="delivery-icon"
          src="../../../public/img/icons/shipping-and-delivery.svg"
        /></div>
      <div class="column is-paddingless is-2">
      
        <select placeholder="Courrier">
          <option value="ups">UPS</option>
          <option value="dpd">DPD</option>
          <option value="dpd">Hermes</option>
          <option value="dpd">DHL</option>
          <option value="dpd">Post AT</option>
          <option value="dpd">Post DE</option>
        </select>
      </div>
      <div class="column is-paddingless is-3">
        <input placeholder="Sender"/>
      </div>
      <div class="column is-paddingless is-5">
        <input placeholder="Trackingnumber"/>
      </div>
      <div class="column is-paddingless is-1"><button id="save-button">Save</button></div>
    </div>
  </main>
</template>
<script>
export default {
  name: "PackageCard",
  props: ["packages"],
  methods: {
    changeDisplayAddPackageFormular() {
      var el = document.getElementById("new-package");
      if (el && el.style) {
        el.style.display = el.style.display != "none" ? "none" : "flex";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$deliverd-color: #53c66ebd;
$on-the-way-color: #e3ea60bd;
$start-color: #e66718bd;

.package-card {
  background-color: white;
  border-radius: 10px;
  border-color: rgb(243, 244, 254);
  border-width: 1px;
  border-style: solid;
  margin-bottom: 1vh;
  width: 100%;
  height: 4vh;
  margin: 1vh 0;
  /* position: relative; */
  line-height: 4vh;
  /* text-align: center; */
  top: 50%;
  transform: translateY(-50%);
  
}
.supplier {
  font-weight: 800;
  // margin-left: 2vh;

}

#courier-selector{ 
  
  display: flex;
}

.first-row{
  margin: 0 2vh;
}

.status-tag {
  background-color: $deliverd-color;
  border-radius: 4px;
  padding: 0.2vh 0.9vh;
  top: 50%;
  transform: translateY(-50%);
}

.delivery-icon {
  height: 2vh;
  padding-right: 8%;
  vertical-align: middle;
}

.round-button {
  border-radius: 50%;
  float: right;
}
#save-button {
  width: 100%;
  text-align: center;
}

#new-package{
  display: none;
}
</style>
