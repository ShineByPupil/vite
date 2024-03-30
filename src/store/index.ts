import { createStore, Store } from "vuex";
import { RouteRecordName } from "vue-router";
import { RootState } from "./index.d";

const store: Store<RootState> = createStore({
  state: {
    route_cache_max: 10,
    route_cache_set: new Set(),
  },

  getters: {
    route_cache_include: (state) => Array.from(state.route_cache_set),
  },
  mutations: {
    increment: (state) => {
      state.commonCount++;
    },
    route_cache_set_add(state, name: RouteRecordName) {
      state.route_cache_set.add(name);
    },
  },
  modules: {},
});

export default store;
