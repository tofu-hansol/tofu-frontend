<template>
  <div class="club-short-wrap">
    <v-card v-for="club in clubs" :key="club.clubId" class="mx-auto rounded-xl" width="350">
      <div @click="moveToClub(club.clubId)">
        <v-img
          class="align-end text-white rounded-xl"
          height="200"
          :src="club.profileImageUrl"
          cover
          @error="defaultImg"
        >
        </v-img>
        <v-card-title>{{ club.clubName }}</v-card-title>
        <v-card-subtitle class="pt-1">
          Member {{ club.memberCount }}
        </v-card-subtitle>

        <v-card-text>
          <div>동호회 간단 설명</div>
        </v-card-text>
      </div>

      <v-card-actions v-if="isVisible(club.clubId)">
        <v-btn elevation="0" color="#2f9283" style="color: snow; font-weight: 700; font-size: .875rem;" @click="registerClub(club.clubId)">
          가입하기
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    initCategoryId: {
      type: Number,
      required: true,
    }
  },

  data() {
    return {
      categoryId: this.initCategoryId,
      clubs: []
    }
  },

  mounted() {
    this.dataLoad()
  },

  methods: {
    async dataLoad() {
      const response = await this.$axios.get('/api/clubs', {
        headers: {
          Authentication: 'Bearer ' + this.$store.state.accessToken
        },
        params: { 
          categoryId: this.categoryId
        }
      })
      console.log(response.data.data.content)
      const newList = response.data.data.content
      this.clubs = newList
    },

    moveToClub(id) {
      this.$router.push(`detail/${id}`)
    },

    async registerClub(clubId) {
      if(!this.$store.state.memberId) {
        alert('로그인 후 시도하세요.')
        return this.$router.push('/user/sign-in')
      }
      const message = '가입하시겠습니까?'
      if(confirm(message)) {
        await this.$axios.post(`/api/club-authority/${clubId}/members`).then(result => {
          alert('가입신청이 완료되었습니다. \n동호회 회장 승인 후 활동이 가능합니다.')
          this.$router.go(0)
        })
      }
    },

    isVisible(clubId) {
      if(!this.$store.state.memberId) {
        return false
      }
      
      const clubInfo = this.$store.state.clubAuth[clubId]

      if (clubInfo?.clubId === clubId) {
        return false
      }
      console.log(clubInfo, clubId)
      return true
    },

    defaultImg(e) {
      e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTOZ_42URUxDxeWLGr9_-TY4STPTX_f0kqgg&usqp=CAU'
    }
  }
}
</script>

<style scoped>
.club-short-wrap {
  display: flex;
  margin-top: 2rem;
  flex-wrap: wrap; 
  justify-content: space-between;
}

.v-card {
  margin-bottom: 2rem;
}

.v-card__actions {
  padding: 0 1rem 1rem;
}
</style>