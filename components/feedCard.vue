<template>
  <v-card class="mx-auto" style="max-width: 920px; width: 100%;">
    <v-card-title style="line-height: 1.5rem;">
      <v-avatar class="member-image">
        <img src="https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg" alt="Profile Image" />
      </v-avatar>
      <div class="feed-header">
        <div class="member-info">
          <span class="member-name">{{ name }}({{ dept }})</span>
        </div>
        <div class="feed-info">
          <span>{{ time }}</span>
        </div>
      </div>
    </v-card-title>

    <v-card-text>
      <div class="content">
        <p>안녕하세요. Made By 총무 서민아입니다.</p>
      </div>

      <!-- 이미지 -->
      <v-img src="http://www.sisacast.kr/news/photo/202109/33845_31931_424.jpg" alt="Post Image" class="post-image"></v-img>
    </v-card-text>

    <v-card-actions>

      <v-icon>mdi-comment-outline</v-icon>
      <span>댓글 {{ comment_conunt }} 개</span>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      name: '서민아',
      dept: 'SI개발파트',
      time: '6시간 전',
      comment_conunt: 10
    }
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
</style>