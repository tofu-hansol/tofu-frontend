<template>
  <div>
    <h1>이미지 업로드 테스트</h1>
    <v-form @submit.prevent>
      <v-file-input
      label="File input"
      variant="filled"
      prepend-icon="mdi-camera"
      @change="selectFile"
      ></v-file-input>
      <v-btn type="submit" block class="mt-2" @click="testSend">Submit</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: '',
    }
  },

  methods: {
    async testSend() {
      const formData = new FormData();
      formData.append('image', this.image)

      console.log(this.$store.state.accessToken)
      const api = '/api/clubs/1/profile-image'
      
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

<style>

</style>