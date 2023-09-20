<template>
<div>
    <v-card
      class="mx-auto pa-12 pb-8 text-center"
      elevation="0"
      max-width="500"
    >
      <nuxt-link to="/" class="mx-auto">
        <img class="mx-auto" src="~/assets/image/logo.png" alt="두부한모" style="width:300px;"/>
      </nuxt-link>

      <v-form ref="form" class="pa-4 pt-6">
        <v-text-field
          v-model="submit.email"
          color="#58C9B9"
          placeholder="이메일"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="submit.password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          color="#58C9B9"
          placeholder="비밀번호"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>
      </v-form>

      <v-btn
        block
        class="mx-auto my-4"
        color="#58C9B9"
        size="x-large"
        variant="tonal"
        @click="login"
      >
        로그인
      </v-btn>

      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          비밀번호찾기 <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      submit: {
        email: '',
        password: '',
      },
      visible: false,
    }
  },
  methods: {
    async login() {
      await this.$store.dispatch('login', this.submit)
      await this.$router.push('/')
    }
  },
}
</script>
