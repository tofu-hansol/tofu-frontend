<template>
  <v-container class="d-flex flex-column align-center">
    <v-row class="pa-3">
      <v-card height="700px">
        <v-card-title>동호회별 모임장소 분포도</v-card-title>
        <v-card-text class="d-flex pt-5 pl-15 cart_3">
          <iframe
            class="pa-0"
            src="https://tofu-hansol.site:9080/map"
            width="100%"
            height="100%"
            frameborder="0"
          ></iframe>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row class="pa-3">
      <v-card height="500px">
        <v-card-title>동호회별 참석 부서 요약</v-card-title>
        <v-card-text class="cart_1 pa-0">
          <iframe
            class="pa-0"
            src="https://tofu-hansol.site:9080/dept"
            width="100%"
            height="100%" 
            frameborder="0"
          ></iframe>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row class="pa-3">
      <v-card height="600px">
        <v-card-title>동호회별 회원 비율 차트</v-card-title>
        <v-card-text class="cart_2 pa-0">
          <iframe
            class="pa-0"
            src="https://tofu-hansol.site:9080/position"
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
  min-width: 1100px;
  height: 400px;
  transform: scale(1);
}

.cart_2 {
  min-width: 1100px;
  height: 600px;
  transform: scale(1);
}

.cart_3 {
  min-width: 1100px;
  height: 600px;
  transform: scale(1);
}
</style>