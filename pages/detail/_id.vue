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
          <h3>{{ club.name }}</h3>
          <div>멤버 {{ club.memberCount }} 게시글 {{ club.boardCount }}</div>
        </div>
        <div class="club-profile-detail-content">
          <h3>소개</h3>
          <div>{{ club.description}}</div>
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
          <component :is="getTabComponent(item.name)"></component>
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>
    <write-button/>
    <new-schedule-popup :club-id="club.clubId"/>
  </div>
</template>

<script>
import feedCardVue from '@/components/feedCard.vue';
import writeButton from '@/components/writeButton.vue';
import clubScheduleVue from '@/components/clubSchedule.vue';
import albumVue from '@/components/clubAlbum.vue';
// import { fetchClubById } from '@/api/index'


export default {
  components: { feedCardVue, writeButton, clubScheduleVue, albumVue },

  data() {
    return {
      tab: null,
      club: [
        { clubId: 0,
          name: '',
          clubProfileUrl: '',
          clubBackgroundUrl: '',
          description: '',
          fee: 0,
          accountNumber: '',
          memberCount: 0,
          boardCount: 0, }
      ],
      items: [
        { name: '게시글', content: 'Tab2 Content!', pageName: 'board'},
        { name: '모임', content: 'Tab3 Content!' },
        { name: '앨범', content: 'Tab3 Content!' },
        { name: '멤버', content: 'Tab3 Content!' },
      ],

    }
  },

  computed: {
  },

  mounted() {
    this.dataLoad()
  },

  methods: {
   async dataLoad() {
      const clubId = this.$route.params.id
      console.log(clubId)
      await this.$axios.get(`/api/clubs/${clubId}`, {
        headers: {
          Authentication: 'Bearer ' + this.$store.state.accessToken
        }
      }).then(result => {
        this.club = result.data.data
        console.log(this.club)
      })
    },

    getTabComponent(tabName) {
      switch (tabName) {
        case "게시글":
          return feedCardVue;
        case "모임":
          return clubScheduleVue;
        case "앨범":
          return albumVue;
        default:
          return null;
      }
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

.writeButton{
  position: absolute;
}
</style>