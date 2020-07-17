<template>
  <div class="basic-card main-info-box main-info-box-big">
    <div
      id="public-transport-info-box"
      
    >
      <div class="main-info-header">
        <div
          class="main-info-icon-container">
          <svg class="info-icon" viewBox="0 0 403.968 403.968">
            <g>
              <g>
                <path d="M109.535,235.52c-15.36,0-27.648,12.288-27.648,27.648c0,15.36,12.288,27.648,27.648,27.648s27.648-12.288,27.648-27.648
                  S124.895,235.52,109.535,235.52z M109.535,280.576c-9.728,0-17.408-7.68-17.408-17.408c0-9.728,7.68-17.408,17.408-17.408
                  c9.728,0,17.408,7.68,17.408,17.408C126.943,272.896,119.263,280.576,109.535,280.576z"/>
              </g>
            </g>
            <g>
              <g>
                <path d="M293.855,235.52c-15.36,0-27.648,12.288-27.648,27.648s12.288,27.648,27.648,27.648c15.36,0,27.648-12.288,27.648-27.648
                  S309.215,235.52,293.855,235.52z M293.855,280.576c-9.728,0-17.408-7.68-17.408-17.408c0-9.728,7.68-17.408,17.408-17.408
                  c9.728,0,17.408,7.68,17.408,17.408C311.263,272.896,303.583,280.576,293.855,280.576z"/>
              </g>
            </g>
            <g>
              <g>
                <path d="M239.071,33.792h-74.752c-10.752,0-18.944,8.704-18.944,18.944c-0.512,10.24,8.192,18.944,18.944,18.944h74.752
                  c10.752,0,18.944-8.704,18.944-18.944C258.015,41.984,249.311,33.792,239.071,33.792z M239.071,60.928h-74.752
                  c-5.12,0-8.704-4.096-8.704-8.704c-0.512-4.608,3.584-8.704,8.704-8.704h74.752c5.12,0,8.704,4.096,8.704,8.704
                  C247.775,57.344,243.679,60.928,239.071,60.928z"/>
              </g>
            </g>
            <g>
              <g>
                <path d="M366.047,311.808h-7.168V79.36c0-1.024,1.536-19.456-16.384-38.912C317.919,13.824,270.303,0,201.695,0
                  c-69.12,0-116.224,13.312-140.8,40.448c-17.408,18.944-16.384,37.888-16.384,38.4v232.96h-6.144c-3.072,0-5.12,2.048-5.12,5.12
                  v26.112c0,2.56,2.048,5.12,4.608,5.12l66.048,4.096l-34.304,43.52c-1.536,2.048-1.536,5.632,1.024,7.168
                  c1.024,0.512,2.048,1.024,3.072,1.024c1.536,0,3.072-0.512,4.096-2.048l4.608-6.144h0.512h237.056h0.512l4.608,6.144
                  c1.024,1.536,2.56,2.048,4.096,2.048c1.024,0,2.048-0.512,3.072-1.024c2.048-1.536,2.56-5.12,1.024-7.168l-34.304-43.52
                  l67.072-4.096c2.56,0,4.608-2.56,4.608-5.12v-26.112C371.167,314.368,368.607,311.808,366.047,311.808z M68.575,47.616
                  c15.36-16.896,51.2-36.864,133.12-36.864c81.408,0,117.248,19.968,133.12,36.864c14.848,15.872,13.824,30.72,13.824,31.744v18.944
                  H54.751V79.36C54.751,77.824,53.727,62.976,68.575,47.616z M348.639,214.016v97.792H54.751v-97.792H348.639z M54.751,203.776
                  V107.52h143.872v96.256H54.751z M208.863,204.288v-0.512v-95.744h139.776v96.256H208.863z M304.095,374.784v0.512l8.704,10.752
                  H90.591l8.704-11.264h0.512H304.095z M295.903,365.056H106.975l9.216-11.776l84.992,5.12c0,0,0,0,0.512,0c0.512,0,0,0,0.512,0
                  l84.992-5.12c0,0,0,0,0,0.512L295.903,365.056z M360.927,338.432l-159.232,9.728l-158.208-9.728v-16.384h317.44V338.432z"/>
              </g>
            </g>
          </svg>
        </div>
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


// ----- scoped ------
<style lang="scss" scoped>


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
.public-transport-line{
    text-align: center;
    width: 15%;
   
    border-radius: 6px;
}

.public-transport-line-content{
    //  background-color: rgba(240, 97, 36, 0.6);
}

.public-transport-direction{
    margin-left: 4%;
    width: 56%;
}

.public-transport-time{
    text-align: right;
    width: 20%
}


</style>
