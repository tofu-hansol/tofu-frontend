<template>
  <nav>
    <div class="navbar-container">
      <ul class="navbar-links">
        <li><nuxt-link to="/" class="nav-link">두부한모</nuxt-link></li>
        <li><nuxt-link to="/about" class="nav-link">홍보</nuxt-link></li>
        <li><nuxt-link to="/about" class="nav-link">동호회</nuxt-link></li>
        <li><nuxt-link to="/about" class="nav-link">대시보드</nuxt-link></li>
      </ul>
      <div>
        <v-btn color="#58C9B9" @click="signIn">Sign in</v-btn>
        <v-btn color="#58C9B9" @click="signUp">Sign up</v-btn>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
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
.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin: 0 auto;
  width: 920px;
}

.navbar-logo img {
  max-width: 100px;
}

.navbar-links {
  list-style-type: none;
  padding: 0;
  display: flex;
  gap: 20px;
}

.navbar-links li {
  display: inline;
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
</style>