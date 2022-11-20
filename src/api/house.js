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

function aptList(params, success, fail) {
  house.get(``, { params: params }).then(success).catch(fail);
}

export { sidoList, gugunList, dongList, aptList, houseSearch, houseList };