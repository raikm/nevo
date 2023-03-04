<template>
  <div class="settings-container">
    <div class="menu box-white menu-container">
      <div class="menu-link">
        <NuxtLink :to="{ path: '/settings/calendar' }"> Calendar </NuxtLink>
      </div>
      <div class="menu-link">
        <NuxtLink :to="{ path: '/settings/publicTransport' }"> Public Transport </NuxtLink>
      </div>
      <div class="menu-link">
        <NuxtLink :to="{ path: '/settings/plants' }"> Plants </NuxtLink>
      </div>
    </div>
    <div class="menu box-white details">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
@import '../../../packages/style/variables.scss';

.menu {
  border-radius: $standard-border-radius;
  padding: 15px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
}

.settings-container {
  display: grid;
  grid-template-columns: 20% auto;
  gap: 1rem;
}

.details {
  background-color: rgb(236, 236, 236);
}

.menu-container > div {
  // border-bottom: 1px solid lightgray;
  padding-left: 15px;
  height: 4vh;
}

.menu-link {
  display: grid;
  align-content: center;
}

.menu-link:hover {
  background-color: rgba(202, 173, 230, 0.309);
  border-radius: 10px;
}

// .menu-container > div:last-child {
//   border: none;
// }
.menu-link {
  a {
    color: black;
    text-decoration: none;
  }
}
</style>
