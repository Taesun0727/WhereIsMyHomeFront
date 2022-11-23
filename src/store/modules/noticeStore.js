import router from "@/router.js";
import { getNotices, readNotice, writeNotice, deleteNotice, modifyNotice } from "@/api/notice";

const noticeStore = {
  namespaced: true,
  state: {
    notices: [],
    notice: null,
  },
  mutations: {
    SET_NOTICES: (state, notices) => {
      state.notices = notices;
    },
    SET_NOTICE: (state, notice) => {
      state.notice = notice;
    }
  },
  actions: {
    async GetNotices({ commit }) {
      await getNotices(({ data }) => {
        commit("SET_NOTICES", data);
      },
      (error) => {
        console.log(error);
        }
      )
    },
    async ReadNotice({ commit }, noticeNum) {
      await readNotice(
        noticeNum,
        ({ data }) => {
        commit("SET_NOTICE", data);
      },
        (error) => {
          console.log(error);
      })
    },
    async WriteNotice({}, notice) {
      await writeNotice(
        notice,
        ({ data }) => {
        }
      )
    },
    async DeleteNotice({}, noticeNum) {
      await deleteNotice(
        noticeNum,
        ({ data }) => {
        }
      )
    },
    async ModifyNotice({ }, notice) {
      console.log(notice)
      await modifyNotice(
        notice,
        ({ data }) => {
        }
      )
    },

  },
};

export default noticeStore;
