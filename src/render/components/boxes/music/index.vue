<template>
    <div class="music-wrapper">
        <div class="music-main">
            <template v-if="!musicPlaying">
                <Player />
            </template>
            <template v-else>
                <Shortcuts></Shortcuts>
            </template>
        </div>
        <div class="music-footer"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Player from './Player.vue';
import Shortcuts from './Shortcuts.vue';
export default defineComponent({
    components: { Player, Shortcuts },
    setup() {
        let musicPlaying = ref(true);

        return {
            musicPlaying
        }
    }
})
</script>

<style lang="scss">
.music-main {
    height: 100%;
}

.player-wrapper {
    height: 100%;
}

#volume-control::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-touch-appearance: none;
    width: 0px;
    // color: #fff;
    //  border: 0 !important;
    //  background-color:#fff !important;
    background-color: #fff;
    box-shadow: -100vw 0 0 100vw #ffffff;
    cursor: none;
}
.music-control-box {
    height: 100%;
    width: 100%;
    display: grid;
}
#music-control {
    height: 100%;
    width: 100%;
    overflow: hidden;
}
</style>