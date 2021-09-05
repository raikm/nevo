<template>
	<div>
		<div class="main-info-title" id="weather-header">
			<div id="weather-city-name">Berlin</div>

			<!-- :style="{
          fill: currentWeatherIconColor(currentWeather.weather[0].main),
        }" -->
			<div class="current-weather-icon-wrapper">
				<component class="current-weather-icon" :is="weatherIcon(currentWeather.weather[0])"></component>
			</div>
		</div>
		<div id="temperature-info-overview">
			<span id="temperature-outdoor-info"
				>{{ Math.round(currentWeather.temp) }}°</span
			>
			<div id="weather-description">
				<span>{{ currentWeather.weather[0].main }}</span>
				<span
					>H: {{ Math.round(todayForecast.temp.max) }}° L:
					{{ Math.round(todayForecast.temp.min) }}°
				</span>
			</div>
		</div>
		<div id="temperature-hour-info">
			<div
				class="temperature-hour-content"
				:key="tempHourInfo + index"
				v-for="(tempHourInfo, index) in tempHourInfos"
			>
				<div class="weather-hour">
					{{
						new Date(
							currentHour.setHours(currentHour.getHours() + 1)
						).getHours()
					}}
				</div>
				<div class="weather-icon-wrapper">
					<component class="current-weather-icon" :is="weatherIcon(tempHourInfo.weather[0])"></component>
				</div>
				<div class="weather-hour-temperature">
					{{ Math.round(tempHourInfo.temp) }}°
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import colors from "../../../styles/panoramaVariables.scss";
	import ClearIcon from "../../../assets/icons/weather_clear.svg";
	import CloudsIcon from "../../../assets/icons/weather_clouds.svg";
	import RainIcon from "../../../assets/icons/weather_rain.svg";
	import ThunderstormIcon from "../../../assets/icons/weather_thunderstorm.svg";

	import {
		Weatherforecast,
		CurrentWeather,
		Daily,
		Description,
	} from "../../../types/weatherforecast.interface";
	import { defineComponent, PropType } from "vue";

	export default defineComponent({
		components: {
			ClearIcon,
			CloudsIcon,
			RainIcon,
			ThunderstormIcon
		},
		props: {
			weatherForecast: {
				type: Object as PropType<Weatherforecast>,
				required: true,
			},
		},
		data() {
			return {
				tempHourInfos: [] as CurrentWeather[],
				currentWeather: {} as CurrentWeather,
				todayForecast: {} as Daily,
				currentHour: new Date(),
			};
		},
		created() {
			this.setup6HoursForecast();
		},
		methods: {
					weatherIcon(weather: object): string {
				return `${weather.main}Icon`;
			},
			setup6HoursForecast() {
				this.currentWeather = this.weatherForecast.current;
				this.todayForecast = this.weatherForecast.daily[0];
				let _weatherHour = Object.values(this.weatherForecast.hourly);

				this.tempHourInfos = _weatherHour.slice(0, 6).filter((hour) => {
					return hour;
				});
			},
			// TODO
			currentWeatherIconColor(weatherDescription: Description) {
				switch (weatherDescription) {
					case Description.ClearSky:
						return colors.mainYellow;
					default:
						return colors.mainLightGray;
				}
			},
		},
	});
</script>

<style lang="scss">
	.current-weather-icon-wrapper,
	weather-icon-wrapper {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

.current-weather-icon-wrapper{
	display: grid;;
	justify-content: right;
}
	.weather-icon-wrapper{
		justify-self: center;
		display: grid;
		justify-content: center;
		justify-items: center;
	}

	.current-weather-icon-wrapper > svg {
		margin: 5% 0;
		width: 90%;
		height: 90%;
		fill: lightgray;
	}

	.weather-icon-wrapper > svg {
		margin: 10% 0;
		width: 80%;
		height: 80%;
		fill: lightgray;
		
	}
</style>
