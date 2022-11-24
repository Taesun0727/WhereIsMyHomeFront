<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container" style="height: 100vh;">
        <div class="md-layout" style="transform: translate3d(0, 40%, 0);">
          <div class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto">
            <login-card header-color="green" style="height: 360px">
              <h4 slot="title" class="card-title">Login</h4>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>ID...</label>
                <md-input v-model="user.userinfo_id" type="email"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Password...</label>
                <md-input v-model="user.userinfo_password" type="password"></md-input>
              </md-field>
              <md-button href="/" slot="footer" class="md-simple md-success md-lg" @click.prevent="confirm">
                Login
              </md-button>
              <md-button href="/Join" slot="footer" class="md-simple md-success md-lg">
                Sign Up
              </md-button>
              <div style="text-align: center;" slot="last">
                <md-button class="md-just-icon md-simple md-white" style="width:80%;" @click="_kakaologin">
                  <img src="@/assets/img/kakao_login.png" />
                </md-button>
              </div>
            </login-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard } from "@/components";
import { mapState, mapActions } from "vuex";
import axios from "axios";

const userStore = "userStore";
// const CLIENT_ID = "9903ba916813929e1cf77e63b54c47c2";
// const REDIRECT_URI = "http://localhost:8080/kakaologin";
// const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export default {
  components: {
    LoginCard,
  },
  //jinsu 수정
  props: {
    image: {
      type: String,
      default: require("@/assets/img/main.jpg"),
    },
  },
  bodyClass: "login-page",
  data() {
    return {
      user: {
        userinfo_id: null,
        userinfo_password: null,
      },
    };
  },
  computed: {
    ...mapState(userStore, ["isLogin", "isLoginError", "userInfo"]),
    headerStyle() {
      return {
        backgroundImage: `url(${this.image})`,
      };
    },
  },
  methods: {
    ...mapActions(userStore, ["userConfirm", "getUserInfo", "kakaoLogin"]),
    async confirm() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      // console.log("1. confirm() token >> " + token);
      if (this.isLogin) {
        await this.getUserInfo(token);
        // console.log("4. confirm() userInfo :: ", this.userInfo);
        this.$router.push({ name: "index" });
      }
    },
    _kakaologin() {
      window.Kakao.Auth.login({
        scope: "profile_nickname, account_email",
        success: (authObj) => {
          console.log(authObj["access_token"]);
          this.kakaoLogin(authObj["access_token"]).then(() => {
            console.log(sessionStorage.getItem("access-token"));
            this.getUserInfo(sessionStorage.getItem("access-token"));

            this.$router.push({ name: "index" });
          });
        },
      });
    },
  },
};
</script>

<style lang="css"></style>
