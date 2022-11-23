<template>
  <div>
    <div id="map" style="height: 100vh; z-index: 1;"></div>
    <ul id="category" style="position: absolute; top: 100px; right: 20px; z-index: 3; width: 50px; padding-left: 0px;">
      <li id="BK9" data-order="0" @click="changeFlag(0)">
        <img src="../../src/assets/img/bank.png" style="width: 35px" />
        은행
      </li>
      <li id="MT1" data-order="1" @click="changeFlag(1)">
        <img src="../../src/assets/img/mart.png" style="width: 35px" />
        마트
      </li>
      <li id="PM9" data-order="2" @click="changeFlag(2)">
        <img src="../../src/assets/img/hospital.png" style="width: 35px" />
        병원
      </li>
      <li id="OL7" data-order="3" @click="changeFlag(3)">
        <img src="../../src/assets/img/cafe.png" style="width: 35px" />
        카페
      </li>
      <li id="CE7" data-order="4" @click="changeFlag(4)">
        <img src="../../src/assets/img/school.png" style="width: 35px" />
        학교
      </li>
      <li id="CS2" data-order="5" @click="changeFlag(5)">
        <img src="../../src/assets/img/subway.png" style="width: 35px" />
        지하철
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SchoolIcon from "../assets/img/school.png";
import SubwayIcon from "../assets/img/subway.png";
import MartIcon from "../assets/img/mart.png";
import HospitalIcon from "../assets/img/hospital.png";
import CafeIcon from "../assets/img/cafe.png";
import BankIcon from "../assets/img/bank.png";

const houseStore = "houseStore";
const userStore = "userStore";
export default {
  name: "kakaoMap",
  data() {
    return {
      markers: [],
      schoolMarkers: [],
      martMarkers: [],
      bankMarkers: [],
      cafeMarkers: [],
      subwayMarkers: [],
      hospitalMarkers: [],
      categoryFlag: [false, false, false, false, false, false],
      categoryTitle: ["BK9", "MT1", "HP8", "CE7", "SC4", "SW8"],
      categoryMarkers: [[], [], [], [], [], []],
      categotyIcons: [BankIcon, MartIcon, HospitalIcon, CafeIcon, SchoolIcon, SubwayIcon],
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=8a8e4361ef4ba871d6d6f591269b5cba&libraries=services";
      document.head.appendChild(script);
    }
  },
  methods: {
    ...mapActions(houseStore, ["getInfoHouse"]),
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.514575, 127.0495556),
        level: 5,
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
      kakao.maps.event.addListener(this.map, "idle", this.checkFlag);
    },

    checkFlag() {
      this.categoryFlag.forEach((item, index) => {
        if (item) {
          this.searchPlaces(index);
        }
      });
    },

    searchPlaces(index) {
      // 지도 이벤트 추가
      let ps = new kakao.maps.services.Places(this.map);

      //test
      ps.categorySearch(this.categoryTitle[index], this.placeSearchCB, { useMapBounds: true });
    },
    placeSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        // console.log("place success!", data);
        this.displayPlaces(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        // console.log("zero result !", status);
      } else if (status === kakao.maps.services.Status.ERROR) {
        // console.log("error", status);
      }
    },
    displayPlaces(places) {
      let idx;
      this.categoryTitle.forEach((item, index) => {
        if (item === places[0].category_group_code) {
          idx = index;
        }
      });
      for (let i = 0; i < places.length; i++) {
        const imageSize = new kakao.maps.Size(32, 36);
        let marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(places[i].y, places[i].x),
          title: places[i].place_name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: new kakao.maps.MarkerImage(this.categotyIcons[idx], imageSize),
        });
        marker.setMap(this.map);
        this.categoryMarkers[idx].push(marker);
      }

      // console.log(this.schoolMarkers);
    },
    changeFlag(index) {
      this.categoryFlag[index] = !this.categoryFlag[index];
      if (!this.categoryFlag[index]) {
        this.removeMarkers(index);
      } else {
        this.searchPlaces(index);
      }
    },
    removeMarkers(index) {
      for (let i = 0; i < this.categoryMarkers[index].length; i++) {
        this.categoryMarkers[index][i].setMap(null);
      }
      this.categoryMarkers[index] = [];
    },
  },
  computed: {
    ...mapState(houseStore, ["houses", "house"]),
    ...mapState(userStore, ["userInfo"]),
  },
  watch: {
    houses() {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }

      if (this.houses.length > 0) {
        this.houses.forEach((element) => {
          const marker = new kakao.maps.Marker({
            title: element.aptName,
            map: this.map,
            position: new kakao.maps.LatLng(element.lat, element.lng),
          });
          kakao.maps.event.addListener(marker, "click", () => {
            let data = {
              aptCode: element.aptCode,
              userinfo_num: this.userInfo.userinfo_num,
            };
            this.getInfoHouse(data);
          });
          this.markers.push(marker);
        });
        const positions = this.houses.map((position) => new kakao.maps.LatLng(position.lat, position.lng));
        const bounds = positions.reduce((bounds, latlng) => bounds.extend(latlng), new kakao.maps.LatLngBounds());

        this.map.setBounds(bounds);
      }
    },
    house() {
      const bounds = new kakao.maps.LatLng(this.house.lat, this.house.lng);
      this.map.setCenter(bounds);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  height: 750px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}

#category {
  position: absolute;
  top: 170px;
  right: 10px;
  border-radius: 5px;
  border: 1px solid #909090;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  background: #fff;
  overflow: hidden;
  z-index: 2;
}
#category li {
  float: left;
  list-style: none;
  width: 50px;
  border-right: 1px solid #acacac;
  padding: 6px 0;
  text-align: center;
  cursor: pointer;
}
#category li.on {
  background: #eee;
}
#category li:hover {
  background: #ffe6e6;
  border-left: 1px solid #acacac;
  margin-left: -1px;
}
#category li:last-child {
  margin-right: 0;
  border-right: 0;
}
#category li span {
  display: block;
  margin: 0 auto 3px;
  width: 27px;
  height: 28px;
}
#category li .category_bg {
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png) no-repeat;
}
#category li .bank {
  background-position: -10px 0;
}
#category li .mart {
  background-position: -10px -36px;
}
#category li .pharmacy {
  background-position: -10px -72px;
}
#category li .oil {
  background-position: -10px -108px;
}
#category li .cafe {
  background-position: -10px -144px;
}
#category li .store {
  background-position: -10px -180px;
}
#category li.on .category_bg {
  background-position-x: -46px;
}
</style>
