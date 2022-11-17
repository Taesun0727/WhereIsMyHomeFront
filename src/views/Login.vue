<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto">
            <login-card header-color="green">
              <h4 slot="title" class="card-title">Login</h4>
              <md-button slot="buttons" href="javascript:void(0)" class="md-just-icon md-simple md-white">
                <i class="fab fa-facebook-square"></i>
              </md-button>
              <md-button slot="buttons" href="javascript:void(0)" class="md-just-icon md-simple md-white">
                <i class="fab fa-twitter"></i>
              </md-button>
              <md-button slot="buttons" href="javascript:void(0)" class="md-just-icon md-simple md-white">
                <i class="fab fa-google-plus-g"></i>
              </md-button>
              <p slot="description" class="description">Or Be Classical</p>
              <!-- <md-field class="md-form-group" slot="inputs">
                <md-icon>face</md-icon>
                <label>First Name...</label>
                <md-input v-model="firstname"></md-input>
              </md-field> -->
              <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>Email...</label>
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
              <md-button href="#/Join" slot="footer" class="md-simple md-success md-lg">
                Sign Up
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
import { mapState, mapActions } from "vuex";

const userStore = "userStore";

export default {
  components: {
    LoginCard,
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
  props: {
    header: {
      type: String,
      default: require("@/assets/img/profile_city.jpg"),
    },
  },
  computed: {
    ...mapState(userStore, ["isLogin", "isLoginError", "userInfo"]),
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
  },
  methods: {
    ...mapActions(userStore, ["userConfirm", "getUserInfo"]),
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
  },
};
</script>

<style lang="css"></style>
