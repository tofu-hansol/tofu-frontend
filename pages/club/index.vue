<template>
  <div>
    <section class="slide-section">
      <div class="slide-wrap">
        <h1 class="slide-title">
          두루두루
          <br>
          부대끼며
          <br>
          친해지는 한솔 모임
        </h1>
        <p class="slide-content">
          사내 동료들과 친해지고
          <br>
          취미생활도 찾아보세요.
        </p>
        <div class="slide-btn">
            <new-club-popup></new-club-popup>
        </div>
      </div>
    </section>
    <section class="clubs-section">
      <v-tabs color="#58C9B9">
        <v-tab value="0">전체</v-tab>
        <v-tab value="1">운동</v-tab>
        <v-tab value="2">요리</v-tab>
        <v-tab-item class="club-items">
          <club-short-card/>  
        </v-tab-item>
      </v-tabs>
    </section>
  </div>
</template>

<script>
import ClubShortCard from '~/components/clubShortCard.vue'

export default {
  components: { ClubShortCard },
  data() {
    return {}
  },
}
</script>

<style scoped>
.slide-section {
  background-color: #c0e9e3;
  height: 337px;
}

.slide-wrap {
  max-width: 48rem;
  padding: 3rem 1rem 0;
  margin: 0 auto;
}

.slide-title {
  font-size: 2rem;
}

.slide-content {
  margin-top: 10px;
  font-size: 1.125rem;
}

.clubs-section {
  max-width: 48rem;
  margin: 0 auto;
}

.club-items {
  overflow: auto;
  position: relative;
}
</style>