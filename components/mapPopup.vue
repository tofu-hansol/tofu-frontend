<template>
  <div>
    <v-btn 
      elevation="0" 
      style="color: snow; font-weight: 700; font-size: .875rem;"
      @click="openDialog"
    > 지도보기
    </v-btn>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>모임 장소</v-card-title>
        <v-card-text>
          <defalt-map/>
        </v-card-text>
        <v-card-actions>
          <v-btn color="#2f9283" @click="closeDialog">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import defaltMap from './defaltMap.vue';
export default {
  components: { defaltMap },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
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