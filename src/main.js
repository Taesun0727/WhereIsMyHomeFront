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

window.Kakao.init("1f3b1fef29a58d3928a1e245c9aca7fc");