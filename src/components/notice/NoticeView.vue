<template>
  <div class="container" style="transform: translate3d(0, -30%, 0);">
    <div v-if="userInfo.userinfo_level === 1" style="text-align: right;">
      <md-button class="md-info" :to="{ name: 'noticemodify', params: { noticeNum: notice.notice_num } }"
        >수정</md-button
      >
      <md-button class="md-rose" :to="{ name: 'noticedelete', params: { noticeNum: notice.notice_num } }"
        >삭제</md-button
      >
    </div>
    <h1 style="text-align: center;">{{ notice.notice_title }}</h1>
    <small style="text-align: right;">{{ notice.notice_register_date }}</small>
    <hr style="width: 100%;" />
    <h4>
      <label v-html="notice.notice_content"></label>
    </h4>

    <md-button :to="{ name: 'noticelist' }" style="text-align: center;">목록</md-button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
const noticeStore = "noticeStore";
const userStore = "userStore";

export default {
  name: "QaView",
  data() {
    return {};
  },
  methods: {
    ...mapActions(noticeStore, ["ReadNotice"]),
  },
  computed: {
    ...mapState(noticeStore, ["notice"]),
    ...mapState(userStore, ["userInfo"]),
  },
  created() {
    this.ReadNotice(this.$route.params.noticeNum);
  },
};
</script>

<style scoped>
.wrapper {
  transform: translate3d(0, -60%, 0);
}
.small {
  text-align: right;
}
h5 {
  text-align: right;
}
</style>
