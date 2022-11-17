<template>
  <md-table-row>
    <md-table-cell md-numeric>{{ qa_num }}</md-table-cell>
    <md-table-cell
      ><router-link :to="{ name: 'qaview', params: { articleno: qa_num } }">{{ qa_title }}</router-link></md-table-cell
    >
    <md-table-cell>{{ qa_register_date }}</md-table-cell>
    <md-table-cell>{{ qa_status | statusFormat }}</md-table-cell>
    <md-table-cell>
      <md-button class="md-info" :to="{ name: 'qamodify', params: { articleno: qa_num } }">수정</md-button>
      <md-button class="md-rose" :to="{ name: 'qadelete', params: { articleno: qa_num } }">삭제</md-button>
    </md-table-cell>
  </md-table-row>
</template>

<script>
// import moment from "moment";

export default {
  name: "QaListItem",
  props: {
    qa_num: Number,
    qa_title: String,
    qa_status: Number,
    qa_register_date: String,
  },
  filters: {
    // dateFormat(qa_regtime) {
    //   return moment(new Date(qa_regtime)).format("YY.MM.DD");
    // },
    statusFormat(qa_status) {
      if (qa_status == 1) {
        return "완료";
      } else {
        return "미완료";
      }
    },
  },
};
</script>

<style></style>
