<template>
  <div>
    <h1>홈 페이지</h1>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',

  created() {
    const tokenInfo = this.$store.state
    console.log(tokenInfo)
  }
}
</script>
