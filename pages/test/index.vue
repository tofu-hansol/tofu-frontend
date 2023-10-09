<template>
  <div>
    <h1>{{ data.data }}</h1>
  </div>
</template>

<script>

export default {
  data() {
    return {
      data: ''
    }
  },
  mounted() {
    this.getTest()
  },
  methods: {
    getTest() {
      this.$axios.get('/api/tests')
      .then((res) => {
        this.data = res.data
      })
    }
  }
}
</script>