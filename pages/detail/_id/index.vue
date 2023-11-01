<template>
  <div class="whole-wrap">
    <div class="club-detail-header">
      <div class="club-background-img">
        <v-btn v-if="isVisibleAdmin(club.clubId)" class="club-back-img-modify mr-1" tonal fab small variant="text" color="#dcdee3" elevation="0" @click="modifyBackground(club.clubId)">
          <v-icon>mdi-cog</v-icon>
        </v-btn>
        <img :src="club.clubBackgroundUrl" alt="Back Image">
      </div>
      <v-avatar class="club-profile-img" size="96">
        <img :src="club.clubProfileUrl" alt="Profile Image" />
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
          <component :is="getTabComponent(item.name)" :param="$route.params.id"></component>
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>
    <write-button v-if="isVisible()" :init-club-id="$route.params.id"/>
    <new-schedule-popup v-if="isVisible()" :club-id="club.clubId"/>
  </div>
</template>

<script>
import feedCardVue from '@/components/feedCard.vue';
import writeButton from '@/components/writeButton.vue';
import clubScheduleVue from '@/components/clubSchedule.vue';
import albumVue from '@/components/clubAlbum.vue';
import clubMemberVue from '@/components/clubMember.vue';
// import { fetchClubById } from '@/api/index'


export default {
  components: { feedCardVue, writeButton, clubScheduleVue, albumVue, clubMemberVue },

  data() {
    return {
      tab: null,
      club: [
      ],
      items: [
        { name: '게시글', content: 'Tab2 Content!', visible: true},
        { name: '모임', content: 'Tab3 Content!', visible: true},
        { name: '앨범', content: 'Tab3 Content!', visible: true},
        { name: '멤버', content: 'Tab3 Content!', visible: true},
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
      await this.$axios.get(`/api/clubs/${clubId}`, {
        headers: {
          Authentication: 'Bearer ' + this.$store.state.accessToken
        }
      }).then(result => {
        this.club = result.data.data
      })
    },
    
    modifyBackground(clubId) {
      this.$router.push(`/detail/${clubId}/modify`)
    },

    isVisible() {
      if(this.$store.state.memberId) {
        return true
      }
      return false
    },

    isVisibleAdmin(clubId) {
      const clubInfo = this.$store.state.clubAuth[clubId] ?? ''

      if (clubInfo.clubRole === 'PRESIDENT') {
        return true
      }
      return false
    },

    getTabComponent(tabName) {
      switch (tabName) {
        case "게시글":
          return feedCardVue;
        case "모임":
          return clubScheduleVue;
        case "앨범":
          return albumVue;
        case "멤버":
          return clubMemberVue;
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

.club-back-img-modify {
  position: absolute;
  right: 0;
  bottom: 40%;
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