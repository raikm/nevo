<template>
	<div class="homeclimate-wrapper">
		<div :key="index" v-for="(sensors, index) in rooms" class="box-xs temperature-box">
			<div class="homeclimate-info-title">{{ sensors[0].attributes.Room }}</div>
			<div class="homeclimate-info">{{ currentTemperature(sensors) }}</div>

			<div class="homeclimate-info">{{ currentHumidity(sensors) }}</div>

			<div class="homeclimate-info">{{ currentWindStrength(sensors) }}</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { Sensor } from "../../../types/haEntities.interface";

export default defineComponent({
	created() {
		// this.setCurrentTemperature();
		// this.setCurrentHumidity();
	},
	computed: {
		...mapGetters(["homeclimateSensors"]),
	},
	watch: {
		homeclimateSensors() {
			this.grouphomeclimateSensors();
		},
	},
	methods: {
		grouphomeclimateSensors(): any {
			const groups = this.homeclimateSensors.reduce(
				(groups: any, item: any) => {
					const group = groups[item.attributes.Room] || [];
					group.push(item);
					groups[item.attributes.Room] = group;
					return groups;
				},
				{}
			);
			this.rooms = groups;
		},
		currentTemperature(sensors: Sensor[]) {
			let temperatureSensor = sensors.filter((s: Sensor) => {
				return s.attributes.sensor_class === "temperature";
			});
			if (temperatureSensor.length === 1) {
				return `${temperatureSensor[0].state}°C`;
			}
		},
		currentHumidity(sensors: Sensor[]) {
			let humiditySensor = sensors.filter((s: Sensor) => {
				return s.attributes.sensor_class === "humidity";
			});
			if (humiditySensor.length === 1) {
				return `${humiditySensor[0].state}${humiditySensor[0].attributes.unit_of_measurement}`;
			}
		},
		currentWindStrength(sensors: Sensor[]) {
			let windSensor = sensors.filter((s: Sensor) => {
				return s.attributes.sensor_class === "wind_strength";
			});
			if (windSensor.length === 1) {
				return `${windSensor[0].state}${windSensor[0].attributes.unit_of_measurement}`;
			}
		},
	},
	data() {
		return {
			rooms: [],
		};
	},
});
</script>

<style lang="scss">
@import "../../../styles/panoramastyle.scss";

.homeclimate-wrapper {
	// Bug: so war just quick fix
	height: 100%;
	width: 350px !important;
	display: flex;
	column-gap: 15px;
	row-gap: 15px;
	flex-wrap: wrap;
}
.temperature-box {
	border-radius: $standard-border-radius;
	background-color: white;
	padding: 15px 5px;
	height: 100%;
}
.homeclimate-info-title {
	font-size: $standard-text-small;
}
.homeclimate-info {
	padding: 5px 0;
	font-size: $standard-text-medium;
	color: $black;
}
</style>
