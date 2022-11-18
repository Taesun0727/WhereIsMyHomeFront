<template>
  <div class="wrapper">
    <h1>{{ notice.notice_title }}</h1>
    <small>{{ notice.notice_register_date }}</small>
    <h4>
      {{ notice.notice_content }}
    </h4>

    <md-button :to="{ name: 'noticelist' }">목록</md-button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
const noticeStore = "noticeStore";

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
  },
  created() {
    this.ReadNotice(this.$route.params.noticeNum);
  },
};
</script>

<style scoped>
.wrapper {
  transform: translate3d(0, -60%, 0);
  text-align: center;
}
.small {
  text-align: right;
}
h5 {
  text-align: right;
}
</style>
