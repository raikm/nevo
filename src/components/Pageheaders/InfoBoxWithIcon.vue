<template>
  <div class="header-info-box">
    <div class="header-info-box-icon-frame">
      <svgicon
        class="header-info-box-icon"
        :icon="iconName"
        width="100%"
        height="100%"
      ></svgicon>
    </div>
    <div class="header-info-box-value">{{ headerValue }}</div>
  </div>
</template>

<script>
export default {
  props: ["iconName", "headerValue"],
};
</script>

<style lang="scss">
.header-info-box {
  display: flex;
  height: 2rem;
  background-color: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(10px);
  border-width: 0;
  border-radius: 10px;
  border-style: solid;
  padding: 0.5rem;
}

.header-info-box-icon-frame {
  
  
  
  
  width: 1rem;
  height: 1rem;
  display: inline-flex;
}

.header-info-box-icon {
  display: block;

//   margin: auto;
}

.header-info-box-value {
  display: grid;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-self: center;
  margin: auto;
  font-size: 80%;
  height: 1rem;
  margin-left: .5rem;
  font-weight: 600;
}
</style>
