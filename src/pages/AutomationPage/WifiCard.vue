<template>
    <div class="basic-card" id="wifi-card">
        <h1 class="" >WiFi</h1>
        <div id="download-line"><span class="wifi-value">25</span><span>Mbit</span></div>
        <div id="upload-line"><span class="wifi-value">5</span><span>MBit</span></div>
        

    </div>
</template>

<script>
export default {
    name:"WifiCard"
}
</script>

<style lang="scss">
.wifi-value{
    font-size: xx-large;
    margin-right: 2%;
}
</style>