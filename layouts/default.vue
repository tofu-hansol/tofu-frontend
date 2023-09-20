<template>
  <v-app>
    <topNavbar />
    <Nuxt />
  </v-app>
</template>

<script>
import topNavbar from "~/components/layout/topNavbar.vue"

export default {
  components: { topNavbar },
}
</script>