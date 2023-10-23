<template>
  <div class="fixed-button">
    <v-btn
      id="write-button"
      class="btn"
      elevation="0"
      color="#58C9B9"
      @click="moveToWritePost"
    >
      <v-icon>mdi-plus</v-icon>
      <span class="btn-text">글쓰기</span>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    initClubId: {
      type: String,
      required: true,
    }
  },

  data() {
    return {
      clubId: this.initClubId
    }
  },

  methods: {
    moveToWritePost() {
      console.log(this.clubId)
      this.$router.push({path: '/board/write', query: {clubId: this.clubId}})
    }
  }
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
</style>