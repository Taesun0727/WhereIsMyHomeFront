<template>
  <div>
    <div style="padding: 20px; text-align: center; width: 100%; height: 100px;">
      <h3 class="title" style="display: inline-block;">공지사항</h3>
      <md-button :to="{ name: 'notice' }" style="float: right; margin-top: 36px; width: 30px;">더보기 +</md-button>
    </div>
    <hr style="border: 0.5px solid rgb(225, 225, 225);" />
    <md-table md-card>
      <md-table-row v-for="notice in notices" :key="notice.num" :notice="notice">
        <md-table-cell md-label="Title" style="width: 75%;">
          <router-link :to="{ name: 'noticeview', params: { noticeNum: notice.notice_num } }" style="color: black;">
            {{ notice.notice_title }}
          </router-link>
        </md-table-cell>
        <md-table-cell md-label="RegisterDate">
          {{ notice.notice_register_date }}
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

const noticeStore = "noticeStore";

export default {
  name: "MainNotice",
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions(noticeStore, ["GetNotices"]),
  },
  computed: {
    ...mapState(noticeStore, ["notices"]),
  },
  created() {
    this.GetNotices();
  },
};
</script>

<style></style>
