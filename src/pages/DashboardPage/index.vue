

<template>

  <main>
    <div id="header" class="columns">
      <div id="leftheader" class="column"></div>
      <div id="middleheader" column="column"><h1>DASHBOARD</h1></div>
      <div id="rightheader" column="column"></div>
    </div>
    <div class="columns">
      <div id="menu" class="column">
        <DashboardButton />
      </div>
      <div id="mainControl" column="column"></div>
      <div id="newsfeed" column="column">
        <InfoBox />

      </div>
    </div>
  </main>
</template>

<script>
import DashboardButton from "./DashboardButton";
import InfoBox from "../../components/NewsfeedBoxes/InfoBox"

export default {
  components: { DashboardButton, InfoBox },
};
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

main {
  display: block;
  background-color: white;
}

#header {
  min-height: 10vh;
}

#leftheader {
  /* background-color: rgba(255, 255, 240, 0.345); */
  width: 10%;
  margin-right: 2vh;
}

#middleheader {
  /* background-color: rgba(230, 230, 250, 0.441); */
  width: 60%;
  padding-top: 25px;
  padding-left: 25px;
  font-size: 55px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 72px;
  text-transform: uppercase;
}

#rightheader {
  /* background-color: rgba(211, 211, 211, 0.283); */
  width: 30%;
  margin-left: 2vh;
}

#menu {
  width: 10%;
  min-height: 100vh;
  margin-top: 2vh;
  border-radius: 0px 40px;
  margin-right: 2vh;
  // border-style: dotted;
  border-width: 2px;
  background-color: rgba(250, 98, 33, 0.504);
}

#mainControl {
  width: 60%;
  min-height: 100vh;
  margin-top: 2vh;
  border-radius: 40px;
  // border-style: dotted;
  border-width: 2px;
}

#newsfeed {
  width: 30%;
  min-height: 100vh;
  margin-top: 2vh;
  border-radius: 40px 0px;
  margin-left: 2vh;
  // border-style: dotted;
  border-width: 2px;
  background-color: rgba(245, 245, 245, 0.379);
  padding: 4vh 4vh;
  
}

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
