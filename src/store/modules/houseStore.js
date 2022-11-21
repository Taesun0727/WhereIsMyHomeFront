import {  sidoList, gugunList, dongList, houseSearch, houseList, getHouse, getDeal, getInterest, insertInterest, deleteInterest, getInterestList } from "@/api/house";
import store from "..";
const houseStore = {
  namespaced: true,
  state: {
    sidos: [{ value: null, text: "선택하세요" }],
    guguns: [{ value: null, text: "선택하세요" }],
    dongs: [{ value: null, text: "선택하세요" }],
    houses: [],
    house: null,
    deals: [],
    interest: false,
    interests: [],

    cardView: false,
    detailView: false,
  },
  mutations: {
    CLEAR_SIDO_LIST(state) {
      state.sidos = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_GUGUN_LIST(state) {
      state.guguns = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_DONG_LIST(state) {
      state.dongs = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_APT_LIST(state) {
      state.houses = [];
      state.house = null;
    },
    SET_SIDO_LIST(state, sidos) {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
      });
    },
    SET_GUGUN_LIST(state, guguns) {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName });
      });
    },
    SET_DONG_LIST(state, dongs) {
      dongs.forEach((dong) => {
        state.dongs.push({ value: dong.dongCode, text: dong.dongName });
      });
    },
    SET_HOUSE_LIST(state, houses) {
      state.houses = houses;
      state.cardView = true;
      console.log(state.houses)
    },
    SET_HOUSE(state, house) {
      state.house = house;
    },
    SET_DEAL(state, deals) {
      state.deals = deals;
    },
    SET_DETAIL_HOUSE(state, house) {
      state.house = house;
    },
    SET_INTEREST(state, interest) {
      state.interest = interest;
    },
    SET_INTERESTS(state, interests) {
      state.interests = interests;
    },
    SET_DETAIL_VIEW(state) {
      state.detailView = true;
    },
    SET_FALSE_DETAIL_VIEW(state) {
      state.detailView = false;
    },
    CHANGE_INTEREST(state) {
      state.interest = !state.interest;
    },
    CHANGE_DETAIL_VIEW(state) {
      state.detailView = !state.detailView;
    },
    INIT_VIEW(state) {
      state.cardView = false;
      state.detailView = false;
    }
  },
  actions: {
    getSido: ({ commit }) => {
      sidoList(
        ({ data }) => {
          commit("SET_SIDO_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getGugun: ({ commit }, sidoCode) => {
      gugunList(
        sidoCode,
        ({ data }) => {
          commit("SET_GUGUN_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getDong: ({ commit }, gugunCode) => {
      dongList(
        gugunCode,
        ({ data }) => {
          commit("SET_DONG_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getHouses: ({ commit }, dongCode) => {
      houseList(
        dongCode,
        ({ data }) => {
          commit("SET_HOUSE_LIST", data);
          commit("SET_FALSE_DETAIL_VIEW");
        },
        (error) => {
          console.log(error);
        }
      );
    },
    searchHouse: ({ commit }, aptName) => {
      houseSearch(
        aptName,
        ({ data }) => {
          commit("SET_HOUSE_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getInfoHouse: ({ commit }, param) => {
      console.log(param)
      getHouse(
        param.aptCode,
        ({ data }) => {
          commit("SET_HOUSE", data);
          commit("SET_DETAIL_VIEW")
        },
        (error) => {
          console.log(error);
        }
      );
      getDeal(
        param.aptCode,
        ({ data }) => {
          commit("SET_DEAL", data);
        },
        (error) => {
          console.log(error);
        }
      );
      getInterest(
        param,
        ({ data }) => {
          commit("SET_INTEREST", data);
        },
        (error) => {
          console.log(error);
        }
      )
    },
    GetInterests: ({ commit }, userinfo_num) => {
      getInterestList(
        userinfo_num,
        ({ data }) => {
          commit("SET_HOUSE_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    InsertInterest: ({ commit }, param) => {
      insertInterest(
        param,
        ({ data }) => {
          commit("CHANGE_INTEREST");
        },
        (error) => {
          console.log(error);
        }
      );
    },
    DeleteInterest: ({ commit, dispatch }, param) => {
      deleteInterest(
        param,
        ({ data }) => {
          commit("CHANGE_INTEREST");
          dispatch("GetInterests", param.userinfo_num);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default houseStore;
