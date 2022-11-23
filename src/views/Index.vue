<template>
  <div class="wrapper">
    <parallax class="page-header header-filter" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="image-wrapper">
            <div class="brand">
              <h2 class="title" style="font-size: 55px; color: black;">어떤 집을 찾고 계신가요?</h2>

              <VueInputUi
                v-model="search"
                label="원하시는 아파트명을 입력해주세요"
                style="width: 80%; display: inline-block;"
              ></VueInputUi>
              <md-button style="margin-top: 0px;"><i class="material-icons">search</i></md-button>
            </div>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised md-size-50">
      <!-- <div class="section section-white"> -->
      <div class="container">
        <nav-pills></nav-pills>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import NavPills from "./components/NavPillsSection";
import VueInputUi from "vue-input-ui";
import "vue-input-ui/dist/vue-input-ui.css";

export default {
  components: {
    NavPills,
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
<style lang="scss">
.section-download {
  .md-button + .md-button {
    margin-left: 5px;
  }
}

@media all and (min-width: 991px) {
  .btn-container {
    display: flex;
  }
}

.page-header {
  height: 380px;
}
</style>
