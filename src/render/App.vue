<template>

	<div id="header">
		<!-- logo / icon -->
		<!-- Show People at home -->
		<!-- Show Date and Time -->
	</div>
	<div id="main">
		<Menu />
		<router-view></router-view>
	</div>
	<div id="footer"></div>
</template>

<script lang="ts">
	import Menu from "@/components/menu/index.vue";
	import { defineComponent } from "vue";
	import config from "../../config.json";
	export default defineComponent({
		components: { Menu },
		async created(){
			this.$store.commit("setConfigFile", config)
		}
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
</style>