import Vue from "vue";
import Vuex from "vuex";
import axios from "../util/http-common";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    qalist: [],
  },
  getters: {
    getQaList(state) {
      return state.qalist;
    }
  },
  actions: {

  }
})

export default store;