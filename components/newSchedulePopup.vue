<template>
  <div>
    <v-btn 
      @click="openDialog"
      elevation="0" 
      color="#2f9283" 
      style="color: snow; font-weight: 700; font-size: .875rem;"
    > 모임 생성
    </v-btn>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>모임 생성</v-card-title>
        <v-card-text>
          <!-- 팝업 내용 -->
          <v-form @submit.prevent="createClub">
            <v-text-field label="동호회명" v-model="clubName" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn type="submit" color="#2f9283">생성</v-btn>
          <v-btn color="#2f9283" @click="closeDialog">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
</style>
