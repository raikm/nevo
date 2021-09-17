<template>
	<div>
		<div id="boxes">
			<HomeClimate class="dashboard-box box-s" />
			<WeatherBox class="box dashboard-box box-s" />
			<PublicTransport class="box dashboard-box box-s box-white" />
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import WeatherBox from "../../components/boxes/weather/index.vue";
	import HomeClimate from "../../components/boxes/homeclimate/index.vue";
	import PublicTransport from "../../components/boxes/publictransport/index.vue";
	export default defineComponent({
		components: { WeatherBox, HomeClimate, PublicTransport },
	});
</script>

<style lang="scss" scoped>
	#boxes {
		display: flex;
		column-gap: 15px;
		row-gap: 15px;
		flex-wrap: wrap;
	}
</style>