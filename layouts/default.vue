<template>
  <v-app>
    <nav>
      <div class="navbar-container">
        <div class="logo">
          <nuxt-link to="/promotion"><img src="~/assets/image/main-logo.png" class="homeLogo"></nuxt-link>
        </div>
        <ul class="navbar-links">
          <li>
            <nuxt-link to="/promotion" class="nav-link">홍보</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/club" class="nav-link">동호회</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/about" class="nav-link">대시보드</nuxt-link>
          </li>
        </ul>
        <div class="button-wrap" v-if="!isAuthenticated">
          <v-btn class="btn" elevation="0" variant="outlined" color="#58C9B9" @click="signIn">Sign in</v-btn>
          <v-btn class="btn" elevation="0" variant="outlined" color="#58C9B9" @click="signUp">Sign up</v-btn>
        </div>
        <div v-if="isAuthenticated">
          <p>{{ $store.state.memberId }}님 환영합니다!</p>
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

  methods: {
    signIn() {
      this.$router.push('/page/user/sign-in');
    },
    signUp() {
      this.$router.push('/page/user/sign-up');
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
  width: 75rem;
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
}

.btn {
  width: 90px;
  margin-right: 10px;
}

main {
  margin-top: 4rem;
}
</style>