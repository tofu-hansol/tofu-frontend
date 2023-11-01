<template>
  <div class="map-box">
    <naver-maps 
      :width="450" 
      :height="450" 
      :mapOptions="mapOptions"
      @init="onLoad"
    >
      <naver-marker :lat="37.559357" :lng="127.9783881" @click="onMarkerClicked" @load="onMarkerLoaded"/>
      <naver-info-window
        class="info-window"
        @load="onWindowLoad"
        :isOpen="info"
        :marker="marker"
      >
        <div class="info-window-container">
          <h1>{{ hello }}</h1>
        </div>
      </naver-info-window>
    </naver-maps>
  </div>
</template>

<script>
export default {
  props: {
    latitude: Number,
    longitude: Number,
  },
  data() {
    return {
      info: false,
      marker: null,
      map: null,
      mapOptions: {
        lat: 37.559357,
        lng: 127.9783881,
        zoom: 12,
        zoomControl: true,
        zoomControlOptions: {position: 'TOP_RIGHT'},
        mapTypeControl: true,
      },
      initLayers: ['BACKGROUND', 'BACKGROUND_DETAIL', 'POI_KOREAN', 'TRANSIT', 'ENGLISH', 'CHINESE', 'JAPANESE']
    }
  },
  methods: {
    onLoad(map) {
      this.map = map;
      // 마커가 있는 위치로 지도의 중심 및 줌을 조정
      // this.map.fitBounds([this.marker.getPosition()]);
    },
    onWindowLoad(that) {
    },
    onMarkerClicked(event) {
      this.info = !this.info;
    },
    onMarkerLoaded(vue) {
      this.marker = vue.marker;
    }
  }
}
</script>

<style scoped>
  .info-window-container {
    padding: 10px;
    width: 300px;
    height: 100px;
  }
</style>
