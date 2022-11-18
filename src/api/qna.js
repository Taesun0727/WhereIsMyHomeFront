import { apiInstance } from "./index.js";

const api = apiInstance();

async function getMyQnas(userNum, success, fail) {
  await api.get(`/qna/user/${userNum}`).then(success).catch(fail);
}

async function getAllQnas(success, fail) {
  await api.get(`/qna`).then(success).catch(fail);
}

async function readQna(qnaNum, success, fail) {
  await api.get(`/qna/${qnaNum}`).then(success).catch(fail)
}

async function getAnswer(qnaNum, success, fail) {
  await api.get(`/qna/answer/${qnaNum}`).then(success).catch(fail)
}

async function writeQna(qna, success, fail) {
  await api.post(`/qna`, qna).then(success).catch(fail)
}

async function writeAnswer(answer, success, fail) {
  await api.post(`/answer`, answer).then(success).catch(fail)
}

// async function readNotice(noticeNum, success, fail) {
//   // api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
//   await api.get(`/notice/${noticeNum}`).then(success).catch(fail);
// }

// async function writeNotice(notice, success, fail) {
//   // api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
//   await api.post(`/notice`, notice).then(success).catch(fail);
// }

// async function deleteNotice(noticeNum, success, fail) {
//   // api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
//   await api.delete(`/notice/${noticeNum}`).then(success).catch(fail);
// }

// async function modifyNotice(notice, success, fail) {
//   // api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
//   await api.put(`/notice`, notice).then(success).catch(fail);
// }

export { getMyQnas, getAllQnas, getAnswer, readQna, writeQna, writeAnswer };