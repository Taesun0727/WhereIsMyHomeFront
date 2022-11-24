import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vue-select/dist/vue-select.css";

import MaterialKit from "./plugins/material-kit";

Vue.config.productionTip = false;

Vue.use(MaterialKit);

const NavbarStore = {
  showNavbar: false
};

Vue.mixin({
  data() {
    return {
      NavbarStore
    };
  }
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");

window.Kakao.init("8a8e4361ef4ba871d6d6f591269b5cba");