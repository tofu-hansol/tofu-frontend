<template>
  <v-card class="mx-auto pa-12 pb-8" :elevation="0" style="max-width: 500px; padding: 20px; width: 100%;">
    <nuxt-link to="/" class="nav-link">
      <img src="~/assets/image/logo.png" alt="두부한모" style="width:200px;"/>
    </nuxt-link>
    <v-form ref="form" v-model="isValid" class="pa-4 pt-6">
      <v-text-field
        v-model="submit.email"
        label="이메일"
        :rules="[rules.email, rules.hansolEmail]"
        color="#58C9B9"
        prepend-inner-icon="mdi-email-outline"
      ></v-text-field>

      <v-text-field
        v-model="submit.password"
        label="비밀번호"
        :rules="[rules.password, rules.length(6)]"
        color="#58C9B9"
        type="password"
        prepend-inner-icon="mdi-lock-outline"
      ></v-text-field>

      <v-text-field
        v-model="submit.name"
        label="닉네임"
        color="#58C9B9"
      ></v-text-field>

      <v-select
        v-model="submit.dept"
        label="부서"
        :items="['부서1','부서2']"
        :rules="[rules.required]"
        color="#58C9B9"
        required
      ></v-select>


      <v-text-field
        v-model="submit.mbti"
        label="MBTI"
        color="#58C9B9"
      ></v-text-field>

      <v-checkbox
        v-model="agreement"
        :rules="[rules.required]"
        color="#58C9B9"
      ><template #label>
          회원가입에 동의합니다.
        </template>
      </v-checkbox>
    </v-form>

    <v-card-actions>
      <v-btn
        variant="text"
        @click="resetForm"
      >
        지우기
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        class="w-35"
        :disabled="!isValid"
        color="#58C9B9"
        @click="submitForm"
      >
        인증요청
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      depts: [
        'DT개발팀','스마트연구소', 'IT전략기술사업팀'
      ],
      submit: {
        email: '',
        password: '',
        name: '',
        dept: null,
        mbti: '',
      },
      rules: {
        email: v => (v || '').match(/^.+@.+\..+$/) || '올바른 이메일 주소를 입력하세요',
        hansolEmail: v => (v || '').match(/@hansol\.com$/) || '한솔 이메일 주소만 가능합니다',
        length: len => v => (v || '').length >= len || `${len} 글자 이상 입력하세요`,
        password: v => (v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) || '숫자, 대문자, 특수문자를 포함해야 합니다',
        required: v => !!v || '필수 선택값입니다.',
      },
      agreement: false,
      isValid: false,
    }
  },
  methods: {
    resetForm() {
      this.$refs.form.reset()
    },
    submitForm() {
      axios.get('/api/user/signUp')
    },
  },
}
</script>