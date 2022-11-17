<template>
  <h2>삭제 처리중...</h2>
</template>

<script>
import axios from "@/api/http.js";

export default {
  name: "QaDelete",
  created() {
    axios.delete(`/qa/${this.$route.params.articleno}`).then(({ data }) => {
      let msg = "삭제 처리시 문제가 발생했습니다.";
      if (data === "success") {
        msg = "삭제가 완료되었습니다.";
      }
      alert(msg);
      // 현재 route를 /list로 변경.
      this.$router.push({ name: "qalist" });
    });
  },
};
</script>

<style></style>
