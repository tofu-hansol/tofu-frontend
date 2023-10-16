<template>
  <div class="map-box">
    <naver-maps 
      :width="450" 
      :height="450" 
      :mapOptions="mapOptions"
    >
      <naver-info-window
        class="info-window"
        @load="onWindowLoad"
        :isOpen="info"
        :marker="marker">
        <div class="info-window-container">
          <h1>{{hello}}</h1>
        </div>
      </naver-info-window>
    </naver-maps>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mapOptions: {
        lat: 37.5666102,
        lng: 126.9783881,
        zoom: 12,
        zoomControl: true,
        zoomControlOptions: {position: 'TOP_RIGHT'},
        mapTypeControl: true,
      },
    }
  },
  methods: {
    onLoad(map) {
      this.map = map;
    },
  }
}
</script>
