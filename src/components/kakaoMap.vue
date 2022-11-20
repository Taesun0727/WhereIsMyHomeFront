<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const houseStore = "houseStore";
export default {
  name: "kakaoMap",
  data() {
    return {
      markerPositions1: [
        [33.452278, 126.567803],
        [33.452671, 126.574792],
        [33.451744, 126.572441],
      ],
      markerPositions2: [
        [37.499590490909185, 127.0263723554437],
        [37.499427948430814, 127.02794423197847],
        [37.498553760499505, 127.02882598822454],
        [37.497625593121384, 127.02935713582038],
        [37.49629291770947, 127.02587362608637],
        [37.49754540521486, 127.02546694890695],
        [37.49646391248451, 127.02675574250912],
      ],
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
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=8a8e4361ef4ba871d6d6f591269b5cba";
      document.head.appendChild(script);
    }
  },
  methods: {
    ...mapActions(houseStore, ["getInfoHouse"]),
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
    },
  },
  computed: {
    ...mapState(houseStore, ["houses"]),
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
            this.getInfoHouse(element.aptCode);
          });
          this.markers.push(marker);
        });
        const positions = this.houses.map((position) => new kakao.maps.LatLng(position.lat, position.lng));
        const bounds = positions.reduce((bounds, latlng) => bounds.extend(latlng), new kakao.maps.LatLngBounds());

        this.map.setBounds(bounds);
      }
      console.log(this.markers);
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
</style>
