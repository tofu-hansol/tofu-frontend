<template>
  <v-app>
    <nav>
      <div class="navbar-container">
        <div class="logo">
          <nuxt-link to="/"><img src="~/assets/image/main-logo.png" class="homeLogo"></nuxt-link>
        </div>
        <ul class="navbar-links">
          <li>
            <nuxt-link to="/promotion" class="nav-link">홍보</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/club" class="nav-link">동호회</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/dashboard" class="nav-link">대시보드</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/budget" class="nav-link">예산</nuxt-link>
          </li>
        </ul>
        <div v-if="!isAuthenticated" class="button-wrap">
          <v-btn rounded class="btn" elevation="0" variant="outlined" color="#58C9B9" @click="signIn">Sign in</v-btn>
          <v-btn rounded class="btn" elevation="0" variant="outlined" color="#58C9B9" @click="signUp">Sign up</v-btn>
        </div>
        <div v-if="isAuthenticated" class="button-wrap">
          <v-btn fab small class="btn" elevation="0" color="#ffffff">
            <v-icon aria-hidden="false">mdi-account</v-icon>
          </v-btn>
          <v-btn rounded class="btn" elevation="0" variant="outlined" color="#58C9B9" @click="logout">로그아웃</v-btn>
        </div>
      </div>
    </nav>
    <main>
      <Nuxt />
    </main>
  </v-app>
</template>

<script>

export default {
  data() {
    return {
    }
  },

  computed: {
    isAuthenticated() {
      const memberId = this.$store.state.memberId
      return memberId ?? false
    },
  },

  mounted() {
    this.$store.dispatch("doReadStateFromStorage");  
  },

  methods: {
    signIn() {
      this.$router.push('/user/sign-in')
    },
    signUp() {
      this.$router.push('/user/sign-up')
    },
    logout() {
      this.$store.dispatch('logout')
    },
    moveToMyPage() {
      console.log("마이페이지")
    }
  },
}
</script>

<style scoped>
nav {
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 9999;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 1.2rem 2rem;
  position: relative;
  max-width: 75rem;
  height: 4rem;
}

.navbar-links {
  list-style-type: none;
  display: flex;
  align-items: center;
  gap: 30px;
  width: 100%;
}

.logo {
  height: 36px;
}

img {
  height: 100%;
}

.nav-link {
  color: black;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
}

.nav-link:hover {
  text-decoration: none;
}

.navbar-links img {
  height: 65px;
}

.button-wrap {
  display: flex;
  justify-content: space-between;
}

.btn {
  margin-right: 10px;
}

main {
  margin-top: 4rem;
}

</style>