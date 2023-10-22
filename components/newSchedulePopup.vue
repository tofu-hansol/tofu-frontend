<template>
  <div class="fixed-button">
    <v-btn 
      id="create-button"
      @click="openDialog"
      class="btn"
      elevation="0"
      color="#58C9B9"
      style="font-weight: 700; font-size: .875rem;"
    > 모임 생성
    </v-btn>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>모임 생성</v-card-title>
        <v-card-text>
          <!-- 팝업 내용 -->
        </v-card-text>
        <v-card-actions>
          <v-btn type="submit" color="#2f9283">생성</v-btn>
          <v-btn color="#2f9283" @click="closeDialog">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {

  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.fixed-button {
  position: fixed;
  bottom: 5.5rem;
  right: 2rem;
  z-index: 999; /* 다른 요소 위에 표시하도록 z-index 설정 */
}

.fixed-button #create-button {
  border-radius: 2rem;
  padding: 0;
  width: 6rem;
  height: 3rem;
}
</style>
