<template>
  <main>
    <div class="package-card columns" v-bind:key="p.id" v-for="p in packages">
      <div class="first-row">
        <img
          class="delivery-icon"
          src="../../../public/img/icons/shipping-and-delivery.svg"
        />
      </div>
      <div class="column is-paddingless is-2 supplier">
        {{ p.supplier }}
      </div>
      <div class="column is-paddingless is-3">{{ p.package_information }}</div>
      <div class="column date-column is-paddingless is-1">
        {{ p.delivery_date.toLocaleDateString("de-DE", (dateStyle = "short")) }}
      </div>
      <div class="column is-paddingless is-4">{{ p.delivery_information }}</div>
      <div class="column status-column is-paddingless is-1">
        <div class="status-tag" :style="{ backgroundColor: p.backgroundColor }">
          {{ p.status }}
        </div>
      </div>
    </div>
    <b-button
      @click="changeDisplayNewPackages()"
      class="round-button"
      id="plus-button"
      >+</b-button
    >

    <div class="package-card columns" id="new-package">
      <div class="first-row">
        <img
          class="delivery-icon"
          src="../../../public/img/icons/shipping-and-delivery.svg"
        />
      </div>
      <div class="column is-paddingless is-2">
        <select class="new-delivery-input" id="selector" placeholder="Courrier">
          <option value="dhl">DHL</option>
          <option value="dpd-de">DPD</option>
          <option value="gls">GLS</option>
          <option value="hermes-de">HERMES</option>
          <option value="ups">UPS</option>
          <option value="deutsch-post">POST DE</option>
          <option value="austrian-post">POST AT</option>
        </select>
      </div>
      <div class="column is-paddingless is-3">
        <input
          id="sender-input"
          class="new-delivery-input"
          placeholder="Sender"
        />
      </div>
      <div class="column is-paddingless is-5">
        <input
          class="new-delivery-input"
          id="trackingnumber-input"
          placeholder="Trackingnumber"
        />
      </div>
      <div class="column is-paddingless is-1">
        <div id="status-text"></div>
        <button
          class="new-delivery-input"
          id="save-button"
          @click="saveNewDelivery()"
        >
          Save
        </button>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  name: "PackageCard",
  props: ["packages"],
  methods: {
    changeDisplayNewPackages() {
      var NewPackageEl = document.getElementById("new-package"),
        NewPackageDisplay = window.getComputedStyle(NewPackageEl).display;
      var PlusButtonEl = document.getElementById("plus-button");
      var saveButtonEl = document.getElementById("save-button");
      var statusTextEl = document.getElementById("status-text");
      if (NewPackageDisplay == "none") {
        NewPackageEl.style.display = "flex";
        statusTextEl.style.display = "none";
        statusTextEl.innerText = "";
        saveButtonEl.style.display = "inline";
        PlusButtonEl.style.display = "none";
      } else {
        NewPackageEl.style.display = "none";
        PlusButtonEl.style.display = "flex";
      }
    },
    defineColorBasedOnStatus() {
      return null;
    },
    saveNewDelivery() {
      var e = document.getElementById("selector");
      var slug = e.options[e.selectedIndex].value;
      var title = document.getElementById("sender-input").value;
      var trackingnumber = document.getElementById("trackingnumber-input")
        .value;
      if (!slug.length > 0 || !title.length > 3 || !trackingnumber.length > 5) {
        console.log("here toast or status field with error");
        return;
      }

      const payload = {
        tracking: {
          slug: slug,
          tracking_number: trackingnumber,
          title: title,
        },
      };
      this.$aftership.tracking
        .createTracking(payload)
        .then(this.showResult(true))
        .catch((e) => {
          console.log(e);
          this.showResult(false);
        });

      setTimeout(() => {
        this.changeDisplayNewPackages();
        this.$parent.getPackageInfos();
      }, 3000);
    },
    showResult(result) {
      var saveButtonEl = document.getElementById("save-button");
      var statusTextEl = document.getElementById("status-text");
      saveButtonEl.style.display = "none";
      statusTextEl.style.display = "inline";
      console.log(result);
      if (result == true) {
        statusTextEl.innerText = "sucess";
      } else {
        statusTextEl.innerText = "fail";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
  line-height: 4vh;
  top: 50%;
  transform: translateY(-50%);
}
.date-column {
  text-align: right;
}

.supplier {
  font-weight: 800;
  // margin-left: 2vh;
}

#courier-selector {
  display: flex;
}

.first-row {
  margin: 0 2vh;
}

.status-column {
  display: flex;
  //   text-align: center;
  justify-content: center;
  align-items: center;
  text-align: center;

  height: 100%;
}

.status-tag {
  // background-color: $deliverd-color;
  border-radius: 4px;
  padding: 0 1vh;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.delivery-icon {
  height: 2vh;
  padding-right: 8%;
  vertical-align: middle;
}

#plus-button {
  display: inline-flex;
  float: right;
}

.round-button {
  border-radius: 50%;
}

#new-package {
  display: none;
}

.new-delivery-input {
  height: 70%;
 
}

#sender-input {
  width: 80%;
  margin-left: -1vh;
}

#trackingnumber-input {
  width: 80%;
  margin-left: -1vh;
}

#selector {
  width: 60%;
}
#save-button,
#status-text {
  width: 100%;
  border-radius: 4px;
  padding: 0.2vh 0.9vh;
  top: 50%;
}
#status-text {
  // text-align: center;
  float: right;
}
</style>
