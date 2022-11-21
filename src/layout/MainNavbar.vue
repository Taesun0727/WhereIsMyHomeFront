<template>
  <md-toolbar id="toolbar" md-elevation="0" class="md-absolute md-white" :class="extraNavClasses">
    <div class="md-toolbar-row md-collapse-lateral">
      <div class="md-toolbar-section-start">
        <md-list-item :to="{ name: 'index' }">
          <i class="material-icons">home</i>
          <p>해피하우스</p>
        </md-list-item>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: toggledClass }"
          @click="toggleNavbarMobile()"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <div class="md-collapse-wrapper">
            <mobile-menu nav-mobile-section-start="false">
              <!-- Here you can add your items from the section-start of your toolbar -->
            </mobile-menu>
            <md-list>
              <md-list-item :to="{ name: 'house' }">
                <i class="material-icons">house</i>
                <p>House</p>
              </md-list-item>

              <md-list-item :to="{ name: 'notice' }">
                <i class="material-icons">content_paste</i>
                <p>notice</p>
              </md-list-item>

              <md-list-item :to="{ name: 'qa' }" class="md-e-5">
                <i class="material-icons">content_paste</i>
                <p>Q & A</p>
              </md-list-item>

              <md-list v-if="isLogin">
                <md-list-item :to="{ name: 'mypage' }">
                  <i class="material-icons">account_circle</i>
                  <p class="hidden-lg">MyPage</p>
                  <md-tooltip md-direction="bottom">move to MyPage</md-tooltip>
                </md-list-item>

                <md-list-item @click.prevent="onClickLogout">
                  <i class="material-icons">logout</i>
                  <p class="hidden-lg">Logout</p>
                  <md-tooltip md-direction="bottom">move to logout</md-tooltip>
                </md-list-item>
              </md-list>

              <md-list-item :to="{ name: 'login' }" v-else>
                <i class="material-icons">login_variant</i>
                <p class="hidden-lg">Login</p>
                <md-tooltip md-direction="bottom">move to login</md-tooltip>
              </md-list-item>
            </md-list>
          </div>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
let resizeTimeout;
function resizeThrottler(actualResizeHandler) {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();

      // The actualResizeHandler will execute at a rate of 15fps
    }, 66);
  }
}

import MobileMenu from "@/layout/MobileMenu";
import { mapState, mapGetters, mapActions } from "vuex";

const userStore = "userStore";

export default {
  components: {
    MobileMenu,
  },
  props: {
    type: {
      type: String,
      default: "white",
      validator(value) {
        return ["white", "default", "primary", "danger", "success", "warning", "info"].includes(value);
      },
    },
    colorOnScroll: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      extraNavClasses: "",
      toggledClass: false,
    };
  },
  computed: {
    ...mapState(userStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
    showDownload() {
      const excludedRoutes = ["login", "landing", "profile", "notice", "qa", "mypage"];
      return excludedRoutes.every((r) => r !== this.$route.name);
    },
  },
  methods: {
    ...mapActions(userStore, ["userLogout"]),
    onClickLogout() {
      // this.SET_IS_LOGIN(false);
      // this.SET_USER_INFO(null);
      // sessionStorage.removeItem("access-token");
      // if (this.$route.path != "/") this.$router.push({ name: "main" });
      console.log(this.userInfo);
      //vuex actions에서 userLogout 실행(Backend에 저장 된 리프레시 토큰 없애기
      //+ satate에 isLogin, userInfo 정보 변경)
      // this.$store.dispatch("userLogout", this.userInfo.userid);
      this.userLogout(this.userInfo.userid);
      sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
      sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
      if (this.$route.path != "/") this.$router.push({ name: "index" });
    },
    bodyClick() {
      let bodyClick = document.getElementById("bodyClick");

      if (bodyClick === null) {
        let body = document.querySelector("body");
        let elem = document.createElement("div");
        elem.setAttribute("id", "bodyClick");
        body.appendChild(elem);

        let bodyClick = document.getElementById("bodyClick");
        bodyClick.addEventListener("click", this.toggleNavbarMobile);
      } else {
        bodyClick.remove();
      }
    },
    toggleNavbarMobile() {
      this.NavbarStore.showNavbar = !this.NavbarStore.showNavbar;
      this.toggledClass = !this.toggledClass;
      this.bodyClick();
    },
  },
};
</script>
