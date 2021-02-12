<template>
  <div>
    <div class="pop-up-window-wrapper">
      <div class="pop-up-window" :style="{ width: windowWidth + 'vw' }">
        <div class="pop-up-window-header">
          <div class="pop-up-header-left-action">Cancel</div>

          <h1 class="pop-up-header-title">{{ popupTitle }}</h1>
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
  props: ["windowWidth", "windowHeight", "popupTitle", "content"],
  data() {
    return {
      child: "content",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/main-style";
@import "../../style/main-colors";

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

  // backdrop-filter: blur(10px) contrast(.98);

  border-radius: $standard-border-radius;
}

.pop-up-window-header {
  padding: 1rem;
  width: 100%;
  height: 5rem;
  border-radius: $standard-border-radius $standard-border-radius 0 0;
  background-color: white;
  border: solid;
  border-color: gray;
  border-width: 0 0 1px 0;
  display: grid;
  grid-template-columns: 20% 60% 20%;

  .pop-up-header-left-action {
    justify-self: left;
    align-self: center;
    font-size: $standard-text-medium;
  }

  .pop-up-header-title {
    font-size: $standard-text-medium;
    font-weight: 600;
    justify-self: center;
    align-self: center;
  }
}

.pop-up-window-body {
  padding: 1rem;
  width: 100%;
  height: 35vh;
}
</style>
