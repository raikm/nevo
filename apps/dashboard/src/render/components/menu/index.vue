<template>
  <div id="menu-pills">
    <div @click="router.push('/')" class="menu-button-new click-element active">
      <span>Dashboard</span>
    </div>
    <div @click="router.push('/roomdashboard')" class="menu-button-new click-element">
      <span>Rooms</span>
    </div>
    <div @click="router.push('/plantdashboard')" class="menu-button-new click-element">
      <span>Plants</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style lang="scss">
@import "../../../../../../libs/style/mainstyle.scss",
  "../../../../../../libs/style/variables.scss";

#menu-pills {
  width: 100%;
  display: inline-flex;
  overflow: scroll;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  column-gap: $standard-space;
  margin: $standard-space * 2;

  .menu-button-new {
    margin: 1rem 1px;
    border-radius: 99px;
    height: 2rem;
    display: grid;
    place-items: center;
    font-size: 0.8rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    backdrop-filter: saturate(130%) blur(20px);
    background-color: rgb(244, 244, 244);
  }

  .active {
    background-color: white;
  }
}

$inactive-color: $gray;

.active {
  animation: bounce-in 0.5s;
}

@keyframes bounce-in {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.98);
  }
}

.menu-button {
  background-color: rgba(255, 255, 255, 1);
  backdrop-filter: blur(10px);
  border-color: rgb(243, 244, 254);
  border-style: solid;
  border-radius: $standard-border-radius;
  border-width: 0;
  height: 60px;
  width: 60px;
  margin-bottom: $standard-space;
}

div.menu-button > svg {
  margin: 10%;
  width: 80%;
  height: 80%;
}

.menu-button:hover {
  transform: scale(0.98);
}

.menu-icon {
  margin: 12%;
  width: 78%;
  height: 78%;
}
.dashboard-icon {
  margin: 15%;
  width: 70%;
  height: 70%;
  .box-1 {
    fill: $inactive-color;
  }
  .box-2 {
    fill: $inactive-color;
  }
}

.dashboard-icon.active,
.dashboard-icon:hover {
  .box-1 {
    fill: $orange;
  }
  .box-2 {
    fill: $orange-2;
  }
}
.lamp-icon {
  $light-color: transparent;
  .lampcable {
    fill: $inactive-color;
  }
  .lampshade-holder {
    fill: $inactive-color;
  }
  .lampshade {
    fill: $inactive-color;
  }
  .lampshade-shadow {
    fill: $inactive-color;
  }
  .light {
    fill: $light-color;
  }
  .light-shine {
    fill: $light-color;
  }
}

.lamp-icon.active,
.lamp-icon:hover {
  $light-color: $orange;
  $light-color-2: $orange-2;
  .lampcable {
    fill: #465a61;
  }
  .lampshade-holder {
    fill: #596c76;
  }
  .lampshade {
    fill: #7a8c98;
  }
  .lampshade-shadow {
    fill: #596c76;
  }
  .light {
    fill: $light-color;
  }
  .light-shine {
    fill: $light-color-2;
  }
}

.plant-icon {
  fill: $inactive-color;
  // margin-left: 12%;
  // margin-right: 8%;
}
.plant-icon.active,
.plant-icon:hover {
  fill: #639a67;
}

// .device-icon {
//   fill: $inactive-color;
//   margin-left: 17%;
//   margin-right: 3%;
// }

// .device-icon.active,
// .device-icon:hover {
//   fill: $yellow-2;
// }

.package-icon {
  stroke: $inactive-color;
  stroke-width: 0.4em;
  fill: none;
  .package-tape,
  .package-stripes {
    fill: $inactive-color;
  }
}

.package-icon.active,
.package-icon:hover {
  stroke: transparent;
  stroke-width: 0;
  $package-color: $yellow;
  $package-second-color: $yellow-2;
  .package-top {
    fill: $package-color;
  }
  .package-tape {
    fill: #ff8087;
  }
  .package-stripes {
    fill: #fff6d8;
  }

  .package-right-front {
    fill: $package-color;
  }
  .package-left-front {
    fill: $package-second-color;
  }
}

.calendar-icon {
  #calendar-day {
    color: $inactive-color;
    font-weight: 500;
  }
  #calendar-date {
    height: 70%;
    // line-height: 90%;
    font-size: 2.8vh;
    line-height: 3vh;
    top: -50%;
  }
}

.calendar-icon.active,
.calendar-icon:hover {
  #calendar-day {
    color: $red;
  }
}
.automation-icon {
  fill: $inactive-color;
  .automation-ball,
  .automation-ball-2,
  .automation-arrow {
    stroke: $inactive-color;
    stroke-width: 0.05em;
  }
}

.automation-icon.active {
  stroke: transparent;
  stroke-width: 0;
  .automation-ball {
    fill: $yellow;
  }
  .automation-ball-2 {
    fill: $orange;
  }
  .automation-ball-shadow {
    fill: $yellow-2;
  }
  .automation-ball-2-shadow {
    fill: $orange-2;
  }
  .automation-arrow {
    fill: #465a61;
  }
}

#package-menu-button {
  padding: 3%;
}

.settings-icon {
  fill: $inactive-color;
  .big-gear-ring {
    fill: rgb(209, 209, 209);
  }
  .small-gear-main {
    fill: rgb(209, 209, 209);
  }
  .small-gear-ring {
    fill: $inactive-color;
  }
}

.settings-icon.active,
.settings-icon:hover {
  fill: #3c6eaa;
  .big-gear-ring {
    fill: #3c6eaa;
  }
  .big-gear-ring {
    fill: #ffcb39;
  }
  .big-gear-ring-shadow {
    fill: #efb82e;
  }
  .small-gear-shadow {
    fill: #365889;
  }
  .small-gear-main {
    fill: #4e8ad1;
  }
  .small-gear-ring {
    fill: #efeadd;
  }
}

.service-info {
  display: grid;
  justify-content: center;
  align-content: center;
  height: 100%;
  color: $gray;
  text-align: center;
}
</style>
