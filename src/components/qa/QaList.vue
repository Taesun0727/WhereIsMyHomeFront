<template>
  <div>
    <md-button class="md-primary" style="float: right;" :to="{ name: 'qawrite' }">작성하기</md-button>
    <md-table md-card>
      <md-table-row>
        <md-table-head md-numeric>번호</md-table-head>
        <md-table-head>제목</md-table-head>
        <md-table-head>날짜</md-table-head>
        <md-table-head>상태</md-table-head>
        <md-table-head>비고</md-table-head>
      </md-table-row>

      <qa-list-item v-for="article in articles" :key="article.qa_num" v-bind="article"></qa-list-item>
    </md-table>
  </div>
</template>

<script>
import QaListItem from "./QaListItem.vue";
import axios from "@/api/http.js";
export default {
  name: "QaList",
  components: {
    QaListItem,
  },
  data: () => ({
    articles: [],
    paginatedUsers: [],
  }),
  methods: {
    updatePagination(page, pageSize, sort, sortOrder) {
      console.log("pagination has updated", page, pageSize, sort, sortOrder);
    },
  },
  created() {
    axios.get("/qa").then(({ data }) => {
      this.articles = data;
    });
  },
};
</script>

<style scoped></style>
