<template>
  <div>
    <v-card max-width="48rem">
      <v-card-title>
        동호회별 모임장소 분포도
      </v-card-title>
      <v-card-text>
        <iframe src="http://localhost:3000/map.html" class="fullscreen-iframe"></iframe>
      </v-card-text>
    </v-card>
  </div>
</template>

<style>
.fullscreen-iframe {
  width: 100%;
  height: 48rem; /* 화면 높이에 꽉 차도록 설정 */
  border: none; /* 테두리 제거 (선택 사항) */
}
</style>
