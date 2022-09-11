<template>
  <div id="dashboard-wrapper">
    <div id="boxes">
      <HomeClimate class="dashboard-box" />
      <WeatherBox class="box dashboard-box box-s" />
      <RoomLightController class="box dashboard-box box-s box-white" />
      <PublicTransport class="box dashboard-box box-m box-white" />
      <Calendar class="box dashboard-box box-m box-white" />
      <Music class="box dashboard-box box-m box-white" />
    </div>
    <div id="shortcuts">
      <Shortcut :shortcut="shortcut" v-for="shortcut in $store.getters.shortcutEntities" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios'
import qs from 'qs'
import Calendar from '../../components/boxes/calendar/index.vue'
import HomeClimate from '../../components/boxes/homeclimate/index.vue'
import Music from '../../components/boxes/music/index.vue'
import PublicTransport from '../../components/boxes/publictransport/index.vue'
import RoomLightController from '../../components/boxes/roomlightcontroller/index.vue'
import WeatherBox from '../../components/boxes/weather/index.vue'
import Shortcut from '../../components/Shortcut.vue'
import store from '../../store'

const handleSpotifyRedirect = () => {
  let code = getCode()
  if (code) authSpotifyAccount(code)
}
const getCode = () => {
  let code = null
  const queryString = window.location.search
  if (queryString.length > 0) {
    const urlParams = new URLSearchParams(queryString)
    code = urlParams.get('code')
  }
  return code
}

const authSpotifyAccount = (code: string) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    auth: {
      username: store.state.config.spotify.client_id,
      password: store.state.config.spotify.client_secret
    }
  }
  const data = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: encodeURI(window.location.origin + '/'),
    client_id: store.state.config.spotify.client_id,
    client_secret: store.state.config.spotify.client_secret
  }
  if (store.state.spotifyAccessToken == '') {
    axios
      .post('https://accounts.spotify.com/api/token', qs.stringify(data), headers)
      .then((response) => {
        if (store.state.spotifyAccessToken.length === 0) {
          if (response.data.access_token != undefined) {
            let access_token = response.data.access_token
            localStorage.setItem('spotify_access_token', access_token)
          }
          if (response.data.refresh_token != undefined) {
            let refresh_token = response.data.refresh_token
            localStorage.setItem('spotify_refresh_token', refresh_token)
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

if (window.location.search.length > 0) {
  // console.log("handleRedirect")

  handleSpotifyRedirect()
}
</script>

<style lang="scss" scoped>
@import '../../../../../../libs/style/mainstyle.scss';

#dashboard-wrapper {
  max-width: calc(320px * 3 + 8rem);
  position: relative;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

#dashboard-wrapper::-webkit-scrollbar {
  display: none;
}

#boxes {
  display: grid;
  column-gap: 1rem;
  row-gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr;
  flex-wrap: wrap;
}

#shortcuts {
  position: absolute;
  bottom: 0px;
  width: 100%;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  display: inline-flex;
  overflow: scroll;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  column-gap: $standard-space;
}

#shortcuts::-webkit-scrollbar {
  display: none;
}
</style>
