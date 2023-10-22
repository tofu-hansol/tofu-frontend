<template>
  <div class="main">
    <feed-card/>
    <write-button/>
  </div>
</template>

<script>
import FeedCard from '@/components/feedCard.vue'
import WriteButton from '@/components/writeButton.vue'

export default{
  components: { FeedCard, WriteButton },
}
</script>

<style scoped>
</style>