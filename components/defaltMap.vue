<template>
  <div id="map"></div>
</template>

<script>
export default {
  props: {
    latitude: Number,
    longitude: Number,
  },
  mounted() {
    if(!(this.latitude || this.longitude)) {
      alert('지정된 위치가 없습니다.')
      this.$router.go(0)
    }
    const script = document.createElement("script");
    /* global kakao */
    script.onload = () => this.initMap();
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}`;
    document.head.appendChild(script);
  },
  methods: {
     initMap() {
      console.log("미")
      const mapContainer = document.getElementById('map')
      const mapOption = { 
            center: new kakao.maps.LatLng(this.latitude, this.longitude),
            level: 3 
        }
      const map = new kakao.maps.Map(mapContainer, mapOption);

      const markerPosition  = new kakao.maps.LatLng(this.latitude, this.longitude); 
      
      const marker = new kakao.maps.Marker({
          position: markerPosition
      });

      marker.setMap(map);
    },
  },
};
</script>

<style scoped>
#map {
  width: 400px;
  height: 400px;
}
</style>
