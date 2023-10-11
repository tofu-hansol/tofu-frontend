<template>
  <div class="club-short-wrap">
    <v-card v-for="club in clubs" :key="club"
      class="mx-auto"
      max-width="350"
    >
      <v-img
        class="align-end text-white"
        height="150"
        src="https://mblogthumb-phinf.pstatic.net/MjAxODA0MTJfMjEg/MDAxNTIzNDk5NDA1MTU0.fMpVtcJCq7pSbuvFjLhK_i5SeEyJMcFdGi47YZlyBSAg.YJ-Bejc-AyyzRfCvS2Buyvc3b1g11nlgyMmLnJW5-Csg.JPEG.sports_7330/1.jpg?type=w800"
        cover
      >
      </v-img>
      <v-card-title>{{ club }}</v-card-title>
      <v-card-subtitle class="pt-1">
        Member 10
      </v-card-subtitle>

      <v-card-text>
        <div>동호회 간단 설명</div>
      </v-card-text>

      <v-card-actions>
        <v-btn elevation="0" color="#2f9283" style="color: snow; font-weight: 700; font-size: .875rem;">
          가입하기
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clubs: [ '오르다(클라이밍 동호회)', 'Made By(베이킹 동호회)' ]
    }
  }
}
</script>

<style scoped>
.club-short-wrap {
  display: flex;
  margin-top: 2rem;
}

.v-card__actions {
  padding: 0 1rem 1rem;
}
</style>