<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle"></parallax>
    <div class="md-layout-item md-size-100 mx-auto" style="padding: 0;">
      <!-- <router-view style="transform: translate3d(0, -20%, 0);"></router-view> -->
      <!-- <md-card>
        <md-card-actions>
          <md-button>Action</md-button>
          <md-button>Action</md-button>
        </md-card-actions>
      </md-card> -->
      <kakao-map></kakao-map>
    </div>
    <md-card
      style="position: absolute; top: 150px; left: 20px; width: 400px; height: 110px; opacity: 0.9; padding: 15px;"
    >
      <div class="flex-column" style="height: 30px;">
        <md-radio v-model="radio" :value="true">동검색</md-radio>
        <md-radio v-model="radio" :value="false">아파트 검색</md-radio>
      </div>
      <div v-if="radio">
        <md-field class="block" style="width: 30%; margin-right: 15px; ">
          <label for="sidos">지역</label>
          <md-select v-model="sidoCode">
            <md-option v-for="sido in sidos" v-bind:key="sido.value" :value="sido.value">{{ sido.text }}</md-option>
          </md-select>
        </md-field>
        <md-field class="block" style="width: 30%; margin-right: 15px; ">
          <label for="guguns">구/구군</label>
          <md-select v-model="gugunCode" name="guguns" id="guguns">
            <md-option v-for="gugun in guguns" v-bind:key="gugun.value" :value="gugun.value">{{
              gugun.text
            }}</md-option>
          </md-select>
        </md-field>
        <md-field class="block" style="width: 30%; ">
          <label for="guguns">법정동</label>
          <md-select v-model="dongCode" name="dongs" id="dongs">
            <md-option v-for="dong in dongs" v-bind:key="dong.value" :value="dong.value">{{ dong.text }}</md-option>
          </md-select>
        </md-field>
      </div>
      <div v-else>
        <md-field>
          <label>아파트명</label>
          <md-input v-model="aptName" type="text" @keyup.enter="searchAptName"></md-input>
          <md-button class="md-primary" @click="searchAptName" style="height: 30px;"
            ><i class="material-icons">search</i></md-button
          >
        </md-field>
      </div>
      <!-- <md-field>
        <label for="movie">법정동</label>
        <md-select v-model="movie" name="movie" id="movie"> </md-select>
      </md-field> -->
    </md-card>
    <md-card
      style="position: absolute; top: 280px; left: 20px; width: 400px; height: 500px; opacity: 1; padding: 15px; overflow: scroll;"
      v-if="house"
    >
      <div>
        <div>
          <h4 class="title">
            {{ house.aptName }}<i class="material-icons" style="float: right; color: red;">favorite_border</i>
          </h4>
          <p>주소 : {{ house.roadName }}</p>
          <p>건축년도 : {{ house.buildYear }}</p>
        </div>
        <hr />
        <road-view></road-view>
        <hr />
        <h5 class="title">실거래</h5>
        <deal-table></deal-table>
      </div>
    </md-card>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

const houseStore = "houseStore";
// import TitleComponent from "../components/TitleComponent.vue";
// import { Tabs } from "@/components";
import KakaoMap from "../components/kakaoMap.vue";
import RoadView from "../components/roadview.vue";
import DealTable from "../components/dealTable.vue";

export default {
  name: "house",
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      dongCode: null,
      radio: true,
      aptName: "",
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/main.jpg"),
    },
  },
  components: {
    // TitleComponent,
    // Tabs,
    KakaoMap,
    RoadView,
    DealTable,
  },
  watch: {
    sidoCode: function() {
      this.CLEAR_GUGUN_LIST();
      this.CLEAR_DONG_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    gugunCode: function() {
      this.CLEAR_DONG_LIST();
      this.dongCode = null;
      if (this.gugunCode) this.getDong(this.gugunCode);
    },
    dongCode: function() {
      if (this.dongCode) this.getHouses(this.dongCode);
    },
  },
  methods: {
    ...mapActions(houseStore, ["getSido", "getGugun", "getDong", "getHouses", "searchHouse"]),
    ...mapMutations(houseStore, ["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST", "CLEAR_DONG_LIST", "CLEAR_APT_LIST"]),
    searchAptName() {
      this.searchHouse(this.aptName);
    },
  },
  computed: {
    ...mapState(houseStore, ["sidos", "guguns", "dongs", "houses", "house", "deals"]),
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
  },
  created() {
    this.CLEAR_SIDO_LIST();
    this.CLEAR_APT_LIST();
    this.CLEAR_DONG_LIST();
    this.getSido();
  },
};
</script>

<style scoped>
.page-header {
  height: 100px;
}
.block {
  display: inline-block;
}
</style>
