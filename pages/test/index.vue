<template>
  <div>
    <h1>{{ data.data }}</h1>
  </div>
</template>

<script>
import axios from 'axios'

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
      axios.get('api/tests')
      .then((res) => {
        this.data = res.data
      })
    }
  }
}
</script>