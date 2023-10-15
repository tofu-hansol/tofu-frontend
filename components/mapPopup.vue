<template>
  <div>
    <v-btn 
      elevation="0" 
      style="color: snow; font-weight: 700; font-size: .875rem;"
      @click="openDialog"
    > 지도보기
    </v-btn>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>모임 장소</v-card-title>
        <v-card-text>
          <div>
            <n-naver-map
              id="naverMap"
              :options="mapOptions"
              @init="onNaverMapInit"
            />
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="#2f9283" @click="closeDialog">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  ssr: false,
  data() {
    return {
      dialog: false,   
      mapOptions: {
        center: { lat: 37.5666102, lng: 126.9783881 }, // 초기 중심 위치 설정
        zoom: 15, // 초기 확대 레벨 설정
      }, 
    }
  },
  computed: {
      hello() {
        return `Hello, World! × ${this.count}`;
      }
  },
  mounted() {
    setInterval(() => this.count++, 1000);
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    onNaverMapInit(naverMap) {
      // 지도 초기화 이벤트 핸들러
      // 이곳에서 지도에 마커, 폴리라인 등을 추가할 수 있습니다.
    },
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