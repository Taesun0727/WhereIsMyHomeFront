import Vue from "vue";
import Router from "vue-router";
import Index from "@/views/Index.vue";
import Landing from "@/views/Landing.vue";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import MainNavbar from "@/layout/MainNavbar.vue";
import MainFooter from "@/layout/MainFooter.vue";
import Join from "@/views/Join.vue";
import MyPage from "@/views/MyPage.vue";

import News from "@/views/AppNews.vue";
import House from "@/views/AppHouse.vue";

import Notice from "@/views/AppNotice.vue";
import NoticeList from "@/components/notice/NoticeList.vue"
import NoticeView from "@/components/notice/NoticeView.vue"
import NoticeWrite from "@/components/notice/NoticeWrite.vue"
import NoticeDelete from "@/components/notice/NoticeDelete.vue"
import NoticeModify from "@/components/notice/NoticeModify.vue"

import Qa from "@/views/AppQa.vue";
import QaList from "@/components/qa/QaList.vue"
import QaWrite from "@/components/qa/QaWrite.vue"
import QaDelete from "@/components/qa/QaDelete.vue"
import QaModify from "@/components/qa/QaModify.vue"
import QaView from "@/components/qa/QaView.vue"

Vue.use(Router);

import store from "@/store";

const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["user/checkUserInfo"];
  const checkToken = store.getters["user/checkToken"];
  let token = sessionStorage.getItem("access-token");
  console.log("로그인 처리 전", checkUserInfo, token);

  if (checkUserInfo != null && token) {
    console.log("토큰 유효성 체크하러 가자!!!!");
    await store.dispatch("memberStore/getUserInfo", token);
  }
  if (!checkToken || checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "login" });
    router.push({ name: "login" });
  } else {
    console.log("로그인 했다!!!!!!!!!!!!!.");
    next();
  }
};

export default new Router({
  mode: "history",
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
      path: "/kakaologin",
      name: "kakaologin",
      component : () => import("@/views/KakaoLogin.vue")
      // components: { default: Kakaologin, header: MainNavbar, footer: MainFooter },
      // props: {
      //   header: { colorOnScroll: 400 }
      // }
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
      path: "/mypage",
      name: "mypage",
      components: { default: MyPage, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/news",
      name: "news",
      components: { default: News, header: MainNavbar, footer: MainFooter },
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
      path: "/house",
      name: "house",
      components: { default: House, header: MainNavbar },
    },
    {
      path: "/notice",
      name: "notice",
      components: { default: Notice, header: MainNavbar, footer: MainFooter },
      redirect: "/notice/list",
      children: [
        {
          path: "list",
          name: "noticelist",
          component: NoticeList
        },
        {
          path: "write",
          name: "noticewrite",
          component: NoticeWrite
        },
        {
          path: "delete",
          name: "noticedelete",
          component: NoticeDelete
        },
        {
          path: "modify",
          name: "noticemodify",
          component: NoticeModify
        },
        {
          path: "view",
          name: "noticeview",
          component: NoticeView
        }
      ]
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

});

// import Vue from "vue";
// import Router from "vue-router";
// import Index from "@/views/Index.vue";
// import Landing from "@/views/Landing.vue";
// import Login from "@/views/Login.vue";
// import Profile from "@/views/Profile.vue";
// import MainNavbar from "@/layout/MainNavbar.vue";
// import MainFooter from "@/layout/MainFooter.vue";
// import Join from "@/views/Join.vue";
// import MyPage from "@/views/MyPage.vue";

// import News from "@/views/AppNews.vue";
// import House from "@/views/AppHouse.vue";

// import Notice from "@/views/AppNotice.vue";
// import NoticeList from "@/components/notice/NoticeList.vue"
// import NoticeView from "@/components/notice/NoticeView.vue"
// import NoticeWrite from "@/components/notice/NoticeWrite.vue"
// import NoticeDelete from "@/components/notice/NoticeDelete.vue"
// import NoticeModify from "@/components/notice/NoticeModify.vue"

// import Qa from "@/views/AppQa.vue";
// import QaList from "@/components/qa/QaList.vue"
// import QaWrite from "@/components/qa/QaWrite.vue"
// import QaDelete from "@/components/qa/QaDelete.vue"
// import QaModify from "@/components/qa/QaModify.vue"
// import QaView from "@/components/qa/QaView.vue"

// Vue.use(Router);

// import store from "@/store";

// const onlyAuthUser = async (to, from, next) => {
//   const checkUserInfo = store.getters["user/checkUserInfo"];
//   const checkToken = store.getters["user/checkToken"];
//   let token = sessionStorage.getItem("access-token");
//   console.log("로그인 처리 전", checkUserInfo, token);

//   if (checkUserInfo != null && token) {
//     console.log("토큰 유효성 체크하러 가자!!!!");
//     await store.dispatch("memberStore/getUserInfo", token);
//   }
//   if (!checkToken || checkUserInfo === null) {
//     alert("로그인이 필요한 페이지입니다..");
//     // next({ name: "login" });
//     router.push({ name: "login" });
//   } else {
//     console.log("로그인 했다!!!!!!!!!!!!!.");
//     next();
//   }
// };


// const routes = [
//   {
//     path: "/",
//     name: "index",
//     components: { default: Index, header: MainNavbar, footer: MainFooter },
//     props: {
//       header: { colorOnScroll: 400 },
//       footer: { backgroundColor: "black" }
//     }
//   },
//   {
//     path: "/landing",
//     name: "landing",
//     components: { default: Landing, header: MainNavbar, footer: MainFooter },
//     props: {
//       header: { colorOnScroll: 400 },
//       footer: { backgroundColor: "black" }
//     }
//   },
//   {
//     path: "/login",
//     name: "login",
//     components: { default: Login, header: MainNavbar, footer: MainFooter },
//     props: {
//       header: { colorOnScroll: 400 }
//     }
//   },
//   {
//     path: "/kakaologin",
//     name: "kakaologin",
//     component: () => import("@/views/KakaoLogin.vue")
//     // components: { default: Kakaologin, header: MainNavbar, footer: MainFooter },
//     // props: {
//     //   header: { colorOnScroll: 400 }
//     // }
//   },
//   {
//     path: "/join",
//     name: "join",
//     components: { default: Join, header: MainNavbar, footer: MainFooter },
//     props: {
//       header: { colorOnScroll: 400 }
//     }
//   },
//   {
//     path: "/mypage",
//     name: "mypage",
//     beforeEnter: onlyAuthUser,
//     components: { default: MyPage, header: MainNavbar, footer: MainFooter },
//     props: {
//       header: { colorOnScroll: 400 }
//     }
//   },
//   {
//     path: "/news",
//     name: "news",
//     components: { default: News, header: MainNavbar, footer: MainFooter },
//     props: {
//       header: { colorOnScroll: 400 }
//     }
//   },
//   {
//     path: "/profile",
//     name: "profile",
//     beforeEnter: onlyAuthUser,
//     components: { default: Profile, header: MainNavbar, footer: MainFooter },
//     props: {
//       header: { colorOnScroll: 400 },
//       footer: { backgroundColor: "black" }
//     }
//   },
//   {
//     path: "/house",
//     name: "house",
//     components: { default: House, header: MainNavbar },
//   },
//   {
//     path: "/notice",
//     name: "notice",
//     components: { default: Notice, header: MainNavbar, footer: MainFooter },
//     redirect: "/notice/list",
//     children: [
//       {
//         path: "list",
//         name: "noticelist",
//         component: NoticeList
//       },
//       {
//         path: "write",
//         name: "noticewrite",
//         component: NoticeWrite
//       },
//       {
//         path: "delete",
//         name: "noticedelete",
//         component: NoticeDelete
//       },
//       {
//         path: "modify",
//         name: "noticemodify",
//         component: NoticeModify
//       },
//       {
//         path: "view",
//         name: "noticeview",
//         component: NoticeView
//       }
//     ]
//   },
//   {
//     path: "/qa",
//     name: "qa",
//     components: { default: Qa, header: MainNavbar, footer: MainFooter },
//     redirect: "/qa/list",
//     children: [
//       {
//         path: "list",
//         name: "qalist",
//         beforeEnter: onlyAuthUser,
//         component: QaList
//       },
//       {
//         path: "write",
//         name: "qawrite",
//         beforeEnter: onlyAuthUser,
//         component: QaWrite
//       },
//       {
//         path: "delete",
//         name: "qadelete",
//         beforeEnter: onlyAuthUser,
//         component: QaDelete
//       },
//       {
//         path: "modify",
//         name: "qamodify",
//         beforeEnter: onlyAuthUser,
//         component: QaModify
//       },
//       {
//         path: "view",
//         name: "qaview",
//         beforeEnter: onlyAuthUser,
//         component: QaView
//       }
//     ],
//     props: {
//       header: { colorOnScroll: 400 },
//       footer: { backgroundColor: "black" }
//     }
//   }
// ];
// const router = new Router({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes,
// });

// export default router;
