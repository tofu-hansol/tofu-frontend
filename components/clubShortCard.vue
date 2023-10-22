<template>
  <div class="club-short-wrap">
    <v-card v-for="club in clubs" :key="club.clubId" class="mx-auto" max-width="350">
      <div @click="moveToClub(club.clubId)">
        <v-img
          class="align-end text-white"
          height="150"
          src="https://mblogthumb-phinf.pstatic.net/MjAxODA0MTJfMjEg/MDAxNTIzNDk5NDA1MTU0.fMpVtcJCq7pSbuvFjLhK_i5SeEyJMcFdGi47YZlyBSAg.YJ-Bejc-AyyzRfCvS2Buyvc3b1g11nlgyMmLnJW5-Csg.JPEG.sports_7330/1.jpg?type=w800"
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
  data() {
    return {
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
          categoryId: 1
        }
      })
      console.log(response.data.data.content)
      const newList = response.data.data.content
      this.clubs = newList
    },

    moveToClub(id) {
      console.log(id)
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
}

.v-card__actions {
  padding: 0 1rem 1rem;
}
</style>