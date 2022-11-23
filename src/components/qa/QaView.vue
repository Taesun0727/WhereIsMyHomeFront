<template>
  <div class="wrapper">
    <md-card>
      <h1 class="title" style="display: inline-block;">Q.</h1>
      <h2 style="display: inline-block;">{{ qna.qa_title }}</h2>
      <h5>{{ qna.qa_register_date }}</h5>
      <h4>
        <label v-html="qna.qa_content"></label>
      </h4>
    </md-card>

    <md-card>
      <h1 class="title" style="display: inline-block;">A.</h1>
      <div v-if="qna.qa_status == 1" style="display: inline-block;">
        <!-- <h5>{{ answer.qa_register_date }}</h5> -->
        <h3 style="display: inline-block;">
          <label v-html="answer.qa_content"></label>
        </h3>
      </div>
      <div v-else style="display: inline-block;">
        <h3 v-if="userInfo.userinfo_level == 2">답변 준비중입니다.</h3>
        <div v-else>
          <vue-editor v-model="inputQna.qa_content" />
          <md-button class="md-success" style="float: right;" @click="write()">등록</md-button>
        </div>
      </div>
    </md-card>
    <diV style="text-align: center;">
      <md-button :to="{ name: 'qalist' }" style="text-align: center;">목록</md-button>
    </diV>
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
  transform: translate3d(0, -30%, 0);
}
h5 {
  text-align: right;
}

.md-card {
  padding: 15px;
}
</style>
