<template>
  <div>
    <form class="body">
      <md-field>
        <label>제목</label>
        <md-input v-model="qna.qa_title" type="text"></md-input>
      </md-field>
      <vue-editor v-model="qna.qa_content" />
      <md-button :to="{ name: 'qalist' }">목록</md-button>
      <md-button @click="writeQna()" class="md-success" style="float: right;">작성</md-button>
    </form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapActions, mapState } from "vuex";

const userStore = "userStore";
const qnaStore = "qnaStore";
export default {
  name: "QaInput",
  components: { VueEditor },
  data() {
    return {
      qna: {
        qa_title: "",
        qa_content: "",
        userinfo_num: "",
      },
    };
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
  methods: {
    ...mapActions(qnaStore, ["WriteQna"]),
    writeQna() {
      console.log(123);
      this.WriteQna(this.qna);
      swal({
        title: "질문이 작성되었습니다!",
        icon: "success",
        button: "확인",
      }).then(() => {
        this.moveList();
      });
    },
    moveList() {
      this.$router.push({ name: "qalist" });
    },
  },
  created() {
    this.qna.userinfo_num = this.userInfo.userinfo_num;
  },
};
</script>

<style></style>
