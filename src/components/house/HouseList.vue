<template>
  <div>
    <datatable title="아파트" :columns="col" :rows="houses" :perPage="[5]" v-on:row-click="rowClick"></datatable>
  </div>
</template>

<script>
import DataTable from "vue-materialize-datatable";
import { mapState, mapActions } from "vuex";

const houseStore = "houseStore";
const userStore = "userStore";
export default {
  name: "HouseList",
  data() {
    return {
      col: [
        {
          label: "건축년도",
          field: "buildYear",
          numeric: false,
          html: false,
        },
        {
          label: "아파트명",
          field: "aptName",
          numeric: false,
          html: false,
        },
        {
          label: "최근가격",
          field: "recentPrice",
          numeric: false,
          html: false,
        },
      ],
    };
  },
  methods: {
    ...mapActions(houseStore, ["getInfoHouse"]),
    rowClick(row) {
      row.userinfo_num = this.userInfo.userinfo_num;
      this.getInfoHouse(row);
    },
  },
  components: {
    datatable: DataTable,
  },
  computed: {
    ...mapState(houseStore, ["deals", "houses"]),
    ...mapState(userStore, ["userInfo"]),
  },
};
</script>

<style>
table {
  width: 100%;
}
</style>
