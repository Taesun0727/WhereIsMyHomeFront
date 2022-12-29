<template>
  <div class="wrapper">
    <h1>삭제 처리중...</h1>
  </div>
</template>

<script>
import { mapActions } from "vuex";
const noticeStore = "noticeStore";

export default {
  name: "NoticeDelete",
  data() {
    return {};
  },
  methods: {
    ...mapActions(noticeStore, ["DeleteNotice"]),
  },
  async created() {
    await this.DeleteNotice(this.$route.params.noticeNum);
    this.$router.push({ name: "noticelist" });
  },
};
</script>

<style scoped>
/* .wrapper {
  transform: translate3d(0, -60%, 0);
  text-align: center;
}
.small {
  text-align: right;
}
h5 {
  text-align: right;
} */
</style>
