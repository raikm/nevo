<template>
  <div>
    <div class="main-info-header">
      <img class="main-info-icon" src="../../../public/img/icons/spotify.svg" />
      <h1 class="main-info-title" id="public-transport-header">
        Musik
      </h1>
    </div>
    <div class="main-playlist-shortcuts">
      <div class="columns">
        <div class="column is-paddingless">
          <div
            class="playlist-shortcuts"
            :key="playlist.id"
            v-for="playlist in playlists.slice(3, 6)"
          >
            <button class="playlist-button">{{ playlist.name }}</button>
          </div>
        </div>
        <div class="column is-paddingless">
          <div
            class="playlist-shortcuts"
            :key="playlist.id"
            v-for="playlist in playlists.slice(0, 3)"
          >
            <button class="playlist-button">{{ playlist.name }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MusicPlayerController",
  data() {
    return {
      playlists: [
        {
          id: 1,
          name: "Coffee",
          cover: "./link",
        },
        {
          id: 2,
          name: "Morning",
          cover: "./link",
        },
        {
          id: 3,
          name: "Cooking",
          cover: "./link",
        },
        {
          id: 4,
          name: "Guests",
          cover: "./link",
        },
        {
          id: 5,
          name: "Up",
          cover: "./link",
        },
        {
          id: 6,
          name: "Hip Hop",
          cover: "./link",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.playlist-name {
  padding-left: 0.5vh;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 55%;
}

.main-playlist-shortcuts {
  // background: yellow;
  // overflow: hidden;
  height: 100%;
  padding: 2vh 2%;
}

.playlist-shortcuts {
  text-align: center;
  width: 100%;
  padding: 0.1vh;
}

.playlist-button {
  height: 4vh;
  width: 100%;
}
</style>
