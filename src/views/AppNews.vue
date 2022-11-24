<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle" style="height:380px"></parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-100 mx-auto">
              <title-component :title="title"></title-component>
              <div class="md-layout md-gutter" style="transform: translate3d(0, -20%, 0);">
                <a
                  :href="info.link"
                  target="_blank"
                  v-for="info in infos"
                  :key="info.link"
                  :info="info"
                  class="md-layout-item md-xlarge-size-20 
        md-large-size-20 md-medium-size-45  md-xsmall-size-100"
                >
                  <md-card style="overflow: hidden; height: 300px; margin: 15px;" class="md-size-100"
                    ><img class="imag" src="@/assets/img/news.png" />
                    <h4><label v-html="info.title"></label></h4>
                    <!-- <hr />
                  <h5><label v-html="info.description"></label></h5> -->
                  </md-card>
                </a>
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
import http from "@/api/http.js";

export default {
  name: "news",
  data() {
    return {
      title: "NEWS",
      infos: [
        {
          title: "",
          originallink: "",
          link: "",
          description: "",
          pubDate: "",
        },
      ],
    };
  },
  components: {
    TitleComponent,
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
  created() {
    http.get(`/naver`).then(({ data }) => (this.infos = data.items));
  },
};
</script>

<style>
.page-header {
  height: 380px;
}
</style>
