<template>
    <div class="music-wrapper">
        <div class="music-main">
            <template v-if="musicPlaying">
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
</style>