<template>
  <md-table-row class="md-size-100">
    <md-table-cell style="width: 10%"
      ><span class="badge badge-default" v-if="qa_status == 0">답변준비중</span
      ><span class="badge badge-success" v-else>답변완료</span></md-table-cell
    >
    <md-table-cell style="width: 70%"
      ><router-link :to="{ name: 'qaview', params: { qnaNum: qa_num } }">{{ qa_title }}</router-link></md-table-cell
    >
    <md-table-cell class="md-size-30">{{ qa_register_date }}</md-table-cell>
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
