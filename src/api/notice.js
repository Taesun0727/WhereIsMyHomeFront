import { apiInstance } from "./index.js";

const api = apiInstance();

async function getNotices(success, fail) {
  await api.get(`/notice`).then(success).catch(fail);
}

async function readNotice(noticeNum, success, fail) {
  // api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/notice/${noticeNum}`).then(success).catch(fail);
}

async function writeNotice(notice, success, fail) {
  // api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.post(`/notice`, notice).then(success).catch(fail);
}

async function deleteNotice(noticeNum, success, fail) {
  // api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.delete(`/notice/${noticeNum}`).then(success).catch(fail);
}

async function modifyNotice(notice, success, fail) {
  // api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.put(`/notice`, notice).then(success).catch(fail);
}

export { getNotices, readNotice, writeNotice, deleteNotice, modifyNotice };