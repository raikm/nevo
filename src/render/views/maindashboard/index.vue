<template>
	<div>
		<div id="boxes">
			<WeatherBox class="box dashboard-box box-s" />
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import WeatherBox from "../../components/boxes/weather/index.vue";
	export default defineComponent({
		components: { WeatherBox },
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