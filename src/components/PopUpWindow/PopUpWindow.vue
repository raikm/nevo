<template>
  <div>
    <div class="pop-up-window-wrapper">
      <div
        class="pop-up-window"
        :style="{ width: windowWidth + 'vw', height: 'auto' }"
      >
        <div class="pop-up-window-header">
          <div @click="leftEvent" class="pop-up-header-left-action">
            {{ leftInfo }}
          </div>

          <h1 class="pop-up-header-title">{{ popupTitle }}</h1>
          <div class="pop-up-header-right-action">{{ rightInfo }}</div>
        </div>

        <div class="pop-up-window-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopUpWindow",
  props: [
    "windowWidth",
    "windowHeight",
    "popupTitle",
    "content",
    "leftInfo",
    "rightInfo",
  ],
  data() {
    return {
      child: "content",
    };
  },
  methods: {
    leftEvent() {
      this.$emit("leftEvent");
      // console.log();
    },
  },
};
</script>

<style lang="scss" scoped>

.pop-up-window-wrapper {
  display: flex;
  justify-content: center;
  align-content: center;
}

.pop-up-window {
  position: absolute;
  top: 15%;
  background: $main-light-gray;
  box-shadow: 10px 10px 60px #555;
  animation: fadeIn 0.4s ease-in both;
  // backdrop-filter: blur(10px) contrast(.98);
  border-radius: $standard-border-radius;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate3d(0, -20%, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.pop-up-window-header {
  padding: $standard-space $standard-space * 2;
  width: 100%;
  height: auto;
  border-radius: $standard-border-radius $standard-border-radius 0 0;
  background-color: white;
  border: solid;
  border-color: gray;
  border-width: 0 0 0 0;
  display: grid;
  grid-template-columns: 20% 60% 20%;

  .pop-up-header-left-action,
  .pop-up-header-right-action {
    align-self: center;
    font-size: $standard-text-medium;
  }

  .pop-up-header-left-action {
    justify-self: left;
  }

  .pop-up-header-title {
    font-size: $standard-text-medium;
    font-weight: 600;
    justify-self: center;
    align-self: center;
  }

  .pop-up-header-right-action {
    justify-self: right;
  }
}

.pop-up-window-body {
  padding: $standard-space 0;
  width: 100%;
  height: 100%;
}
</style>
