<template>
  <main>
    <div id="header" class="columns">
      <div id="leftheader" class="column"></div>
      <div id="middleheader" column="column"><h1>DASHBOARD</h1></div>
      <div id="rightheader" column="column"></div>
    </div>
    <div class="columns">
      <div id="menu" class="column"></div>
      <div id="mainControl" column="column"></div>
      <div id="newsfeed" column="column"></div>
    </div>
  </main>
</template>

<style>


main {
  display: block;
}

#header {
  min-height: 10vh;
}

#leftheader {
  background-color: rgba(255, 255, 240, 0.345);
  width: 15%;
  margin-right: 2vh;
}

#middleheader {
  background-color: rgba(230, 230, 250, 0.441);
  width: 55%;
  padding-top: 25px;
  padding-left: 25px;
  font-size: 50px;
  font-family: 'Raleway',sans-serif;
  font-weight: 800;
  line-height: 72px;
  text-transform: uppercase;
}

#rightheader {
  background-color: rgba(211, 211, 211, 0.283);
  width: 30%;
  margin-left: 2vh;
}

#menu {
  width: 15%;
  min-height: 100vh;
  margin-top: 2vh;
  border-radius: 0px 40px;
  margin-right: 2vh;
  border-style: dotted;
  border-width: 2px;
}

#mainControl {
  width: 55%;
  min-height: 100vh;
  margin-top: 2vh;
  border-radius: 40px;
  border-style: dotted;
  border-width: 2px;
}

#newsfeed {
  width: 30%;
  min-height: 100vh;
  margin-top: 2vh;
  border-radius: 40px 0px;
  margin-left: 2vh;
  border-style: dotted;
  border-width: 2px;
}
</style>
