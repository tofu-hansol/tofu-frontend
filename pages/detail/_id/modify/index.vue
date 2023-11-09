<template>
  <div class="wrap">
    <v-card>
      <v-card-title>
        동호회 정보 수정
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-text-field 
              v-model="club.accountNumber"
              label="계좌번호"
              clear-icon="mdi-close-circle"
              clearable
              outlined
              color="#58C9B9"
              @click:clear="clearTitle"
            >
            </v-text-field>
          </v-row>
          <v-row>
            <v-text-field 
              v-model="club.fee"
              label="회비"
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
              v-model="club.description"
              label="동호회설명"
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
            label="배경 이미지 업로드"
            outlined
            color="#58C9B9"
            prepend-icon="mdi-camera"
            @change="selectFile('backgroundImage')"
            ></v-file-input>
          </v-row>
          <v-row>
            <v-file-input
            label="프로필 이미지 업로드"
            outlined
            color="#58C9B9"
            prepend-icon="mdi-camera"
            @change="selectFile('profileImage')"
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
      club: {
        clubId: 0,
        name: '',
        clubProfileUrl: '',
        clubBackgroundUrl: '',
        description: '',
        fee: 0,
        accountNumber: '',
        memberCount: 0,
        boardCount: 0,
        categoryId: 0,
      },
      clubId: '',
      backgroundImage: null, 
      profileImage: null,
    }
  }, 

  created() {
    this.clubId = this.$route.params.id
    this.dataLoad()
  },
  
  methods: {
    async dataLoad() {
      const result = await this.$axios.get(`/api/clubs/${this.$route.params.id}`)
      console.log(result)
      this.club = result.data.data
    },
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
      const clubEditRequestDTO = {
        description: this.club.description,
        accountNumber: this.club.accountNumber,
        fee: Number(this.club.fee),
        categoryId: this.club.categoryId,
      }

      console.log(clubEditRequestDTO)
      const formData = new FormData()
      formData.append('clubEditRequestDTO', clubEditRequestDTO)
      formData.append('backgroundImage', this.backgroundImage)
      formData.append('profileImage', this.profileImage)

      await this.$axios.patch(`/api/clubs/${this.club.clubId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authentication': 'Bearer ' + this.$store.state.accessToken
        }
      }).then(result => {
        this.$$router.go(-1)
      }).catch(ex => {
        console.log(ex)
      })
    },

    selectFile(fileType) {
      // 파일 선택 시 fileType을 확인하여 적절한 데이터 속성에 할당
      if (fileType === 'backgroundImage') {
        this.backgroundImage = event.target.files[0];
      } else if (fileType === 'profileImage') {
        this.profileImage = event.target.files[0];
      }
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