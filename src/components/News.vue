<template>
  <div>
    <div style="padding: 20px; text-align: center; width: 100%; height: 100px;">
      <h3 class="title">News</h3>
    </div>
    <hr style="border: 0.5px solid rgb(225, 225, 225);" />
    <md-table md-card>
      <md-table-row v-for="info in infos" :key="info.link" :info="info">
        <a :href="info.link" target="_blank" style="color: black;"
          ><md-table-cell md-label="Title" v-html="info.title"></md-table-cell
        ></a>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import http from "@/api/http.js";
export default {
  name: "News",
  data() {
    return {
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
