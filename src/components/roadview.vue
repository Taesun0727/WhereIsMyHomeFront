<template> <div id="roadview" style="width:100%;height:300px;"></div> </template>

<script>
import { mapState } from "vuex";

const houseStore = "houseStore";

export default {
  name: "RoadView",
  computed: {
    ...mapState(houseStore, ["house"]),
  },
  watch: {
    house: {
      deep: true,
      handler() {
        this.kakao && this.kakao.maps ? this.initMap() : this.addKakaoMapScript();
      },
    },
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=8a8e4361ef4ba871d6d6f591269b5cba";
      document.head.appendChild(script);
    }
  },
  methods: {
    addKakaoMapScript() {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=8a8e4361ef4ba871d6d6f591269b5cba";
      document.head.appendChild(script);
    },
    initMap() {
      // var roadviewContainer = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      var roadviewContainer = document.getElementById("roadview");
      var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
      var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

      //지도를 생성할 때 필요한 기본 옵션
      var position = new kakao.maps.LatLng(this.house.lat, this.house.lng); //지도의 중심좌표.

      roadviewClient.getNearestPanoId(position, 50, function(panoId) {
        roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
      }); //지도 생성 및 객체 리턴
    },
  },
};
</script>

<style></style>
