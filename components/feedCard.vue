<template>
  <div>
    <v-card v-for="feature in boards" :key="feature.boardId" class="mx-auto mb-5" style="max-width: 920px; width: 100%;">
      <v-card-title style="line-height: 1.5rem;">
        <v-avatar class="member-image mr-2">
          <img :src="feature.memberProfileUrl" alt="Profile Image" @error="defaultImg"/>
        </v-avatar>
        <div class="feed-header">
          <div class="member-info">
            <span class="member-name">{{ feature.memberName }}({{ feature.deptName }})</span>
          </div>
          <div class="feed-info">
            <span>{{ feature.createdAt }}</span>
          </div>
        </div>
      </v-card-title>

      <v-card-text>
        <h2 class="mb-3">{{ feature.title }}</h2>
        <div class="content">
          <p>{{ feature.content }}</p>
        </div>

        <!-- 이미지 -->
        <v-img :src="feature.photoList[0]" alt="Post Image" class="post-image"></v-img>
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-icon>mdi-comment-outline</v-icon>
        <span>댓글 {{ 0 }} 개</span>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    initClubId: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      boards: [],
      clubId: this.initClubId
    }
  },
  created() {
    this.dataLoad()
  },

  methods: {
    async dataLoad() {
      console.log('게시글' + this.clubId)
      await this.$axios.get('/api/clubs/boards/featured').then(result => {
        this.boards = result.data.data.content

        const test = {
                boardId: 2,
                memberId: 3,
                memberProfileUrl: '',
                deptName: "인사팀",
                memberName: "홍길동",
                title: "테스트!",
                content: "안녕하세요. 테스트 동호회입니다.",
                createdAt: "2023-10-22T11:38:04+09:00",
                updatedAt: "2023-10-22T11:39:56+09:00",
                photoList: []
        }
        this.boards.push(test)
      })
    },
    defaultImg(e) {
      e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_RlT-ytB9A_TQFLKMqVYpdJiiRbckTCThmw&usqp=CAU'
    },
  }
}
</script>

<style scoped>
.feed-header {
  display: flex;
  flex-direction: column;
}

.member-info {
  font-size: 18px;
}

.feed-info {
  font-size: 10px;
}

.content p {
  font-size: 16px;
}
</style>