<template>
  <div class="whole-wrap">
    <div class="club-detail-header">
      <div class="club-background-img">
        <img src="https://recipe1.ezmember.co.kr/cache/recipe/2020/09/12/e04b41362cb7b666cefe0e07ebc94a201.jpg" alt="Back Image">
      </div>
      <v-avatar class="club-profile-img" size="96">
        <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/eaf6f7f9-3cd6-44ca-bf83-0cf01d703e74-profile_image-300x300.jpeg" alt="Profile Image" />
      </v-avatar>
      <div class="club-profile-detail">
        <div class="club-profile-detail-header">
          <h3>Made By</h3>
          <div>멤버 6 게시글 1</div>
        </div>
        <div class="club-profile-detail-content">
          <h3>소개</h3>
          <div>소개합니다.</div>
        </div>
      </div>
    </div>
    <v-tabs v-model="tab" color="#58C9B9">
      <v-tab v-for="item in items" :key="item.name">
        {{item.name}}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.name">
        <v-card-text>
          {{ item.content }} <br/>
          Here, You can see Something!
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
// import { fetchClubById } from '@/api/index'

export default {
  async asyncData({ params }) {
    // const response = await fetchClubById(params.id)
    // const clubDetail = response.data
    // return { clubDetail }
  },

  data() {
    return {
      tab: null,
      items: [
        { name: '전체', content: 'Tab1 Content!' },
        { name: '게시글', content: 'Tab2 Content!', pageName: 'board'},
        { name: '모임', content: 'Tab3 Content!' },
        { name: '앨범', content: 'Tab3 Content!' },
        { name: '설정', content: 'Tab3 Content!' },
      ],
      
    }
  }
}
</script>

<style scoped>
.whole-wrap {
  max-width: 48rem;
  margin: 0 auto;
}

.club-detail-header{
  position: relative;
}

.club-background-img{
  margin: 0 auto;
  height: 20rem;
  overflow: hidden;
}

.club-background-img > img {
  width: 100%;
  height: 100%;
  max-width: 100%;
  display: block;
}

.club-profile-img{
  position: absolute;
  top: 17rem;
  left: 2rem;
}

.club-profile-detail{
  margin: 0 auto;
  padding: 3.5rem 2rem 1.5rem;
}

.club-profile-detail-header{
  margin-bottom: 1.5rem;
}

.v-tabs {
  border-bottom: 2px solid #dcdee3;
}

.v-tab {
  flex: 1;
}
</style>