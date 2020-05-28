<template>
  <div id="app">
    <main>
      <div class="columns">
        <div id="left-header" class="column header is-1"></div>
        <div id="middle-header" class="column header ">
          <h1 id="dashboard-title">DASHBOARD</h1>
        </div>
        <div id="right-header" class="column header is-3"></div>
      </div>
      <div class="columns">
        <div id="menu" class="main-menu column is-1">
          <div class="menu-button" :key="menu.id" v-for="menu in menus">
          
              <object
                class="menu-icon"
                :data="menu.iconSource"
                type="image/svg+xml"
                @click="changePage('menulink')"
                
              >
              </object>
              <!-- <img class="menu-icon" :src="menu.iconSource" /> -->
            
          </div>
        </div>
        <div id="main-control" class="main-menu column">
          <router-view></router-view>
        </div>
        <div id="newsfeed" class="main-menu column is-3">
          <div
            id="info-box"
            :key="infoBoxContent.id"
            v-for="infoBoxContent in infoBoxContentList"
          >
            <InfoBox :infoBoxContent="infoBoxContent" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import InfoBox from "./components/NewsfeedBoxes/InfoBox";

export default {
  name: "homeapp",
  components: {
    InfoBox,
  },
  methods: {
    changePage(path){
      console.log("change")
      this.$router.push(path)
    }
  },
  data() {
    return {
      infoBoxContentList: [
        {
          id: 1,
          iconSource: "/img/icons/shipping-and-delivery.svg",
          title: "Package Tracking",
          contentType: "package",
        },
        {
          id: 2,
          iconSource: "/img/icons/plant.svg",
          title: "Plant Alert",
          contentType: "plant",
        },
      ],
      menus: [
        {
          id: 1,
          title: "Home",
          iconSource: "/img/menuicons/dashboard.svg",
          link: "/DashboardPage",
        },
        {
          id: 2,
          title: "Lights",
          iconSource: "/img/menuicons/lights.svg",
          link: "/LampsPage",
        },
        // {
        //   id: 3,
        //   title: "Devices",
        //   iconSource: "/img/menuicons/devices.svg",
        //   link: "",
        // },
        {
          id: 4,
          title: "Plants",
          iconSource: "/img/menuicons/plants.svg",
          link: "/PlantsPage",
        },
        {
          id: 5,
          title: "Packages",
          iconSource: "/img/menuicons/packages.svg",
          link: "/PackagesPage",
        },
      ] 
    };
  },
};
</script>

<style lang="scss">
body {
  background-color: rgb(252, 252, 252);
}

.click-element:active {
  animation: bounce-in 0.5s;
}

@keyframes bounce-in {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.98);
  }
  100% {
    transform: scale(1.02);
  }
}

#dashboard-title {
  font-size: 7vh;
  line-height: 9vh;
  height: 9vh;
}

#middle-header {
  margin: 0 2vh;
  // padding: 4vh;
}

.main-menu {
  height: 90vh;
  // margin-top: 2vh;
}

#menu {
  border-radius: 0px 40px;
  background-color: #1c0bfe;
  padding-top: 4vh;
}

.menu-button {
  // background-color: rgba(243, 240, 240, 1);
  // border-color: grey;
  // border-style: dotted;
  // border-radius: 10px;
  // border-width: 1px;
  display: flex;
  height: 6vh;
  width: 6vh;
  margin-bottom: 1.5vh;
  margin-left: auto;
  margin-right: auto;
  text-align: center;

}

.menu-icon {
  
  margin: auto;
  width: 70%;
}

.menu-icon:active {
  filter: invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%);
}

#newsfeed {
  border-radius: 40px 0px;
  padding: 4vh;
  background-color: rgba(247, 246, 249, 1);
}
</style>
