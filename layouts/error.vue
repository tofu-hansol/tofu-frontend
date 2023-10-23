<template>
  <div class="wrap">
    <div class="content">
      <h1>Whoops, 404 😵</h1>
      <p>The page you were looking for does not exist</p>
    </div>
  </div>
</template>
<script>
export default{}
</script>

<style scoped>
.wrap {
  display: flex;
  justify-content: center;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  margin: 0 auto;
}
h1 {
  color: #2f9283;
}
</style>