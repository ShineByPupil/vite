import { createStore, Store } from "vuex";
import { RootState } from "./index.d";

const store: Store<RootState> = createStore({
  state: {
    commonCount: 0,
  },
  mutations: {
    increment: (state) => {
      state.commonCount++;
    },
  },
  modules: {},
});

export default store;
