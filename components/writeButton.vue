<template>
  <div class="fixed-button">
    <v-btn
      id="write-button"
      class="btn"
      elevation="0"
      color="#58C9B9"
    >
      <v-icon class="btn-hover-text">mdi-plus</v-icon>
      <span class="btn-text">글쓰기</span>
    </v-btn>
  </div>
</template>

<script>
export default {

}
</script>

<style>

.fixed-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999; /* 다른 요소 위에 표시하도록 z-index 설정 */
}

.fixed-button #write-button {
  border-radius: 2rem;
  padding: 0;
  width: 6rem;
  height: 3rem;
}

.fixed-button #write-button:hover {
  padding: 0;
  border-radius: 100%;
  width: 0.5rem;
  height: 4rem;
}

.fixed-button #write-button:hover .btn-text {
  display: none;
}

.fixed-button #write-button:hover .btn-hover-text {
  display: block;
  padding: 0;
}
</style>