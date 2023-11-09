<template>
  <div>
    <v-card v-for="member in clubMembers" :key="member.id" class="mx-auto mb-5" style="max-width: 920px; width: 100%;">
      <v-card-title style="line-height: 1.5rem;">
        <v-avatar class="member-image mr-2">
          <img :src="member.memberProfileUrl" alt="Profile Image" @error="defaultImg"/>
        </v-avatar>
        <div class="club-members-header">
          <div class="member-info">
            <span class="member-name">{{ member.memberName }}({{ member.deptName }})</span>
          </div>
          <div class="club-members-info">
            <span class="club-role pa-1">{{ getRoleName(member.clubRole) }}</span>
            <span>{{ member.joinDate }}</span>
          </div>
        </div>
        <div v-if="isVisible(member.memberId)" class="club-members-btn-wrap">
          <v-btn
            elevation="0"
            color="#58C9B9"
            @click="acceptJoinclub(member.memberId)"
          > 수락
          </v-btn>
          <v-btn
            outlined
            elevation="0"
            color="red"
            @click="rejectJoinclub(member.memberId)"
          > 거절
          </v-btn>
        </div>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    param: {
      type: String, 
      default: '',
    }
  },

  data() {
    return {
      clubMembers: [],
      clubId: this.param
    }
  },

  created() {
    this.dataLoad()
  },

  methods: {
    async dataLoad() {
      await this.$axios.get(`/api/club-authority/${this.clubId}/members`).then(result => {
        console.log(result)
        this.clubMembers = result.data.data
      })
    },
    async acceptJoinclub(memberId) {
      await this.$axios.patch(`/api/club-authority/${this.clubId}/members/${memberId}`).then(result => {
        alert('동호회 가입을 수락하였습니다!')
        this.$router.go(0)
      })
    },
    async rejectJoinclub(memberId) {
      await this.$axios.delete(`/api/club-authority/${this.clubId}/members/${memberId}`).then(result => {
        alert('동호회 가입을 거절하였습니다.')
        this.$router.go(0)
      })
    },
    isVisible(memberId) {
      if(Object.keys(this.$store.getters.getClubAuth).lenght > 0) {
        return false
      }

      const clubInfo = this.$store.getters.getClubAuth[Number(this.clubId)]


      const member = this.clubMembers.filter(member => member.memberId === memberId && member.clubJoinStatus === 'WAITING')
      if (clubInfo?.clubRole === 'PRESIDENT' && member.length > 0) {
        return true
      }
      return false
    },
    defaultImg(e) {
      e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_RlT-ytB9A_TQFLKMqVYpdJiiRbckTCThmw&usqp=CAU'
    },
    getRoleName(role) {
      switch (role) {
        case "ROLE_USER":
          return "회원";
        case "ROLE_ADMIN":
          return "회장";
        default:
          return "기타 역할"; // 기본값 설정
      }
    },
  }
}
</script>

<style scoped>
.club-members-header {
  flex: 2;
  display: flex;
  flex-direction: column;
}

.member-info {
  font-size: 18px;
}

.club-members-info {
  font-size: 14px;
}

.content p {
  font-size: 16px;
}

.club-role {
  border: 1px solid #58C9B9;
  border-radius: 2rem;
  padding: 0 2rem;
}
</style>