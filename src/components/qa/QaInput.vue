<template>
  <div>
    <form class="body">
      <md-field>
        <label>제목</label>
        <md-input v-model="article.qa_title" type="text"></md-input>
      </md-field>
      <vue-editor v-model="article.qa_content" />
      <md-button :to="{ name: 'qalist' }">목록</md-button>
      <md-button @click="registerQa()" class="md-success" style="float: right;" v-if="this.type === 'register'"
        >작성</md-button
      >
      <md-button @click="modifyQa()" class="md-info" style="float: right;" v-else>수정</md-button>
    </form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import axios from "@/api/http.js";

export default {
  name: "QaInput",
  components: { VueEditor },
  data() {
    return {
      article: {
        qa_title: "",
        qa_content: "",
        userinfo_num: "1",
      },
    };
  },
  props: {
    type: { type: String },
  },
  methods: {
    onSubmit(event) {
      let err = true;
      let msg = "";

      !this.qa_tile;
      if (!err) {
        alert(msg);
      } else {
        if (this.type === "register") {
          this.registerQa();
        } else {
          this.modifyQa();
        }
      }
    },
    registerQa() {
      axios.post(`/qa`, this.article).then(({ data }) => {
        let msg = "등록 처리시 문제가 발생했습니다.";
        if (data === "success") {
          msg = "등록이 완료되었습니다.";
        }
        alert(msg);
        this.moveList();
      });
    },
    modifyQa() {
      axios.put(`/qa`, this.article).then(({ data }) => {
        let msg = "수정 처리시 문제가 발생했습니다.";
        if (data === "success") {
          msg = "수정이 완료되었습니다.";
        }
        alert(msg);
        this.moveList();
      });
      this.moveList();
    },
    moveList() {
      this.$router.push({ name: "qalist" });
    },
  },
  created() {
    console.log(this.$route.params.articleno);
    if (this.type === "modify") {
      axios.get(`/qa/${this.$route.params.articleno}`).then(({ data }) => {
        // this.article.articleno = data.article.articleno;
        // this.article.userid = data.article.userid;
        // this.article.subject = data.article.subject;
        // this.article.content = data.article.content;
        this.article = data;
      });
      //this.isUserid = true;
    }
  },
};
</script>

<style></style>
