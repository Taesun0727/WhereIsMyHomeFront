import router from "@/router.js";
import jwtDecode from "jwt-decode";
import { login, kakaoLogin, findById, tokenRegeneration, logout, Delete, Modify, PwModify} from "@/api/user";

const userStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: {
      userinfoLevel: 3
    },
    isValidToken: false,
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
    checkToken: function (state) {
      return state.isValidToken;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      console.log(isLogin)
      state.isLogin = isLogin;
      console.log(state.isLogin)
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_IS_VALID_TOKEN: (state, isValidToken) => {
      state.isValidToken = isValidToken;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo;
    },
  },
  actions: {
    async userConfirm({ commit }, user) {
      await login(
        user,
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            let refreshToken = data["refresh-token"];
            // console.log("login success token created!!!! >> ", accessToken, refreshToken);
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_IS_VALID_TOKEN", true);
            sessionStorage.setItem("access-token", accessToken);
            sessionStorage.setItem("refresh-token", refreshToken);
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
            commit("SET_IS_VALID_TOKEN", false);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async kakaoLogin({ commit }, token) {
      await kakaoLogin(token, ({ data }) => {
        let accessToken = data["access-token"];
        let refreshToken = data["refresh-token"];
        console.log(data);
        commit("SET_IS_LOGIN", true);
        commit("SET_IS_LOGIN_ERROR", false);
        commit("SET_IS_VALID_TOKEN", true);
        // console.log("레벨 설정 : " + data.level);
        sessionStorage.setItem("access-token", accessToken);
        sessionStorage.setItem("refresh-token", refreshToken);
        return true;
      });
    },


    async getUserInfo({ commit, dispatch }, token) {
      let decodeToken = jwtDecode(token);
      // console.log("2. getUserInfo() decodeToken :: ", decodeToken);
      await findById(
        decodeToken.userinfo,
        ({ data }) => {
          if (data.message === "success") {
            console.log(data.userInfo);
            commit("SET_USER_INFO", data.userInfo);
            // console.log("3. getUserInfo data >> ", data);
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        async (error) => {
          console.log("getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ", error.response.status);
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
        }
      );
    },
    async tokenRegeneration({ commit, state }) {
      console.log("토큰 재발급 >> 기존 토큰 정보 : {}", sessionStorage.getItem("access-token"));
      await tokenRegeneration(
        JSON.stringify(state.userInfo),
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            console.log("재발급 완료 >> 새로운 토큰 : {}", accessToken);
            sessionStorage.setItem("access-token", accessToken);
            commit("SET_IS_VALID_TOKEN", true);
          }
        },
        async (error) => {
          // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
          if (error.response.status === 401) {
            console.log("갱신 실패");
            // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
            await logout(
              state.userInfo.userid,
              ({ data }) => {
                if (data.message === "success") {
                  console.log("리프레시 토큰 제거 성공");
                } else {
                  console.log("리프레시 토큰 제거 실패");
                }
                alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
                commit("SET_IS_VALID_TOKEN", false);
                router.push({ name: "login" });
              },
              (error) => {
                console.log(error);
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
              }
            );
          }
        }
      );
    },
    async userLogout({ commit }, userinfo) {
      await logout(
        userinfo,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_USER_INFO", {userinfo_level : 3});
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_VALID_TOKEN", false);
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async userDelete({commit}, userinfo){
      await Delete(userinfo,
        ({data}) => {
          if(data === "success"){
            commit("SET_USER_INFO", {userinfo_level : 3});
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_VALID_TOKEN", false);
            console.log("삭제 성공");
          } else {
            console.log("탈퇴가 제대로 이루어지지 않음!!!");
          }
        },
        (error) => {
          console.log(error);
        } 
      );
    },
    async userModify({commit}, userinfo){
      await Modify(userinfo, 
        ({data}) => {
          if(data === "success"){
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_IS_VALID_TOKEN", true);
            console.log("수정 성공!!!!");
          }
          else {
            console.log("수정 실패!!!");
          }
        }
      );
    },
    async userPwModify({commit}, userinfo){
      await PwModify(userinfo, 
        ({data}) => {
          if(data === "success"){
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_IS_VALID_TOKEN", true);
            alert("패스워드 수정 성공!!!");
          } else{
            alert("패스워드 수정 실패!!!!");
          }
        }
      );
    },
  }
};

export default userStore;
