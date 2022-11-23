import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function kakaoLogin(token, success, fail) {
  await api.get(`/kakaologin?code=${token}`).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/info/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  api.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
  await api.post(`/user/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  await api.get(`/user/logout/${userid}`).then(success).catch(fail);
}

async function Delete(userinfo_num, success, fail){
  await api.delete(`/user/delete/${userinfo_num}`).then(success).catch(fail);
}

async function Modify(user, success, fail){
  await api.put(`/user/update`, JSON.stringify(user)).then(success).catch(fail);
}

async function PwModify(user, success, fail){
  await api.put(`/user/pwupdate`, JSON.stringify(user)).then(success).catch(fail);
}

export { login, kakaoLogin, findById, tokenRegeneration, logout, Delete, Modify, PwModify};
