<template>
  <div>
    <promotion/>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      message:''
    }
  },

  created() {
    const tokenInfo = this.$store.state
    console.log(tokenInfo)
    this.$router.push('/promotion')
  },


}
</script>
