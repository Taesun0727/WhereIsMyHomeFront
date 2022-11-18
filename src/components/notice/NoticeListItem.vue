<template>
  <md-table-row>
    <md-table-cell md-numeric>{{ notice.notice_num }}</md-table-cell>
    <md-table-cell md-numeric
      ><router-link :to="{ name: 'noticeview', params: { noticeNum: notice.notice_num } }">{{
        notice.notice_title
      }}</router-link></md-table-cell
    >
    <md-table-cell md-numeric>{{ notice.notice_register_date }}</md-table-cell>
    <md-table-cell md-numeric>{{ notice.notice_hit }}</md-table-cell>
    <md-button
      class="md-info"
      v-if="userInfo.userinfo_level === 1"
      :to="{ name: 'noticemodify', params: { noticeNum: notice.notice_num } }"
      >수정</md-button
    >
    <md-button
      class="md-rose"
      v-if="userInfo.userinfo_level === 1"
      :to="{ name: 'noticedelete', params: { noticeNum: notice.notice_num } }"
      >삭제</md-button
    >
  </md-table-row>
</template>

<script>
// import moment from "moment";

import { mapState } from "vuex";

const userStore = "userStore";

export default {
  name: "NoticeListItem",
  props: {
    notice: Object,
  },
  methods: {
    // ...mapActions(todoStore, ["updateTodoStatus", "deleteTodo"]),
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
  created() {
    //console.log(notice);
  },
  filters: {},
};
</script>

<style></style>
