<template>
  <div>
    <v-row>
      <v-col
        v-for="image in images"
        :key="image.id"
        class="d-flex child-flex"
        cols="4"
      >
        <v-img
          :src="image.imageUrl"
          aspect-ratio="1"
          cover
          class="bg-grey-lighten-2 rounded-xl"
        >
          <template #placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="grey-lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    param: {
      type: String, 
      default: '',
    }
  },

  data() {
    return {
      images: [
        // { imageId: 1, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_YKHwU2uFeb1FqsdBxRgj2O8VTxJwopfVKQ&usqp=CAU' },
        // { imageId: 2, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-UvJeB_vVtWMBYtDyn7rmBR7d1nsxqtxXiA&usqp=CAU' },
        // { imageId: 3, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhMqYsLaw9s7v4PIw7a_KJX0Ul87p1of2aCw&usqp=CAU' },
      ],
      clubId: this.param
    }
  },

  created() {
    this.dataLoad()
  },

  methods: {
    async dataLoad() {
      await this.$axios.get(`/api/clubs/${this.clubId}/boards/photos`).then(result => {
        this.images = result.data.data
        console.log(result)
      })
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