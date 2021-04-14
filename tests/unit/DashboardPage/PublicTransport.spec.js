import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

import PublicTransport from "@/pages/DashboardPage/MainInfoBoxes/PublicTransport";

let wrapper;

let state;
let store;

const localVue = createLocalVue();
localVue.use(Vuex);

describe("public transport component and Hafas API not available", () => {
  beforeAll(() => {
    state = {
      config: { public_transport: { websocketUrl: "wrong_url" } },
    };
    store = new Vuex.Store({
      state,
    });
    wrapper = mount(PublicTransport, {
      store,
      localVue,
    });
  });

  test("should render Service offline container", () => {
    //TODO
  });
});

describe('public transport component and Hafas API available', () => {
    beforeAll(() => {
        state = {
          config: { public_transport: { websocketUrl: "correct_url" } },
        };
        store = new Vuex.Store({
          state,
        });
        wrapper = mount(PublicTransport, {
          store,
          localVue,
        });
      });  

    test('should return true if DateTime >= 3min', () => {
        let timeGreaterThan3Min = new Date()
        timeGreaterThan3Min = timeGreaterThan3Min.setMinutes(timeGreaterThan3Min.getMinutes() + 6)
        timeGreaterThan3Min = new Date(timeGreaterThan3Min)
        expect(wrapper.vm.filterTime(timeGreaterThan3Min.toString())).toBe(true);
    })
    
    test('should return false if DateTime < 3min', () => {
        expect(wrapper.vm.filterTime(new Date().toString())).toBe(false);
    })

    test('should return 5 for ETA', () => {
        let time5min = new Date()
        time5min = time5min.setMinutes(time5min.getMinutes() + 5)
        time5min = new Date(time5min)
        expect(wrapper.vm.mapETATime(time5min)).toBe(5);
    })
})

