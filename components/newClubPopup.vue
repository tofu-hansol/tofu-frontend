<template>
  <div>
    <v-btn 
      elevation="0" 
      color="#2f9283" 
      style="color: snow; font-weight: 700; font-size: .875rem;"
      @click="openDialog"
    > 동호회 생성
    </v-btn>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>동호회 생성</v-card-title>
        <v-card-text>
          <!-- 팝업 내용 -->
          <v-form @submit.prevent="createClub">
            <v-text-field label="동호회명" v-model="clubName" required></v-text-field>
            <v-text-field label="동호회 설명" v-model="clubDescription" required></v-text-field>
            <v-text-field label="재정 계획" v-model="budgetPlan" required></v-text-field>
            
            <v-btn color="primary" @click="addMember">회원 추가</v-btn>
            <div class="new-member-wrap" v-for="(member, index) in members" :key="index">
              <div class="new-member-info">
                <v-text-field label="이름" v-model="member.name" required></v-text-field>
                <v-text-field label="직급" v-model="member.role" required></v-text-field>
                <v-text-field label="부서" v-model="member.department" required></v-text-field>
                <v-text-field label="정보" v-model="member.info" required></v-text-field>
              </div>
              <v-btn color="#EF5350" style="margin: auto 10px;" @click="removeMember(index)">삭제</v-btn>
            </div>
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
      clubName: '',
      clubDescription: '',
      budgetPlan: '',
      members: [], // 동호회 회원 정보를 저장할 배열
      addNewMember: false,
      newMember: {
        name: '',
        role: '',
        department: '',
        info: '',
      },
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    addMember() {
      // 새 동호회 회원 정보 입력 영역을 추가
      this.members.push({
        name: '',
        role: '',
        department: '',
        info: '',
      });
    },
    removeMember(index) {
      // 동호회 회원을 삭제
      this.members.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.new-member-wrap {
  display: flex;
  justify-content: center;
}

.new-member-info {
  display: flex;
}

.v-btn {
  color: snow; 
  font-weight: 700; 
  font-size: .875rem;
}
</style>
