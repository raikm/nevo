<template>
	<div class="box-xs-wrapper room-light-controller-wrapper">
		<div
			class="roomlight-button"
			:key="room.entity_id"
			v-for="room in homerooms"
			@click="triggerGroupState(room.entity_id, room.state)"
		>
			<div v-if="room.state == 'on'">💡</div>
			<div v-else-if="room.state == 'off'">⭕️</div>
			<div v-else-if="room.state == 'unavailable'">🚧</div>
			<span class="room-name">{{ room.attributes.friendly_name }}</span>
		</div>
	</div>
</template>

<script lang="ts">

import { computed, defineComponent } from "vue";
import store from '../../../store';
import { Homeroom } from "../../../types/homeroom";

export default defineComponent({
	setup() {

		const triggerGroupState = (entity_id: string, state: string) => {
			if (state === "unavailable") return;
			let service = state == "on" ? "turn_off" : "turn_on";
			let domain = entity_id.split(".")[0];
			store.state.haConnection.sendMessagePromise({
				type: "call_service",
				domain: domain,
				service: service,
				service_data: {
					entity_id: entity_id,
				},
			});

		}

		return {
			// access a state in computed function
			homerooms: computed(() => store.getters.homerooms as Homeroom[]),
			triggerGroupState
		}
	}
});
</script>

<style lang="scss">
.room-light-controller-wrapper {
	display: grid;
	//visible covers:
	grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
	grid-auto-flow: column;
	//hidden covers:
	// grid-auto-columns: minmax(110px, 1fr);
	// grid-template-rows: minmax(110px, 1fr);
	overflow-x: scroll;
	// max-width: 100%;
	-webkit-overflow-scrolling: touch;
	&::-webkit-scrollbar {
		display: none;
	}
	align-content: flex-end;
}

.roomlight-button {
	height: 60px;
	width: 100px;
	border-radius: 12px;
	// background: gray;
	display: grid;
	grid-template-rows: 4fr 1fr;
	padding: 10px;

	box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
	transition: all 0.3s ease 0s;
	cursor: pointer;
}

.roomlight-button-on {
}

.room-name {
	font-size: small;
}
</style>
