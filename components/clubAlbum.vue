<template>
  <div>
    <ul>
      <li v-for="image in images" :key="image.imageId">
        <img class="activity-image" :src="image.imageUrl">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { imageId: 1, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_YKHwU2uFeb1FqsdBxRgj2O8VTxJwopfVKQ&usqp=CAU' },
        { imageId: 2, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-UvJeB_vVtWMBYtDyn7rmBR7d1nsxqtxXiA&usqp=CAU' },
        { imageId: 3, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhMqYsLaw9s7v4PIw7a_KJX0Ul87p1of2aCw&usqp=CAU' },
      ]
    }
  }

}
</script>

<style>
.activity-image{
  width: 400px;
  height: 250px;
}
</style>