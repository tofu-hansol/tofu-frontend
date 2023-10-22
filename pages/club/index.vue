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
      <v-tabs v-model="tab" color="#58C9B9">
        <v-tab v-for="category in categorys" :key="category.id" :vaule="category.id">
          {{ category.name }}
        </v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item v-for="category in categorys" :key="category.id" :vaule="category.id">
          <club-short-card :init-category-id="category.id"/>
        </v-window-item>
      </v-window>
    </section>
  </div>
</template>

<script>
import ClubShortCard from '@/components/clubShortCard.vue'
 
export default {
  components: { ClubShortCard },
  
  data() {
    return {
      tab: null,
      categorys: [
        { id: 1, name: '운동',},
        { id: 2, name: '스터디',},
        { id: 3, name: '투자/금융',},
        { id: 4, name: '음식',},
        { id: 5, name: '문화/예술',},
        { id: 6, name: '인문학/책',},
        { id: 7, name: '기타',},
      ],
    }
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