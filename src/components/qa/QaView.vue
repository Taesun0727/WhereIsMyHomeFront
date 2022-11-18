<template>
  <div class="wrapper">
    <h1>{{ qna.qa_title }}</h1>
    <h5>{{ qna.qa_title }}</h5>
    <h4>
      {{ qna.qa_title }}
    </h4>
    <hr />
    <div v-if="qna.qa_status == 1">
      <h5>{{ answer.qa_register_date }}</h5>
      <h4>{{ answer.qa_content }}</h4>
    </div>
    <div v-else>
      <h3 v-if="userInfo.userinfo_level == 2">답변 준비중입니다.</h3>
      <div v-else>
        <vue-editor v-model="inputQna.qa_content" />
        <md-button class="md-success" style="float: right;" @click="write()">등록</md-button>
      </div>
    </div>
    <md-button :to="{ name: 'qalist' }">목록</md-button>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapActions, mapState } from "vuex";
const qnaStore = "qnaStore";
const userStore = "userStore";

export default {
  name: "QaView",
  components: { VueEditor },
  data() {
    return {
      inputQna: {
        userinfo_num: "",
        qa_content: "",
        qa_question_num: "",
      },
    };
  },
  methods: {
    ...mapActions(qnaStore, ["ReadQna", "GetAnswer", "WriteAnswer"]),
    write() {
      this.WriteAnswer(this.inputQna);
      alert("작성완료");
      this.moveList();
    },
    moveList() {
      this.$router.push({ name: "qalist" });
    },
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
    ...mapState(qnaStore, ["qna", "answer"]),
  },
  created() {
    this.ReadQna(this.$route.params.qnaNum);
    if (this.qna.qa_status == 1) {
      this.GetAnswer(this.qna.qa_num);
    }
    this.inputQna.userinfo_num = this.userInfo.userinfo_num;
    this.inputQna.qa_question_num = this.$route.params.qnaNum;
  },
};
</script>

<style scoped>
.wrapper {
  transform: translate3d(0, -60%, 0);
  text-align: center;
}
h5 {
  text-align: right;
}
</style>
