<template>
  <div>
    <form class="body">
      <md-field>
        <label>제목</label>
        <md-input v-model="inputNotice.notice_title" type="text"></md-input>
      </md-field>
      <vue-editor v-model="inputNotice.notice_content" />
      <md-button :to="{ name: 'noticelist' }">목록</md-button>
      <md-button @click="registerNotice()" class="md-success" style="float: right;" v-if="this.type === 'register'"
        >작성</md-button
      >
      <md-button @click="modifyNotice()" class="md-info" style="float: right;" v-else>수정</md-button>
    </form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import swal from "sweetalert";
import { mapActions, mapState } from "vuex";

const userStore = "userStore";
const noticeStore = "noticeStore";

export default {
  name: "NoticeInput",
  components: { VueEditor },
  data() {
    return {
      inputNotice: {
        notice_title: "",
        notice_content: "",
        userinfo_num: "",
      },
    };
  },
  props: {
    type: { type: String },
  },
  methods: {
    ...mapActions(noticeStore, ["WriteNotice", "ReadNotice", "ModifyNotice"]),
    registerNotice() {
      this.WriteNotice(this.inputNotice);
      swal({
        title: "작성되었습니다!",
        icon: "success",
        button: "확인",
      }).then(() => {
        this.moveList();
      });
    },
    modifyNotice() {
      this.ModifyNotice(this.inputNotice);
      swal({
        title: "수정되었습니다!",
        icon: "success",
        button: "확인",
      }).then(() => {
        this.moveList();
      });
    },
    moveList() {
      this.$router.push({ name: "noticelist" });
    },
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
    ...mapState(noticeStore, ["notice"]),
  },
  created() {
    if (this.type === "modify") {
      this.ReadNotice(this.$route.params.noticeNum);
      this.inputNotice = this.notice;
      console.log(this.inputNotice);
    }
    this.inputNotice.userinfo_num = this.userInfo.userinfo_num;
  },
};
</script>

<style></style>
