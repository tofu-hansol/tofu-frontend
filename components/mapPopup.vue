<template>
  <div>
    <v-btn 
      rounded
      elevation="0"
      color="#2f9283" 
      style="color: #ffffff; font-weight: 700; font-size: .875rem;"
      @click="openDialog"
    > 지도보기
    </v-btn>
    <v-dialog v-model="dialog" max-width="500" :key="dialogKey">
      <v-card>
        <v-card-title>모임 장소</v-card-title>
        <v-card-text>
          <defalt-map :latitude="latitude" :longitude="longitude"/>
        </v-card-text>
        <v-card-actions>
          <v-btn color= "#58c9b9" @click="closeDialog">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import defaltMap from './defaltMap.vue';
export default {
  components: { defaltMap },
  props: {
    latitude: Number,
    longitude: Number,
  },
  data() {
    return {
      dialog: false,
      dialogKey: 0
    }
  },
  methods: {
    openDialog() {
      this.dialog = true;
      this.dialogKey += 1;
    },
    closeDialog() {
      this.dialog = false;
      this.$router.go(0)
    },
  }
}
</script>

<style scoped>
  .info-window-container {
    padding: 10px;
    width: 300px;
    height: 100px;
  }
</style>