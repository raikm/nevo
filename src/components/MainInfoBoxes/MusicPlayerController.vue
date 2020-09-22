<template>
  <div>
    <div class="main-info-header">
      <div class="main-info-icon-container">
         <svgicon
              class="info-icon"
              icon="music"
              width="2vh"
              height="2vh"
            ></svgicon>

      </div>
      <h1 class="main-info-title" id="public-transport-header">
        Music
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
            <button class="playlist-button">
              <svg class="playlist-icon" viewBox="0 0 50 50">
                <path
                  fill="#231F20"
                  d="M8.667,15h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,15,8.667,15z"
                />
                <path
                  fill="#231F20"
                  d="M8.667,37h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,37,8.667,37z"
                />
                <path
                  fill="#231F20"
                  d="M8.667,26h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,26,8.667,26z"
                />
              </svg>

              {{ playlist.name }}
            </button>
          </div>
        </div>
        <div class="column is-paddingless">
          <div
            class="playlist-shortcuts"
            :key="playlist.id"
            v-for="playlist in playlists.slice(0, 3)"
          >
            <button class="playlist-button">
              <svg class="playlist-icon" viewBox="0 0 50 50">
                <path
                  fill="#231F20"
                  d="M8.667,15h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,15,8.667,15z"
                />
                <path
                  fill="#231F20"
                  d="M8.667,37h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,37,8.667,37z"
                />
                <path
                  fill="#231F20"
                  d="M8.667,26h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,26,8.667,26z"
                /></svg
              >{{ playlist.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../compiled-icons/music"

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
  padding: 2vh 2.5%;
}

.playlist-icon {
  float: left;
  padding: 0.25vh;
  height: 3vh;
  width: 3vh;
}

.playlist-shortcuts {
  text-align: left;
  width: 100%;
  padding: 0.3vh;
}

.playlist-button {
  height: 3.5vh;
  width: 100%;
  font-size: 2vh;
  text-align: left;
  display: flex;

  align-items: center;
}
</style>
