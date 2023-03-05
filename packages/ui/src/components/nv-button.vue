<template>
  <button :class="{ 'hover-button': hoverable, 'standard-button': !hoverable }">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
defineProps({
  hoverable: { type: Boolean, required: false, default: false }
})
</script>

<!-- TODO: class={"hoverable == true ? 'hover-button' : 'standard-button'"} -->
<style lang="scss">
.standard-button {
  display: grid;
  place-items: center;
  border-radius: 6px;
  border-style: none;
  background-color: white;
  padding: 5px 10px;
  font-weight: bold;
  font-size: 0.8rem;
  color: #9604ff8a;

  // for links ins buttons
  a {
    text-decoration: none;
    color: #9604ff8a;
  }
}

.standard-button:hover {
  background-color: rgb(245, 220, 243);
}

button:focus,
button:focus-visible {
  outline: 0px auto -webkit-focus-ring-color;
}

.hover-button {
  background-color: rgba(255, 255, 255, 0.5);
  height: 3vh;
  width: 3vh;
  display: grid;
  place-items: center;
  border-width: 0;
  border-style: solid;
  border-radius: 5px;
  overflow: hidden;
}

.hover-button:hover {
  background-color: rgb(255, 255, 255);
  cursor: none;
  // TODO ZOOM
}

@media (prefers-color-scheme: light) {
  .standard-button {
    background-color: rgb(244, 244, 242);
  }
}
</style>
