<template>
  <nav>
    <div class="navbar-container">
      <ul class="navbar-links">
        <li>
          <nuxt-link to="/" class="nav-link"><img src="~/assets/image/main.jpeg" class="logo"></nuxt-link>
        </li>
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
      <div v-if="!auth">
        <v-btn color="#58C9B9" @click="signIn">Sign in</v-btn>
        <v-btn color="#58C9B9" @click="signUp">Sign up</v-btn>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      auth: false
    }
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
.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: 920px;
}

.navbar-links {
  list-style-type: none;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 15px;
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

.navbar-links img {
  height: 65px;
}
</style>