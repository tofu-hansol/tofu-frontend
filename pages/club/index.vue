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
        <v-tabs v-model="tab" color="#2f9283">
          <v-tab value="all">전체</v-tab>
          <v-tab value="workout">운동</v-tab>
          <v-tab value="cooking">요리</v-tab>
        </v-tabs>
        <div>
          <v-window v-model="tab">
            <v-window-item :value="all">
              <club-short-card/>
            </v-window-item>
            <v-window-item value="workout">운동</v-window-item>
            <v-window-item value="cooking">요리</v-window-item>
          </v-window>
        </div>
    </section>
  </div>
</template>

<script>
import clubShortCard from '../../components/clubShortCard.vue'
import NewClubPopup from '../../components/newClubPopup.vue'

export default {
  components: { clubShortCard, NewClubPopup },
  data() {
    return {
      tab: null, 
    }
  }
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
</style>