<template>
  <div class="main">
    <section class="slide-section">
      <div class="slide-wrap">
        <div>
          <h1 class="slide-title">
            두루두루
            <br>
            부대끼며
            <br>
            친해지는 한솔 모임
          </h1>
          <p class="slide-content">
            사내 동료들과 친해지고
            <br>
            취미생활도 찾아보세요.
          </p>
        </div>
        <div class="img-wrap">
          <img class="slide-img" src="~/assets/image/social.png"/>
        </div>
      </div>
    </section>
    <section class="content">
      <feed-card/>
    </section>
  </div>
</template>

<script>
import FeedCard from '@/components/feedCard.vue'

export default{
  components: { FeedCard },
}
</script>

<style scoped>
.slide-section {
  background-color: #c0e9e3;
  height: 337px;
}

.slide-wrap {
  max-width: 48rem;
  padding: 3rem 1rem 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.slide-title {
  font-size: 2rem;
}

.slide-content {
  margin-top: 10px;
  font-size: 1.125rem;
}

.img-wrap {
  width: 279px;
  height: 279px;
}

.slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  margin: 0 auto;
  padding-top: 2rem;
  max-width: 48rem;
}
</style>