<template>
  <div class="basic-card main-info-box main-info-box-small">
    <div id="light-intensity-info-box" :lightintensityInfo="lightintensityInfo">
      <div class="main-info-header">
        <h1 class="main-info-title">
          Light intensity
        </h1>
        <svg
          class="info-icon"
          width="304"
          height="341"
          viewBox="0 0 304 341"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="sofGlow" height="300%" width="300%" x="-75%" y="-75%">
              <!-- Thicken out the original shape -->
              <feMorphology
                operator="dilate"
                radius="4"
                in="SourceAlpha"
                result="thicken"
              />

              <!-- Use a gaussian blur to create the soft blurriness of the glow -->
              <feGaussianBlur in="thicken" stdDeviation="7" result="blurred" />

              <!-- Change the colour -->
              <feFlood flood-color="#F5BC42" result="glowColor" />

              <!-- Color in the glows -->
              <feComposite
                in="glowColor"
                in2="blurred"
                operator="in"
                result="softGlow_colored"
              />

              <!--	Layer the effects together -->
              <feMerge>
                <feMergeNode in="softGlow_colored" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            class="light-bulb-body"
            d="M204.619 121.973C187.585 126.342 166.467 127.865 151.998 127.865C137.53 127.865 116.411 126.342 99.3778 121.973C112.279 166.931 114.492 208.054 114.055 219.754C113.951 222.472 114.777 225.04 116.354 227.096L120.544 232.467C129.588 233.671 140.066 234.428 151.998 234.428C163.93 234.428 174.409 233.671 183.453 232.467L187.642 227.096C189.219 225.04 190.046 222.472 189.941 219.754C189.504 208.054 191.718 166.931 204.619 121.973Z"
            stroke="#737373"
          />
          <path
            class="light-bulb-body"
            d="M152.036 245.087C144.303 245.087 133.416 244.693 123.517 243.617L128.277 276.736C128.524 279.06 129.54 281.212 131.136 282.843L135.573 287.361C135.867 287.67 136.143 288 136.399 288.341L141.102 294.554C142.907 296.962 145.652 298.369 148.569 298.369H152.036H155.504C158.42 298.369 161.175 296.962 162.98 294.554L167.664 288.341C167.93 288 168.205 287.67 168.509 287.361L172.946 282.843C174.542 281.212 175.549 279.06 175.796 276.736L180.555 243.617C170.656 244.693 159.769 245.087 152.036 245.087Z"
            stroke="#737373"
          />
          <path
            class="light-bulb"
            d="M211.383 57.8921C225.871 72.8322 212.685 100.357 208.258 110.182C196.316 114.083 177.202 117.588 151.495 117.588C125.788 117.588 106.684 114.083 94.7424 110.182C90.3154 100.357 77.1199 72.8322 91.6169 57.8921C107.111 41.9184 148.883 43.016 151.495 43.016C154.117 43.016 195.879 41.9184 211.383 57.8921Z"
            fill="#F5BC42"
            filter="url(#sofGlow)"
          />
        </svg>
      </div>
      <!-- <div id="light-intensity-bar-border">
        <div
          id="light-intensity-bar"
          :style="{ width: lightintensityInfo.value + '%' }"
        ></div>
      </div> -->

      <div id="light-intensity-control-wrapper">
        <HorizontalBarController id="light-intensity-control" />
        <div id="light-intensity-icon-container">
          <svgicon id="light-intensity-icon" icon="sun"></svgicon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HorizontalBarController from "../InteractionController/HorizontalBarController";

export default {
  name: "LightIntensityMainInfoBox",
  components: { HorizontalBarController },
  props: [],
  data() {
    return {
      lightintensityInfo: {
        id: 1,
        value: 70,
      },
    };
  },
};
</script>

<style lang="scss">
#light-intensity-control::-webkit-slider-thumb {
  -webkit-appearance: none;
  -webkit-touch-appearance: none;
  width: 0px; /* 1 */
  background: #fff;
  box-shadow: -100vw 0 0 100vw #ffffff;
}

#light-intensity-info-box {
  float: left;
  margin-right: 10px;
  width: 100%;
}

#light-intensity-bar-border {
  background-color: rgba(245, 245, 245, 0.571);
  border-radius: 10px;
  width: 100%;
}

#light-intensity-control-wrapper {
  margin-top: 15%;
  height: 30%;
  position: relative;
}
#light-intensity-icon-container {
  height: 100%;
  position: absolute;
  z-index: 99;
  pointer-events: none;
}
#light-intensity-icon {
  height: 2vh;
  margin: 1.5vh;
  fill: lightgray;
}

#light-intensity-control {
  position: absolute;
  z-index: 98;
  height: 5vh;
  width: 100%;
}
</style>
