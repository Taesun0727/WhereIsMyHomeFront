<template>
  <div>
    <md-button class="md-primary" style="float: right;" :to="{ name: 'qawrite' }" v-if="userInfo.userinfo_level === 2"
      >문의하기</md-button
    >
    <md-table md-card>
      <qa-list-item v-for="qna in qnas" :key="qna.qa_num" v-bind="qna"></qa-list-item>
    </md-table>
  </div>
</template>

<script>
import QaListItem from "./QaListItem.vue";
import axios from "@/api/http.js";
import { mapActions, mapState } from "vuex";
const userStore = "userStore";
const qnaStore = "qnaStore";

export default {
  name: "QaList",
  components: {
    QaListItem,
  },
  data: () => ({}),
  methods: {
    ...mapActions(qnaStore, ["GetMyQnas", "GetAllQnas"]),
    updatePagination(page, pageSize, sort, sortOrder) {
      console.log("pagination has updated", page, pageSize, sort, sortOrder);
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

<style scoped></style>
