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
          <!-- <v-btn fab small variant="text" elevation="0" color="#ffffff">
            <v-icon>mdi-pencil</v-icon>
          </v-btn> -->
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

      <v-carousel v-if="filteredPhotoList(feature.photoList) > 0" hide-delimiters >
        <v-carousel-item
          v-for="(photo,id) in feature.photoList"
          :key="id"
          :src="photo.imageUrl"
          cover
        ></v-carousel-item>
      </v-carousel>
      </v-card-text>

      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-icon>mdi-comment-outline</v-icon>
            <span class="pl-2">댓글 {{ Number(feature.comments.length) }} 개</span>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-row v-for="comment in feature.comments" :key="comment.id" class="d-flex flex-row">
              <v-col cols="1">
                <v-avatar class="member-image" width="32" height="32">
                  <img :src="comment.memberProfileImage" alt="Profile Image" @error="defaultImg"/>
                </v-avatar>
              </v-col>
              <v-col class="pl-0">
                <div class="d-flex justify-space-between pa-2 comment-content rounded-lg">
                  <div>
                    <div class="comment-content-user">{{ comment.memberName }}({{ comment.deptName }})</div>
                    <div class="comment-content-main">{{ comment.content }}</div>
                  </div>
                  <div v-if="isVisible(comment.memberId)">
                    <!-- <v-btn fab small variant="text" elevation="0" color="inherit" @click="modifyComment(feature.boardId, comment.id)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn> -->
                    <v-btn fab small variant="text" elevation="0" color="inherit" @click="deleteComment(feature.boardId, comment.id)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </div>
                </div>
              </v-col>
            </v-row>
            <v-form>
              <v-row >
                <v-col cols="1">
                  <v-avatar class="member-image" width="32" height="32">
                    <img src="" alt="Profile Image" @error="defaultImg"/>
                  </v-avatar>
                </v-col>
                <v-col>
                  <v-text-field v-model="newComment" class="mt-0 pa-0" color="#58C9B9" placeholder="댓글을 입력하세요.."></v-text-field>
                </v-col>
                <v-col cols="1">
                  <v-btn fab small variant="text" elevation="0" color="#ffffff" @click="createComment(feature.clubId, feature.boardId)">
                    <v-icon>mdi-send</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
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
          const comments = await this.$axios.get(`/api/clubs/${item.clubId}/boards/${item.boardId}/comments`).then(result => Array.from(result.data.data));
          item.comments = comments;
        }

        this.boards = boards;
      } else {
        const boards = await this.$axios.get('/api/clubs/boards/featured').then(result => result.data.data.content);
        console.log('홍보 게시판');

        for (const item of boards) {
          const comments = await this.$axios.get(`/api/clubs/${item.clubId}/boards/${item.boardId}/comments`).then(result => Array.from(result.data.data));
          item.comments = comments;
        }

        this.boards = boards;
      }
    },
    filteredPhotoList(photoList){
      const photos = photoList.filter(photo => photo.id !== null)
      return photos.length
    },
    defaultImg(e) {
      e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_RlT-ytB9A_TQFLKMqVYpdJiiRbckTCThmw&usqp=CAU'
    },
    async createComment(clubId, boardId) {
      if(!this.$store.state.memberId) {
        alert('로그인 후 시도해주세요.')
        return this.$router.push('/user/sign-in') 
      }
      const param = {
        content: this.newComment
      }
      
      await this.$axios.post(`/api/clubs/${clubId}/boards/${boardId}/comments`, param ).then(reuslt => {
        this.$router.go(0)
      }).catch(() => {
        alert('해당 동호회 회원만 댓글을 작성할 수 있습니다.')
        return this.$router.go(0)
      })
    },
    async deleteComment(boardId, commentId) {
      await this.$axios.delete(`/api/clubs/${this.clubId}/boards/${boardId}/comments/${commentId}`).then(result => {
        alert('댓글이 삭제되었습니다.')
        this.$router.go(0)
      })
    },
    async deleteFeed(boardId) {
      await this.$axios.delete(`/api/clubs/${this.clubId}/boards/${boardId}`).then(result => {
        alert('게시글이 삭제되었습니다.')
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