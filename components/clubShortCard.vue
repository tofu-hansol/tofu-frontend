<template>
  <div class="club-short-wrap">
    <v-card v-for="club in clubs" :key="club.clubId" class="mx-auto" width="350">
      <div @click="moveToClub(club.clubId)">
        <v-img
          class="align-end text-white"
          height="120"
          :src="club.profileImageUrl"
          cover
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

      <v-card-actions>
        <v-btn elevation="0" color="#2f9283" style="color: snow; font-weight: 700; font-size: .875rem;" @click="registerClub">
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

    registerClub() {
      confirm('가입하시겠습니까?')
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