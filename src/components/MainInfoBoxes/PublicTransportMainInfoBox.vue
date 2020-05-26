<template>
  <div class="main-info-box main-info-box-big">
    <div
      id="public-transport-info-box"
      :publicTransportInfo="publicTransportInfo"
    >
      <div class="main-info-header">
        <img
          id="public-transport-icon"
          src="../../../public/img/icons/subway.svg"
        />
        <h1 class="main-info-title" id="public-transport-header">
          Public Transport
        </h1>
      </div>
      <div>
        <table id="table-titles">
          <tr>
            <td class="public-transport-line">Line</td>
            <td class="public-transport-direction">Direction</td>
            <td class="public-transport-time">Time</td>
          </tr>
        </table>

        <table :key="transport.id" v-for="transport in publicTransportInfos">
          <tr>
            <td class="public-transport-line public-transport-line-content">{{ transport.line }}</td>
            <td class="public-transport-direction">
              {{ transport.direction }}
            </td>
            <td class="public-transport-time">
              {{ transport.time }} min
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PublicTransportMainInfoBox",
  components: {},
  props: [],
  data() {
    var BUS = "bus";
    var SUBWAY = "subway";

    return {
      publicTransportInfos: [
        {
          id: 1,
          type: SUBWAY,
          direction: "Pankow",
          line: "U1",
          lineColor: "#ff0000",
          time: 4,
        },
        {
          id: 2,
          type: BUS,
          direction: "Airport",
          line: "2",
          lineColor: "#6600cc",
          time: 12,
        },
        {
          id: 3,
          type: BUS,
          direction: "Europark / Staaken",
          line: "12",
          lineColor: "#6600cc",
          time: 1,
        },
        {
          id: 4,
          type: BUS,
          direction: "Airport / Berlin Tegel",
          line: "120",
          lineColor: "#6600cc",
          time: 1,
        },
      ],
    };
  },
   computed: {

   }
};
</script>

<style lang="scss">
#public-transport-info-box {
  float: left;
  margin-right: 10px;
  width: 100%;
}

#public-transport-icon {
  float: left;
  height: 3vh;
  
}

#table-titles {
    font-weight: bold
}

.public-transport-direction {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 4%;
}

</style>

<style lang="scss" scoped>

.public-transport-line{
    text-align: center;
    width: 15%;
   
    border-radius: 6px;
}

.public-transport-line-content{
     background-color: yellow;
}

.public-transport-direction{
    margin-left: 4%;
    width: 56%;
}

.public-transport-time{
    text-align: right;
    width: 20%
}



table {
  margin-bottom: 3px;
  width: 100%;
}

td {
  display: inline-block;
  font-size: 1.8vh;
  height: 3vh;
  line-height: 3vh;
}
</style>
