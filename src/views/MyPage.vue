<template>
    <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto">
            <login-card header-color="red" v-if="userInfo" style="width:600px;">
              <h4 slot="title" class="card-title">My Page</h4>
              <p slot="description" class="description">User</p>

              <span slot="description" class="nickname">
                  <div style="display:flex; align-items:center;">
                    <h5>Nickname :</h5>
                    <h5 v-if="!isModify">{{userInfo.userinfo_nick}}</h5>
                    <md-field md-inline v-else>
                      <label>nickname</label>
                      <md-input style="width:70%;" v-model="userInfo.userinfo_nick"></md-input>
                      <md-button style="d-inline" @click="Modify">수정하기</md-button>
                    </md-field>
                  </div>
              </span>

              <span slot="description" class="id" v-if="!isPwModify">
                <div style="display:flex; align-items:center;">
                  <h4>ID : {{userInfo.userinfo_id}}</h4>
                </div>
              </span>

              
              <span slot="description" class="id" v-else>
                <div style="display:flex; align-items:center;">
                  <h5>PW : </h5>
                  <md-field>
                    <md-input style="d-inline" v-model="userInfo.userinfo_password" type="password"></md-input>
                  </md-field>
                  <md-button style="d-inline" @click="PwModify">수정하기</md-button>
                </div>
              </span>

              <md-button slot="footer" class="md-simple md-success md-lg" @click="isModify = !isModify">
                UserModify
              </md-button>
              <md-button href="/" slot="footer" class="md-simple md-success md-lg" @click="Delete">
                UserDelete
              </md-button>

              <md-button slot="footer" class="md-simple md-success md-lg" @click="isPwModify = !isPwModify">
                PasswordUpdate
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
  name: "MyPage",
  bodyClass: "login-page",
  data() {
    return {
      isModify: false,
      isPwModify: false,
      user: {
        userinfo_nick: null,
        userinfo_password: null,
        userinfo_id: null,
        userinfo_num: null,
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
    ...mapState(userStore, ["userInfo", "isLoginError", "isLogin", "isValidToken"]),
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
  },
  methods: {
    ...mapActions(userStore, ["userConfirm", "getUserInfo", "userDelete", "userModify", "userPwModify"]),
    async Delete(){
      await this.userDelete(this.userInfo.userinfo_num);

      if(this.userInfo){
        this.$router.push({name: "index"});
      }
    },
    async Modify(){
      console.log(this.userInfo);
      await this.userModify(this.userInfo);
      this.isModify = false;
    },
    async PwModify(){
      await this.userPwModify(this.userInfo);
      this.isPwModify = false;
    },
  },
}
</script>

<style>

</style>