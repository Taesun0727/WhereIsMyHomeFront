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

export { sidoList, gugunList, dongList, houseSearch, houseList, getHouse };