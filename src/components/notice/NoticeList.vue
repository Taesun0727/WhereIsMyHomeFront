<template>
  <div style="transform: translate3d(0, -8%, 0);">
    <md-button
      class="md-primary"
      style="float: right; transform: translate3d(0, -150%, 0);"
      :to="{ name: 'noticewrite' }"
      v-if="userInfo.userinfo_level === 1"
      >작성하기</md-button
    >
    <ul>
      <li
        class="list"
        v-for="notice in notices"
        :key="notice.notice_num"
        :notice="notice"
        @click="go(notice.notice_num)"
      >
        <h3 class="title">{{ notice.notice_title }}</h3>
        <small>{{ notice.notice_register_date }}</small>
        <hr />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

const userStore = "userStore";
const noticeStore = "noticeStore";

export default {
  name: "NoticeList",
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions(noticeStore, ["GetNotices"]),
    updatePagination(page, pageSize, sort, sortOrder) {
      console.log("pagination has updated", page, pageSize, sort, sortOrder);
    },
    go(noticeNum) {
      this.$router.push({ name: "noticeview", params: { noticeNum: noticeNum } });
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

<style scoped>
.list {
  cursor: pointer;
}
ul {
  list-style: none;
}
</style>
