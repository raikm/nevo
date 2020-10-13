<template>
  <div>
    <div class="main-info-header">
      <div id="current-track">
        <img id="album-cover" src="../../../public/img/album_cover.png" />
        Yung Hurn
      </div>
      <div id="music-icon-container" class="main-info-icon-container">
        <svg
          width="3.8vh"
          height="3.8vh"
          viewBox="0 0 1080 1080"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M895.433 67.0405C912.605 63.9191 927.826 67.8203 941.096 78.7488C954.366 89.6774 961 103.727 961 120.899V721.536C961 776.957 945.388 820.277 914.167 851.499C882.945 881.94 840.013 897.161 785.375 897.161C747.908 897.161 717.076 887.404 692.879 867.89C668.683 847.595 656.583 822.228 656.583 791.786C656.583 753.54 671.804 721.536 702.246 695.778C732.688 670.02 772.105 657.141 820.5 657.141C838.454 657.141 857.576 660.262 877.871 666.507C878.651 666.507 879.433 666.116 880.213 665.336C880.992 665.336 881.383 664.945 881.383 664.166V277.791C881.383 275.449 880.213 273.498 877.871 271.936C875.529 269.595 873.188 268.815 870.846 269.595L431.783 353.895C425.538 355.457 422.417 359.358 422.417 365.603V838.62C422.417 894.04 406.805 937.361 375.583 968.582C344.362 999.024 301.43 1014.24 246.792 1014.24C209.325 1014.24 178.492 1004.1 154.296 983.803C130.099 964.29 118 939.311 118 908.87C118 870.623 133.221 838.62 163.662 812.861C194.104 787.103 233.521 774.224 281.917 774.224C299.87 774.224 318.992 777.345 339.287 783.59C340.067 783.59 340.849 783.199 341.629 782.42C342.409 782.42 342.8 782.029 342.8 781.249V237.982C342.8 218.469 348.654 201.295 360.362 186.466C372.851 170.854 388.462 161.487 407.196 158.366L895.433 67.0405Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="-268.471"
              y1="-285.38"
              x2="1361.33"
              y2="1363.15"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.0635411" stop-color="#FB413E" />
              <stop offset="0.381554" stop-color="#FF3C32" />
              <stop
                offset="0.520016"
                stop-color="#AD69E3"
                stop-opacity="0.75"
              />
              <stop offset="0.629314" stop-color="#5DC4F9" />
              <stop offset="0.962717" stop-color="#60C2F8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
    <div id="main-playlist-shortcuts">
      <div class="columns">
        <div class="column is-paddingless">
          <div
            class="playlist-shortcuts"
            :key="playlist.id"
            v-for="playlist in playlists.slice(3, 6)"
          >
            <button
              class="playlist-button"
              @click="startPlaylistOnSpotify(playlist.name)"
            >
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
            <button
              class="playlist-button"
              @click="startPlaylistOnSpotify(playlist.name)"
            >
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
import "../../compiled-icons/music";

export default {
  name: "MusicPlayerPlaylistController",
  methods: {
    startPlaylistOnSpotify(playlistname) {
      document.getElementById("main-playlist-shortcuts").style.display = "None";
      console.log(playlistname);
    },
  },
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


#current-track{
  width: 88%;
  float: left;

  #album-cover{
    height: 30px;
    width: 30px;
  }
}


.playlist-name {
  padding-left: 0.5vh;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 55%;
}

#main-playlist-shortcuts {
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
