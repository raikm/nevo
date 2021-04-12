import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

import TempHumidity from "@/pages/DashboardPage/MainInfoBoxes/TempHumidity";

const localVue = createLocalVue();
localVue.use(Vuex);
let wrapper;
let state;
let store;

describe("TempHumidity Component and no data is given from Server (NaN)", () => {
  beforeEach(() => {
    state = {
      currentEntities: [
        { entity_id: "sensor.temperature_mock", state: "NaN" },
        { entity_id: "sensor.humidity_mock", state: "NaN" },
      ],
    };
    store = new Vuex.Store({
      state,
    });
    wrapper = mount(TempHumidity, { store, localVue });
  });

  test("data of temp and humidity should be still null", () => {
    expect(wrapper.vm.temperatureInfo).toBeNull;
    expect(wrapper.vm.humidityInfo).toBeNull;
  });
  test('should render "--" with no currencies', () => {
    expect(wrapper.find("#temp-info").text()).toEqual("--");
    expect(wrapper.find("#humidity-info").text()).toEqual("--");
  });
});

describe("TempHumidity Component and data is given from Server", () => {
  beforeEach(() => {
    state = {
      currentEntities: [
        { entity_id: "sensor.temperature_mock", state: "24.23" },
        { entity_id: "sensor.humidity_mock", state: "88.22" },
      ],
    };
    store = new Vuex.Store({
      state,
    });
    wrapper = mount(TempHumidity, { store, localVue });
  });

  test("data of temp and humidity should type of number", () => {
    expect(typeof wrapper.vm.temperatureInfo).toEqual("string");
    expect(typeof wrapper.vm.humidityInfo).toEqual("string");
  });
  test('should render "--" with no currencies', () => {
    expect(wrapper.find("#temp-info").text()).toEqual("24.2°C");
    expect(wrapper.find("#humidity-info").text()).toEqual("88.2%");
  });
});
