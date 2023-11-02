<template>
  <v-container>
    <v-row class="pa-3">
      <v-card width="100%" height="700px">
        <v-card-title>동호회별 모임장소 분포도</v-card-title>
        <v-card-text class="cart_3 pa-0">
          <iframe
            class="pa-0"
            src="http://tofu-hansol.site:9080/map"
            width="100%"
            height="100%"
            frameborder="0"
          ></iframe>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row class="pa-3">
      <v-card width="100%" height="500px">
        <v-card-title>동호회별 참석 부서 요약</v-card-title>
        <v-card-text class="cart_1 pa-0">
          <iframe
            class="pa-0"
            src="http://tofu-hansol.site:9080/dept"
            width="100%"
            height="100%" 
            frameborder="0"
          ></iframe>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row class="pa-3">
      <v-card width="100%" height="800px">
        <v-card-title>동호회별 회원 비율 차트</v-card-title>
        <v-card-text class="cart_2 pa-0">
          <iframe
            class="pa-0"
            src="http://tofu-hansol.site:9080/position"
            width="100%"
            height="100%"
            frameborder="0"
          ></iframe>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<style scoped>
.cart_1 {
  height: 400px;
  transform: scale(0.9);
}

.cart_2 {
  height: 700px;
  transform: scale(0.9);
}

.cart_3 {
  height: 1000px;
  transform: scale(0.9);
}
</style>