<template>
  <div>
    <datatable title="Basic table" :columns="col" :rows="deals" :perPage="[5]"></datatable>
  </div>
</template>

<script>
import DataTable from "vue-materialize-datatable";
import { mapState } from "vuex";

const houseStore = "houseStore";
export default {
  name: "dealTable",
  data() {
    return {
      col: [
        {
          label: "거래일",
          field: "dealYear",
          numeric: false,
          html: false,
        },
        {
          label: "거래금액",
          field: "dealAmount",
          numeric: false,
          html: false,
        },
        {
          label: "층수",
          field: "floor",
          numeric: false,
          html: false,
        },
        {
          label: "면적",
          field: "area",
          numeric: false,
          html: false,
        },
      ],
    };
  },
  components: {
    datatable: DataTable,
  },
  computed: {
    ...mapState(houseStore, ["deals"]),
  },
};
</script>

<style></style>
