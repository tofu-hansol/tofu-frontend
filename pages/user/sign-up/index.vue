<template>
  <v-card class="mx-auto pa-12 pb-8" :elevation="0" style="max-width: 500px; padding: 20px; width: 100%;">
    <nuxt-link to="/" class="nav-link">
      <img src="~/assets/image/logo.png" alt="두부한모" style="width:200px;"/>
    </nuxt-link>
    <v-form ref="form" v-model="isValid" class="pa-4 pt-6">
      <v-text-field
        v-model="submit.email"
        label="이메일"
        color="#58C9B9"
        prepend-inner-icon="mdi-email-outline"
      ></v-text-field>

      <v-text-field
        v-model="submit.password"
        label="비밀번호"
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
        :items="depts"
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
export default {
  data() {
    return {
      depts: [],
      submit: {
        email: '',
        password: '',
        name: '',
        dept: null,
        deptId: 1,
        mbti: '',
      },
      agreement: false,
      isValid: false,
    }
  },

  mounted() {
    this.dataLoad()
  },

  methods: {
    async dataLoad() {
      const result = await this.$axios.get('/api/depts', { 
        headers: {
          Authentication: 'Bearer ' + this.$store.state.accessToken
        },
        params: { companyId: 1}
      })
      console.log(result)
    },

    resetForm() {
      this.$refs.form.reset()
    },
    async submitForm() {
      await this.$axios.post('/api/auth/signup', this.submit).then(
        rst => {
          console.log('rst -> ', rst)

          if(rst.status === 200) {
            this.$router.push('/')
          }
        }
      ).catch(
        err => console.log('err -> ', err)
      )
    },
  },
}
</script>
