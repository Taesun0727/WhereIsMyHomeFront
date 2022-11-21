import { apiInstance } from "./index.js";

const api = apiInstance();

function sidoList(success, fail) {
  api.get(`/si`).then(success).catch(fail);
}

function gugunList(params, success, fail) {
  api.get(`/gugun/${params}`).then(success).catch(fail);
}

function dongList(params, success, fail) {
  api.get(`/dong/${params}`).then(success).catch(fail);
}

function houseList(params, success, fail) {
  api.get(`/dong/select/${params}`).then(success).catch(fail);
}

function houseSearch(params, success, fail) {
  api.get(`/house/${params}`).then(success).catch(fail);
}

function getHouse(params, success, fail) {
  api.get(`/house/code/${params}`).then(success).catch(fail);
}

function getDeal(params, success, fail) {
  api.get(`/house/deal/${params}`).then(success).catch(fail);
}

async function getInterest(params, success, fail) {
  await api.get(`/interest/${params.userinfo_num}/${params.aptCode}`).then(success).catch(fail);
}

async function getInterestList(param, success, fail) {
  await api.get(`/interest/${param}`).then(success).catch(fail);
}

async function insertInterest(params, success, fail) {
  // api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.post(`/interest`, params).then(success).catch(fail);
}

async function deleteInterest(params, success, fail) {
  // api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.delete(`/interest/${params.userinfo_num}/${params.aptCode}`).then(success).catch(fail);
}

export { sidoList, gugunList, dongList, houseSearch, houseList, getHouse, getDeal, getInterest, insertInterest, deleteInterest, getInterestList };