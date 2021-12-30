<template>
	<div id="header">
		<!-- logo / icon -->
		<!-- Show People at home -->
		<!-- Show Date and Time -->
	</div>
	<div id="main">
		<Menu />
		<router-view class="content-container"></router-view>
	</div>
	<div id="footer"></div>
</template>

<script lang="ts">
// Components
import Menu from "@/components/menu/index.vue";
// Websockets
import {
	createConnection,
	// subscribeServices,	
createLongLivedTokenAuth, subscribeEntities
} from "home-assistant-js-websocket";
import { defineComponent } from "vue";
// Config
import config from "../../config.json";

export default defineComponent({
	components: { Menu },
	created() {
		this.$store.commit("setConfigFile", config);
		this.createHomeassistantWebsocketConnection();
	},
	methods: {
		async createHomeassistantWebsocketConnection() {
			const auth = createLongLivedTokenAuth(
				config.homeassistant.hassUrl,
				config.homeassistant.life_time_token_raik
			);
			let connection = await createConnection({ auth });
			subscribeEntities(connection, (entities) => {
				this.$store.commit("setHaEntities", entities);
			});
			this.$store.commit("setHaConnection", connection);
		},
	},
});
</script>

<style lang="scss">
#app {
	display: grid;
	grid-template-rows: 10% 85% 5%;
	height: 100%;
}
#header {
	// background: black;
}
#main {
	display: grid;
	grid-template-columns: 1fr 9fr;
	padding: 15px;
}
#footer {
	// background: black;
}

.content-container {
	overflow-y: auto;
}
</style>