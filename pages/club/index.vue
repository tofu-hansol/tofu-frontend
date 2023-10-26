<template>
  <div>
    <section class="slide-section">
      <div class="slide-wrap">
        <div>
          <h1 class="slide-title">
            우리 회원들이
            <br>
            활동하는 다양한 모임들
            <br>
          </h1>
          <p class="slide-content">
            동료들이 가장 관심있는 
            <br>
            동호회에 함께하세요.
          </p>
          <div class="slide-btn">
              <new-club-popup></new-club-popup>
          </div>
        </div>
        <div class="img-wrap">
          <img class="slide-img" src="@/assets/image/team.png"/>
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
  display: flex;
  justify-content: space-between;
}

.slide-title {
  font-size: 2rem;
}

.slide-content {
  margin-top: 10px;
  font-size: 1.125rem;
}

.img-wrap {
  width: 279px;
  height: 279px;
}

.slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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