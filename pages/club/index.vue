<template>
  <div>
    <div class="image-slide">
    </div>
    <div>
      <v-tabs>
        <v-tab value="total">전체</v-tab>
        <v-tab value="workout">운동</v-tab>
        <v-tab value="cooking">요리</v-tab>
      </v-tabs>
    </div>
    <div class="club-short-list">
      <v-card>
        <v-card-text>
          <v-window>
            <v-window-item value="total">
              전체 클럽 리스트 
            </v-window-item>
            <v-window-item value="workout">
              운동 클럽 리스트
            </v-window-item>
            <v-window-item value="cooking">
              요리 클럽 리스트
            </v-window-item>
          </v-window>
          <p>content</p>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: null, 
    }
  }
}
</script>

<style scoped>
.image-slide {
  background-color: skyblue;
  width: 100%;
  height: 337px;
}
</style>