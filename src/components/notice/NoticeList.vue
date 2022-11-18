<template>
  <div>
    <md-button
      class="md-primary"
      style="float: right;"
      :to="{ name: 'noticewrite' }"
      v-if="userInfo.userinfo_level === 1"
      >작성하기</md-button
    >
    <md-table md-card>
      <md-table-row>
        <md-table-head md-numeric>번호</md-table-head>
        <md-table-head>제목</md-table-head>
        <md-table-head>날짜</md-table-head>
        <md-table-head>조회수</md-table-head>
        <md-table-head v-if="userInfo.userinfo_level === 1">비고</md-table-head>
      </md-table-row>
      <notice-list-item v-for="notice in notices" :key="notice.notice_num" :notice="notice"></notice-list-item>
    </md-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import NoticeListItem from "./NoticeListItem.vue";

const userStore = "userStore";
const noticeStore = "noticeStore";

export default {
  name: "NoticeList",
  components: { NoticeListItem },
  data() {
    return {};
  },
  methods: {
    ...mapActions(noticeStore, ["GetNotices"]),
    updatePagination(page, pageSize, sort, sortOrder) {
      console.log("pagination has updated", page, pageSize, sort, sortOrder);
    },
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
    ...mapState(noticeStore, ["notices"]),
  },
  created() {
    this.GetNotices();
  },
};
</script>

<style scoped></style>
