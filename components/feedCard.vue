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
        <div v-if="isVisible(feature.memberId)" class="feed-btn-wrap">
          <v-btn fab small variant="text" elevation="0" color="#ffffff">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn fab small variant="text" elevation="0" color="#ffffff" @click="deleteFeed(feature.boardId)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </v-card-title>

      <v-card-text>
        <h2 class="mb-3">{{ feature.title }}</h2>
        <div class="content">
          <p>{{ feature.content }}</p>
        </div>

        <!-- 이미지 -->
        <v-img :src="feature.photoList[0]?.imageUrl" alt="Post Image" class="post-image"></v-img>
      </v-card-text>

      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-icon>mdi-comment-outline</v-icon>
            <span class="pl-2">댓글 {{ Number(feature.commentCount) }} 개</span>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-row v-for="comment in feature.comments" :key="comment.id" class="d-flex flex-row">
              <v-col cols="1">
                <v-avatar class="member-image" width="32" height="32">
                  <img :src="comment.memberProfileImage" alt="Profile Image" @error="defaultImg"/>
                </v-avatar>
              </v-col>
              <v-col class="pl-0">
                <div class="pa-2 comment-content rounded-lg">
                  <div class="comment-content-user">{{ comment.memberName }}({{ comment.deptName }})</div>
                  <div class="comment-content-main">{{ comment.content }}</div>
                </div>
              </v-col>
            </v-row>
            <v-row >
              <v-col cols="1">
                <v-avatar class="member-image" width="32" height="32">
                  <img src="" alt="Profile Image" @error="defaultImg"/>
                </v-avatar>
              </v-col>
              <v-col class="pl-0">
                <form @submit.prevent="createComment">
                  <v-text-field v-model="newComment" class="mt-0 pa-0" color="#58C9B9"></v-text-field>
                </form>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
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
      boards: [],
      clubId: this.param,
      newComment: ''
    }
  },
  created() {
    this.dataLoad()
  },

  methods: {
    async dataLoad() {
      console.log('clubId=========>' + this.clubId)
      if (this.clubId) {
        const boards = await this.$axios.get(`/api/clubs/${this.clubId}/boards`).then(result => result.data.data.content);

        for (const item of boards) {
          const comments = await this.$axios.get(`/api/clubs/${this.clubId}/boards/${item.boardId}/comments`).then(result => Array.from(result.data.data));
          item.comments = comments;
        }

        this.boards = boards;
      } else {
        const boards = await this.$axios.get('/api/clubs/boards/featured').then(result => result.data.data.content);
        console.log('홍보 게시판');

        for (const item of boards) {
          const comments = await this.$axios.get(`/api/clubs/${this.clubId}/boards/${item.boardId}/comments`).then(result => Array.from(result.data.data));
          item.comments = comments;
        }

        this.boards = boards;
      }

    },
    defaultImg(e) {
      e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_RlT-ytB9A_TQFLKMqVYpdJiiRbckTCThmw&usqp=CAU'
    },
    async deleteFeed(boardId) {
      await this.$axios.delete(`api/clubs/${this.clubId}/boards/${boardId}`).then(result => {
        alert('삭제되었습니다.')
        this.$router.go(0)
      })
    },
    isVisible(memberId) {
      return this.$store.state.memberId === memberId
    }
  }
}
</script>

<style scoped>
.feed-header {
  flex: 2;
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

.v-expansion-panel-header > * {
  flex: 0 0 auto;
}

.comment-content {
  background-color: #f0f2f5;
}

.comment-content-user {
  font-weight: 700;
}
</style>