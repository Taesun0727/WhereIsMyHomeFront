import Vue from "vue";
import Vuex from "vuex";
import { getMyQnas, getAllQnas, readQna, getAnswer, writeQna, writeAnswer } from "@/api/qna"

Vue.use(Vuex);

const qnaStore = { 
  namespaced: true,
  state: {
    qnas: [],
    qna: null,
    answer: null,
  },
  mutations: {
    SET_QNAS: (state, qnas) => {
      state.qnas = qnas;
    },
    SET_QNA: (state, qna) => {
      state.qna = qna;
    },
    SET_ANSWER: (state, answer) => {
      state.answer = answer;
    }
  },
  actions: {
    async GetMyQnas({ commit }, userNum) {
      await getMyQnas(
        userNum,
        ({ data }) => {
          commit("SET_QNAS", data);
        },
        (error) => {
          console.log(error);
        }
      )
    },
    async GetAllQnas({ commit }) {
      await getAllQnas(({ data }) => {
        commit("SET_QNAS", data);
      },
        (error) => {
          console.log(error);
        }
      )
    },
    async ReadQna({ commit }, qnaNum) {
      await readQna(
      qnaNum,
        ({ data }) => {
        commit("SET_QNA", data);
      },
        (error) => {
          console.log(error);
        }
      )
    },
    async GetAnswer({ commit }, qnaNum) {
      await getAnswer(
      qnaNum,
        ({ data }) => {
        commit("SET_ANSWER", data);
      },
        (error) => {
          console.log(error);
        }
      )
    },
    async WriteQna({}, qna) {
      await writeQna(
        qna,
        ({ data }) => {
        }
      )
    },
    async WriteAnswer({}, answer) {
      await writeAnswer(
        answer,
        ({ data }) => {
        }
      )
    },
  }
}

export default qnaStore;