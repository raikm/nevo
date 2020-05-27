<template>
  <div>
    <div class="playlist-table">
      <table :key="playlist.id" v-for="playlist in playlists.slice(0, 3)">
        <tr>
          <td class="cover"></td>
          <td class="playlist-name">
            {{ playlist.name }}
          </td>
        </tr>
      </table>
    </div>
    <div class="playlist-table">
      <table :key="playlist.id" v-for="playlist in playlists.slice(3, 6)">
        <tr>
          <td class="cover"></td>
          <td class="playlist-name">
            {{ playlist.name }}
          </td>
        </tr>
      </table>
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
.cover {
  width: 4vh;
  background-color: rgba(255, 192, 203, 0.211);
}

.playlist-name {
  padding-left: 0.5vh;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 55%;
}
</style>

<style lang="scss" scoped>
.playlist-table {
    float: left;
    width: 45%;
    margin: 1%;
    
}

table {
  background-color: rgba(245, 245, 245, 0.29);
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  margin: 3px;
  overflow: hidden;
  width: 100%;
}

td {
  display: inline-block;
  font-size: 1.8vh;
  height: 4vh;
  line-height: 4vh;
}
</style>
