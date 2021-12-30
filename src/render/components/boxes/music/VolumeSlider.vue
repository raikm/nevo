<template>
    <div class="slider" aria-valuemin="0" aria-valuemax="1" aria-valuetext="0" aria-valuenow="0">
        <input type="range" min="0" max="100" v-model="sliderValue" step="1" />
        <progress min="0" max="100" :value="sliderValue" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        sliderValue: {
            type: Number,
            required: true,
        },
    },
    setup() {


        return {}
    }
})
</script>

<style lang="scss" scoped>
.slider {
    display: grid;
    align-items: center;
    width: 100%;
}

progress {
    -webkit-appearance: none;
    appearance: none;
    // position: absolute;
    // display: block;
    margin: 0;
    // top: 13px;
    // left: 13px;
    width: 100%;
    height: 3px;
    z-index: -1;
    background-color: #b6b6b6;
}

progress::-webkit-progress-value {
    background-color: #4168d2;
}

progress::-webkit-progress-bar {
    background-color: #b6b6b6;
    border-radius: 1.5px;
    overflow: hidden;
}

input {
    -webkit-appearance: none;
    appearance: none;
    touch-action: pan-y;
    position: absolute;
    margin: 0;
    padding: 0;
    width: 92%;
    background-color: transparent;
}

input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 28px;
    width: 28px;
    border: none;
    border-radius: 50%;
    background-color: rgb(241, 241, 241);
    z-index: 2;
    box-shadow: var(--thumb-shadow);
}
</style>