<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const houseStore = "houseStore";
const userStore = "userStore";
export default {
  name: "kakaoMap",
  data() {
    return {
      markers: [],
      infowindow: null,
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
          const infowindow = new kakao.maps.InfoWindow({
            removable: true,
            content: `<div style="padding: 5px;">${element.aptName}</div>`,
          });
          const marker = new kakao.maps.Marker({
            title: element.aptName,
            map: this.map,
            position: new kakao.maps.LatLng(element.lat, element.lng),
          });
          kakao.maps.event.addListener(marker, "click", () => {
            infowindow.open(this.map, marker);
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
      console.log(12345);
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
