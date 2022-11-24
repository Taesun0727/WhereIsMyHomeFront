<template>
  <div style="transform: translate3d(0, -15%, 0); height: 1000px;">
    <div style="text-align: right;">
      <md-button
        class="md-primary"
        style="text-align: right;"
        :to="{ name: 'qawrite' }"
        v-if="userInfo.userinfo_level === 2"
        >문의하기</md-button
      >
    </div>
    <ul>
      <li class="list" v-for="qna in qnas" :key="qna.qa_num" :qna="qna" @click="go(qna.qa_num)">
        <span class="badge badge-default" v-if="qna.qa_status == 0">답변준비중</span
        ><span class="badge badge-success" v-else>답변완료</span>
        <h3 class="title">{{ qna.qa_title }}</h3>
        <small>{{ qna.qa_register_date }}</small>
        <hr />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
const userStore = "userStore";
const qnaStore = "qnaStore";

export default {
  name: "QaList",
  components: {},
  data: () => ({}),
  methods: {
    ...mapActions(qnaStore, ["GetMyQnas", "GetAllQnas"]),
    updatePagination(page, pageSize, sort, sortOrder) {
      console.log("pagination has updated", page, pageSize, sort, sortOrder);
    },
    go(qaNum) {
      this.$router.push({ name: "qaview", params: { qnaNum: qaNum } });
    },
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
    ...mapState(qnaStore, ["qnas"]),
  },
  created() {
    if (this.userInfo.userinfo_level == 1) {
      this.GetAllQnas();
    } else if (this.userInfo.userinfo_level == 2) {
      this.GetMyQnas(this.userInfo.userinfo_num);
    } else {
    }
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}
span {
  float: right;
}
</style>
