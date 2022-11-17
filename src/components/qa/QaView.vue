<template>
  <div class="wrapper">
    <h1>{{ this.article.qa_title }}</h1>
    <h5>{{ this.article.qa_register_date }}</h5>
    <h4>
      {{ this.article.qa_content }}
    </h4>
    <hr />
    <div v-if="this.article.qa_status == 1">
      <h5>{{ this.answer.qa_register_date }}</h5>
      <h4>{{ this.answer.qa_content }}</h4>
    </div>
    <div v-else>
      <h3>답변 준비중입니다.</h3>
      <vue-editor v-model="answer.qa_content" />
      <md-button class="md-success" style="float: right;" @click="requestAnswer()">등록</md-button>
    </div>
    <md-button :to="{ name: 'qalist' }">목록</md-button>
  </div>
</template>

<script>
import axios from "@/api/http.js";
import { VueEditor } from "vue2-editor";

export default {
  name: "QaView",
  components: { VueEditor },
  data() {
    return {
      article: {
        qa_title: "",
        qa_content: "",
        qa_register_date: "",
        qa_status: "",
      },
      answer: {
        qa_question_num: "",
        qa_register_date: "",
        qa_content: "",
      },
    };
  },
  methods: {
    viewAnswer() {
      axios.get(`/qa/answer/${this.$route.params.articleno}`).then(({ data }) => {
        this.answer = data;
      });
    },
    requestAnswer() {
      axios.post(`/qa`, this.answer).then(({ data }) => {
        let msg = "등록 처리시 문제가 발생했습니다.";
        if (data === "success") {
          msg = "등록이 완료되었습니다.";
        }
        alert(msg);
        this.stateChange();
      });
    },
    stateChange() {
      axios.put(`/qa/complete/${this.$route.params.articleno}`).then(({ data }) => {
        let msg = "상태 변경시 문제가 발생했습니다.";
        if (data === "success") {
          msg = "상태가 변경되었습니다.";
        }
        alert(msg);
        this.moveList();
      });
    },
    moveList() {
      this.$router.push({ name: "qalist" });
    },
  },
  created() {
    axios.get(`/qa/${this.$route.params.articleno}`).then(({ data }) => {
      this.article = data;
      this.answer.qa_question_num = this.$route.params.articleno;
      if (data.qa_status == 1) {
        this.viewAnswer();
      }
    });
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
