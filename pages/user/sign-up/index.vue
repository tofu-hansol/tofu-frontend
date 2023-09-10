<template>
  <v-form @submit.prevent="submitForm">
    <v-text-field v-model="email" label="이메일"></v-text-field>
    <v-text-field v-model="password" label="비밀번호" type="password"></v-text-field>
    <v-text-field v-model="nickname" label="닉네임"></v-text-field>
    <v-select v-model="department" label="부서" :items="departments"></v-select>
    <v-select v-model="position" label="직급" :items="positions"></v-select>
    <v-text-field v-model="mbti" label="MBTI"></v-text-field>
    <v-btn type="submit" color="#58C9B9">회원가입</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
      nickname: '',
      department: null,
      position: null,
      mbti: '',
      departments: ['부서1', '부서2', '부서3'], // 부서 목록
      positions: ['직급1', '직급2', '직급3'], // 직급 목록
    }
  },
  methods: {
    submitForm() {
      axios.get('api/signup')
      .then((res) => {
        this.data = res.data
      })
    },
  },
}
</script>