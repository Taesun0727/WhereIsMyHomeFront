<template>
  <div>
    <div style="padding: 60px; text-align: center; width: 100%; height: 100px;">
      <h1>News</h1>
    </div>

    <hr style="border: 0.5px solid rgb(225, 225, 225);" />
    <md-table md-card>
      <md-table-row v-for="info in infos" :key="info.link" :info="info">
        <a :href="info.link" target="_blank" style="color: black;"
          ><md-table-cell md-label="Title" v-html="info.title"></md-table-cell
        ></a>
        <md-table-cell md-label="desc" v-html="info.description"></md-table-cell>

        <!-- <router-link :to="{name:'news', params: { newTitle: items.title } }" target="_blank" style="color: black;"
            ><md-table-cell md-label="Title" v-html="items.title"></md-table-cell
          ></router-link> -->
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import http from "@/api/http.js";
// import TitleComponent from "@/components/TitleComponent.vue";

const NewsStore = "NewsStore";

export default {
  name: "News",
  components: {
    // TitleComponent,
  },
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
  created() {
    http.get(`/naver`).then(({ data }) => (this.infos = data.items));
  },
};
</script>
<style>
.md-card:hover {
  cursor: pointer;
  background: red;
}
</style>
