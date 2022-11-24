<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container" style="height: 100vh;">
        <div class="md-layout" style="transform: translate3d(0, 40%, 0);">
          <div class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto">
            <login-card header-color="green">
              <h4 slot="title" class="card-title">Sign Up</h4>

              <md-field class="md-form-group" slot="inputs">
                <md-icon>face</md-icon>
                <label>NickName...</label>
                <md-input v-model="user.userinfo_nick"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>account_circle</md-icon>
                <label>ID...</label>
                <md-input v-model="user.userinfo_id"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Password...</label>
                <md-input v-model="user.userinfo_password" type="password"></md-input>
              </md-field>
              <md-button slot="footer" class="md-simple md-success md-lg" @click="join">
                회원가입
              </md-button>
            </login-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard } from "@/components";
import { apiInstance } from "@/api/index.js";

const api = apiInstance();

export default {
  components: {
    LoginCard,
  },
  bodyClass: "login-page",
  data() {
    return {
      user: {
        userinfo_nick: "",
        userinfo_id: "",
        userinfo_password: "",
      },
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/main.jpg"),
    },
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
  },
  methods: {
    async join() {
      await api.post(`/user/join`, this.user).then(({ data }) => {
        this.$router.push({ name: "login" });
      });
    },
  },
};
</script>

<style lang="css"></style>
