<template>
 <DayForecast :style="{ backgroundImage: this.backgroundImage }" v-if="Object.keys(weatherForecast).length !== 0" class="forecast" :weatherForecast="weatherForecast" />
</template>

<script lang="ts">
	import DayForecast from "./DayForecast.vue";

	import { defineComponent } from "vue";
	import { Config } from "../../../types/config.interface";
    import {Weatherforecast} from "../../../types/weatherforecast.interface"

	export default defineComponent({
		  components: { DayForecast },
		created() {
			this.weatherForecastDataFromAPI();
		},
		data() {
			return {
				weatherForecast: {} as Weatherforecast,
				backgroundImage: "linear-gradient(-150deg, #7de2fc 0%, #b6bee5 100%)",
			};
		},
		methods: {
			weatherForecastDataFromAPI() {
				const config = this.$store.state.config as Config;
				const { api_key, open_weather_url } = config.weather;

				this.axios
					.get(`${open_weather_url}&appid=${api_key}`, {})
					.then((response: any) => {
						this.weatherForecast = response.data;
						this.defineBackground();
					})
					.catch((error: any) => {
						console.log(error.message);
					});
			},
			defineBackground() {
				const sunset = new Date(this.weatherForecast.daily[0].sunset);
				const sunsetInMinutes = sunset.getHours() * 60 + sunset.getMinutes();
				const now = new Date();
				const nowInMinutes = now.getHours() * 60 + now.getMinutes();
				//DAY
				if (sunsetInMinutes > nowInMinutes) {
					switch (this.weatherForecast.current.weather[0].main) {
						case "Snow":
							this.backgroundImage =
								"linear-gradient(-150deg, #045d73 0%, #676b82 100%)";
							break;
						case "Rain":
							this.backgroundImage =
								"linear-gradient(-150deg, #045d73 0%, #676b82 100%)";
							break;
						default:
							this.backgroundImage =
								"linear-gradient(-150deg, #5ea5c9 100%, #2374bb 0%)";
							break;
					}
				}
				//NIGHT
				else {
					this.backgroundImage =
						"linear-gradient(-150deg, #045d73 0%, #676b82 100%)";
				}
			},
		},
	});
</script>

<style lang="scss">
	@import "../../../styles/panoramaVariables.scss";

	.forecast {
		height: 100%;
	}

	#weather-header {
		// background-color: chartreuse;
		height: 20%;
		display: grid;
		color: white;
		grid-template-columns: 4fr 1fr;
		#weather-icon {
			height: 100%;
			justify-self: right;
		}
	}

	#temperature-info-overview {
		// background-color: red;
		height: 40%;
		display: grid;
		color: white;
		grid-template-columns: 2fr 4fr;
		#temperature-outdoor-info {
			font-size: $standard-text-big;
		}
		#weather-description {
			text-align: right;
			font-size: $standard-text-small;
			display: grid;
			grid-template-rows: 0.5fr 1fr;
		}
	}

	#temperature-hour-info {
		// background-color: blue;
		height: 40%;
		display: grid;
		color: white;
		grid-template-columns: repeat(6, 1fr);
		column-gap: 15px;
		.temperature-hour-content {
			// text-align: center;
			display: grid;
			grid-template-rows: 13px 25px 13px;

			// justify-items: center;
			align-items: center;

			.weather-hour {
				font-size: $standard-text-small;
				opacity: 80%;
				justify-self: center;
			}
			.weather-icon-wrapper {
				width: 100%;
                height: 100%;
			}

			.weather-hour-icon {
				fill: white;
			}

			.weather-hour-temperature {
				font-size: $standard-text-small;
				font-weight: 700;
				justify-self: center;
			}
		}
	}
</style>
