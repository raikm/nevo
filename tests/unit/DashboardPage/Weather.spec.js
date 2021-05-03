import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

import Weather from "@/pages/DashboardPage/MainInfoBoxes/Weather";
import DayForecast from "@/pages/DashboardPage/MainInfoBoxes/Weather/DayForecast";
import WeekForecast from "@/pages/DashboardPage/MainInfoBoxes/Weather/WeekForecast";
import VueSVGIcon from "vue-svgicon";

let wrapper;
let url = "";
let data = "";
let state;
let store;

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueSVGIcon);

describe("weather component and API not available", () => {
  const mockAxiosFail = {
    get: (_url, _data) => {
      return new Promise((resolve, reject) => {
        url = _url;
        data = _data;
        reject(new Error("FAIL"));
      });
    },
  };
  beforeAll(() => {
    state = {
      config: { weather: { api_key: "123", open_weather_url: "url" } },
    };
    store = new Vuex.Store({
      state,
    });
    wrapper = mount(Weather, {
      mocks: {
        $axios: mockAxiosFail,
      },
      store,
      localVue,
    });
  });

  test("should render Service offline container", () => {
    expect(wrapper.find(".service-info").exists()).toBe(true);
  });
  test("should not render any weather information", () => {
    expect(wrapper.find("#forecast-stack-wrapper").exists()).toBe(false);
    expect(wrapper.findComponent(DayForecast).exists()).toBe(false);
    expect(wrapper.findComponent(WeekForecast).exists()).toBe(false);
  });
});
describe("weather component and API available", () => {
  const mockAxiosSuccess = {
    get: (_url, _data) => {
      return new Promise((resolve, reject) => {
        url = _url;
        data = _data;
        resolve({
          // simple data response with incomplete arrays
          data: {
            lat: 47.8112,
            lon: 13.0332,
            current: {
              dt: 1618236262,
              sunrise: 1618201454,
              sunset: 1618249955,
              temp: 2.29,
              humidity: 87,
              uvi: 0.27,
              clouds: 75,
              weather: [
                {
                  id: 500,
                  main: "Rain",
                  description: "light rain",
                  icon: "10d",
                },
              ],
              rain: { "1h": 0.21 },
            },
            hourly: [
              {
                dt: 1618236000,
                temp: 2.29,
                feels_like: -0.17,
                pressure: 1025,
                humidity: 87,
                dew_point: 0.35,
                uvi: 0.27,
                clouds: 75,
                visibility: 30,
                wind_speed: 2.36,
                wind_deg: 306,
                wind_gust: 4.95,
                weather: [
                  {
                    id: 500,
                    main: "Rain",
                    description: "light rain",
                    icon: "10d",
                  },
                ],
                pop: 1,
                rain: { "1h": 0.21 },
              },
            ],
            daily: [
              {
                dt: 1618225200,
                sunrise: 1618201454,
                sunset: 1618249955,
                temp: {
                  day: 2.78,
                  min: 1.62,
                  max: 8.31,
                  night: 1.62,
                  eve: 2.39,
                  morn: 6.01,
                },
                feels_like: { day: -0.06, night: 4.71, eve: 1.06, morn: 4.71 },
                pressure: 1025,
                humidity: 94,
                dew_point: 1.91,
                wind_speed: 2.88,
                wind_deg: 299,
                weather: [
                  {
                    id: 616,
                    main: "Snow",
                    description: "rain and snow",
                    icon: "13d",
                  },
                ],
                clouds: 90,
                pop: 1,
                rain: 1.29,
                snow: 6.81,
                uvi: 0.4,
              },
            ],
          },
        });
      });
    },
  };
  beforeAll(() => {
    state = {
      config: { weather: { api_key: "123", open_weather_url: "url" } },
    };
    store = new Vuex.Store({
      state,
    });
    wrapper = mount(Weather, {
      mocks: {
        $axios: mockAxiosSuccess,
      },
      store,
      localVue,
    });
  });

  test("should not render Service offline container", () => {
    expect(wrapper.find("#weather-service-info").exists()).toBe(false);
  });
  test("should render weather information components", () => {
    expect(wrapper.find("#forecast-stack-wrapper").exists()).toBe(true);
    expect(wrapper.findComponent(DayForecast).exists()).toBe(true);
    expect(wrapper.findComponent(WeekForecast).exists()).toBe(true);
  });
  test('should show correct infos', () => {
      //TODO: temperature-outdoor-info --> 2°C
      //TODO: first hour temp in ARRAY --> 2.29
      
  })
  
});
