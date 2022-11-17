import Vue from "vue";
import Router from "vue-router";
import Index from "@/views/Index.vue";
import Landing from "@/views/Landing.vue";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import MainNavbar from "@/layout/MainNavbar.vue";
import MainFooter from "@/layout/MainFooter.vue";
import Join from "@/views/Join.vue";
<<<<<<< src/router.js
import AppNotice from "@/views/AppNotice"
=======
import Notice from "@/views/AppNotice.vue";

import Qa from "@/views/AppQa.vue";
import QaList from "@/components/qa/QaList.vue"
import QaWrite from "@/components/qa/QaWrite.vue"
import QaDelete from "@/components/qa/QaDelete.vue"
import QaModify from "@/components/qa/QaModify.vue"
import QaView from "@/components/qa/QaView.vue"

>>>>>>> src/router.js

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      components: { default: Index, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/landing",
      name: "landing",
      components: { default: Landing, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/login",
      name: "login",
      components: { default: Login, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/join",
      name: "join",
      components: { default: Join, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/profile",
      name: "profile",
      components: { default: Profile, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/notice",
      name: "notice",
      components: { default: Notice, header: MainNavbar, footer: MainFooter},
      // children: []
    },
    {
      path: "/qa",
      name: "qa",
      components: { default: Qa, header: MainNavbar, footer: MainFooter },
      redirect: "/qa/list",
      children: [
        {
          path: "list",
          name: "qalist",
          component: QaList
        },
        {
          path: "write",
          name: "qawrite",
          component: QaWrite
        },
        {
          path: "delete",
          name: "qadelete",
          component: QaDelete
        },
        {
          path: "modify",
          name: "qamodify",
          component: QaModify
        },
        {
          path: "view",
          name: "qaview",
          component: QaView
        }
      ],
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
