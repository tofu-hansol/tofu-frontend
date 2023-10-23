<template>
  <div class="wrap">
    <v-card>
      <v-card-title>
        새로운 글작성
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-text-field 
              v-model="title"
              label="제목"
              clear-icon="mdi-close-circle"
              clearable
              outlined
              color="#58C9B9"
              @click:clear="clearTitle"
            >
            </v-text-field>
          </v-row>
          <v-row>
            <v-textarea 
              v-model="content"
              label="내용"
              clear-icon="mdi-close-circle"
              clearable
              outlined
              color="#58C9B9"
              @click:clear="clearContent"
              >
            </v-textarea>
          </v-row>
          <v-row>
            <v-file-input
            label="이미지 업로드"
            outlined
            color="#58C9B9"
            prepend-icon="mdi-camera"
            @change="selectFile"
            ></v-file-input>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="pb-5 d-flex justify-end">
        <v-btn
            class="submit-btn"
            color="medium-emphasis"
            min-width="92"
            rounded
            variant="outlined"
            elevation="0"
            @click="moveToBack"
          >
            뒤로가기
          </v-btn>
          <v-btn
            type="submit"
            class="submit-btn"
            color="#58C9B9"
            min-width="92"
            rounded
            variant="outlined"
            elevation="0"
            @click="send"
          >
            작성하기
          </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      content: '',
      image: '',
      clubId: 0,
    }
  }, 

  created() {
    this.clubId = this.$route.query.clubId
  },
  
  methods: {
    clearTitle () {
      this.message = ''
    },
    clearContent() {
      this.content = ''
    },
    moveToBack() {
      this.$router.go(-1)
    }, 

    async send() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('content', this.content);
      formData.append('clubPhotoRequestDTOs[0][id]', 0);
      formData.append('clubPhotoRequestDTOs[0][image]', this.image);
      formData.append('clubPhotoRequestDTOs[0][isMainPhoto]', true); 

      const api = `/api/clubs/${this.clubId}/boards`
      
      await this.$axios.patch(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authentication': 'Bearer ' + this.$store.state.accessToken
        }
      })
    },

    selectFile(file) {
      this.image = file
    }
  }
}
</script>

<style scoped>
.wrap {
  padding: 100px 0px;
}

.v-card {
  padding: 0 2rem;
  width: 48rem;
  margin-left: auto; 
  margin-right: auto;
}

.v-card__title {
  padding: 1rem 0.2rem;
  margin-bottom: 1rem;
  font-weight: 800;
}

.v-card__text {
  padding-bottom: 0;
}

</style>