import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
// module import
import userStore from "@/store/modules/userStore"
import noticeStore from "@/store/modules/noticeStore"
import qnaStore from "@/store/modules/qnaStore"
import houseStore from "@/store/modules/houseStore"
import NewsStore from "@/store/modules/NewsStore"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userStore,
    noticeStore,
    qnaStore,
    houseStore,
    NewsStore
  },
  plugins: [
    createPersistedState({
      paths: ['userStore', 'qnaStore', 'noticeStore', 'NewsStore'],
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});