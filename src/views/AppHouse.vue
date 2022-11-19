<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle"></parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-75 mx-auto">
              <title-component :title="title"></title-component>
            </div>
            <div class="md-layout-item md-size-100 mx-auto">
              <!-- <router-view style="transform: translate3d(0, -20%, 0);"></router-view> -->

              <div class="md-layout-item md-size-100 md-small-size-100" style="transform: translate3d(0, -50%, 0);">
                <tabs
                  :tab-name="['Apt검색', 'Bookmark']"
                  :tab-icon="['dashboard', 'schedule']"
                  plain
                  nav-pills-icons
                  color-button="info"
                >
                  <!-- here you can add your content for tab-content -->
                  <template slot="tab-pane-1">
                    <md-card>
                      <md-card-actions>
                        <div class="md-layout" style="display : block;">asdasd</div>
                        <div class="md-layout" style="display: block;">
                          <div class="md-layout-item md-size-30">
                            <md-card>asd</md-card>
                          </div>
                          <div class="md-size-70">
                            <kakao-map></kakao-map>
                          </div>
                        </div>
                      </md-card-actions>
                    </md-card>
                  </template>
                  <template slot="tab-pane-2">
                    <md-card>
                      <md-card-actions class="md-size-100">
                        <md-button>Action</md-button>
                        <md-button>Action</md-button>
                      </md-card-actions>
                    </md-card>
                  </template>
                </tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleComponent from "../components/TitleComponent.vue";
import { Tabs } from "@/components";
import KakaoMap from "../components/kakaoMap.vue";
export default {
  name: "house",
  data() {
    return {
      title: "House",
    };
  },
  components: {
    TitleComponent,
    Tabs,
    KakaoMap,
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
};
</script>

<style scoped>
.page-header {
  height: 200px;
}
</style>
