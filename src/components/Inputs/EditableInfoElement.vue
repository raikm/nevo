<template>
  <div class="info-element">
    <div class="lable-name">{{ lableName }}</div>
    <input
      class="input-element"
      type="text"
      v-bind:value="infotext"
      v-on:input="$emit('input', $event.target.value)"
      :readonly="readonly"
      :style="[
        readonly === true
          ? { color: colors.mainGray }
          : { color: colors.textColor },
      ]"
    />
  </div>
</template>

<script>
import colors from "@/style/main-colors.scss";

export default {
  props: ["lableName", "infotext", "askForVerify", "readonly"],
  mounted() {
    this.readonly = true;
  },
  methods: {
    //@blur="onFocusOut"
    // onFocusOut(e){
    //   if (this.readonly === true) return;
    //   this.showToastInfo("lost focus")
    //     console.log(e.target.value)
    // }
  },
  data() {
    return {
      colors: colors
    }
  }
};
</script>

<style lang="scss"></style>
