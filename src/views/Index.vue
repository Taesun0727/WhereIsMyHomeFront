<template>
  <div class="wrapper">
    <parallax class="page-header header-filter" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="image-wrapper">
            <div class="brand">
              <h2 class="title" style="font-size: 55px; color: #413e53;">어떤 집을 찾고 계신가요?</h2>

              <VueInputUi
                v-model="search"
                label="원하시는 아파트명을 입력해주세요"
                style="width: 80%; display: inline-block;"
              ></VueInputUi>
              <md-button style="margin-top: 0px;" @click="go(search)"><i class="material-icons">search</i></md-button>
            </div>
          </div>
        </div>
      </div>
    </parallax>
    <div
      class="main main-raised"
      style="width: 75%; margin: 0 auto; transform: translate3d(0px, -10%, 0px); padding: 0 10px; text-align: center;"
    >
      <!-- <div class="section section-white"> -->
      <!-- <div class="container">
        <nav-pills></nav-pills>
      </div> -->

      <md-card class="md-layout-item md-xlarge-size-15 md-large-size-20 md-medium-size-45  md-xsmall-size-100">
        <img class="imag" src="@/assets/img/apartments.png" />
        <h3>매물검색</h3>
        <hr />
        <h4>아파트 거래 내역이 궁금하신가요?</h4>
      </md-card>
      <md-card
        class="md-layout-item md-xlarge-size-15 
      md-large-size-20 md-medium-size-45  md-xsmall-size-100"
        ><img class="imag" src="@/assets/img/notice.png" />
        <h3>공지사항</h3>
        <hr />
        <h4>무슨 일이 있는지 확인해보세요!</h4></md-card
      >
      <md-card
        class="md-layout-item md-xlarge-size-15 
      md-large-size-20 md-medium-size-45  md-xsmall-size-100"
        ><img class="imag" src="@/assets/img/favorite.png" />
        <h3>관심 아파트</h3>
        <hr />
        <h4>당신의 관심 아파트는 어디인가요?</h4></md-card
      >
      <md-card class="md-layout-item md-xlarge-size-15 md-large-size-20 md-medium-size-45  md-xsmall-size-100"
        ><img class="imag" src="@/assets/img/mypage.png" />
        <h3>내 정보</h3>
        <hr />
        <h4>당신의 정보를 확인 해보세요!</h4></md-card
      >
      <md-card class="md-layout-item md-xlarge-size-15 md-large-size-20 md-medium-size-45 md-xsmall-size-100"
        ><img class="imag" src="@/assets/img/news.png" />
        <h3>뉴스</h3>
        <hr />
        <h4>들어보세요. 무언가 심상치 않은 일이 벌어지고 있습니다.</h4></md-card
      >
      <md-card class="md-layout-item md-xlarge-size-15 md-large-size-20 md-medium-size-45 md-xsmall-size-100"
        ><img class="imag" src="@/assets/img/ask.png" />
        <h3>Q & A</h3>
        <hr />
        <h4>저희가 도와드릴게요.</h4></md-card
      >
    </div>
    <div>
      <div></div>
    </div>
  </div>
</template>

<script>
import VueInputUi from "vue-input-ui";
import "vue-input-ui/dist/vue-input-ui.css";

export default {
  components: {
    // NavPills,
    VueInputUi,
  },
  name: "index",
  bodyClass: "index-page",
  props: {
    image: {
      type: String,
      default: require("@/assets/img/main.jpg"),
    },
    signup: {
      type: String,
      default: require("@/assets/img/city.jpg"),
    },
    landing: {
      type: String,
      default: require("@/assets/img/landing.jpg"),
    },
    profile: {
      type: String,
      default: require("@/assets/img/profile.jpg"),
    },
  },
  data() {
    return {
      firstname: null,
      email: null,
      password: null,
      leafShow: false,
      search: "",
      buttonSettings: {
        label: "Save",
        color: "success",
        position: "right",
        size: "default",
      },
    };
  },
  methods: {
    leafActive() {
      if (window.innerWidth < 768) {
        this.leafShow = false;
      } else {
        this.leafShow = true;
      }
    },
    go(search) {
      this.$router.push({ name: "house", params: { search: search } });
    },
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.image})`,
        height: "500px",
      };
    },
    signupImage() {
      return {
        backgroundImage: `url(${this.signup})`,
      };
    },
  },
  mounted() {
    this.leafActive();
    window.addEventListener("resize", this.leafActive);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.leafActive);
  },
};
</script>
<style scoped>
@media all and (min-width: 991px) {
  .btn-container {
    display: flex;
  }
}

.page-header {
  height: 380px;
}
.md-card {
  text-align: center;
  margin: 30px 10px;
  height: 260px;
  overflow: hidden;
}
.md-card:hover {
  transform: translate3d(0, -5%, 0);
}
.imag {
  width: 106px;
  margin-top: 20px;
}
.container {
  padding: 0;
  margin: 10px;
  padding: 10px 0;
}

h3 {
  font-size: 22px;
  font-weight: 400;
  margin-top: 7px;
}

hr {
  height: 1px;
  border: none;
  background-color: #99aab5;
  opacity: 0.5;
  width: 50px;
  margin: -6px auto 20px;
}

h4 {
  font-size: 14px;
  font-weight: 400;
  margin: -10px auto 0;
  color: #68727e;
}
</style>
