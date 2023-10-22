<template>
  <div class="fixed-button">
    <v-btn 
      id="create-button"
      class="btn"
      elevation="0"
      color="#58C9B9"
      style="font-weight: 700; font-size: .875rem;"
      @click="openDialog"
    > 모임 생성
    </v-btn>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>모임일정 생성</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="제목"></v-text-field>
            <v-text-field label="내용"></v-text-field>
            <v-text-field label="시간"></v-text-field>
            <v-row>
              <v-col cols="6">
                <v-text-field id="postcode" placeholder="우편번호"></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-btn @click="execDaumPostcode()">우편번호 찾기</v-btn>
              </v-col>
            </v-row>
            <v-text-field id="roadAddress" placeholder="도로명주소"></v-text-field>
            <v-text-field id="jibunAddress" placeholder="지번주소"></v-text-field>
            <span id="guide" style="color:#999;display:none"></span>
            <v-text-field id="detailAddress" placeholder="상세주소"></v-text-field>
            <v-text-field id="extraAddress" placeholder="참고항목"></v-text-field>
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
    }
  },

  head() {
    return {
      title: 'kakao post number test',
      script: [
        {hid: 'script', src: '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'}
      ]
    }
  },

  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },

    execDaumPostcode() {
              new window.daum.Postcode({
          oncomplete: function(data) {
              // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

              // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
              // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
              const roadAddr = data.roadAddress; // 도로명 주소 변수
              let extraRoadAddr = ''; // 참고 항목 변수

              // 법정동명이 있을 경우 추가한다. (법정리는 제외)
              // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
              if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                  extraRoadAddr += data.bname;
              }
              // 건물명이 있고, 공동주택일 경우 추가한다.
              if(data.buildingName !== '' && data.apartment === 'Y'){
                  extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
              }
              // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
              if(extraRoadAddr !== ''){
                  extraRoadAddr = ' (' + extraRoadAddr + ')';
              }

              // 우편번호와 주소 정보를 해당 필드에 넣는다.
              document.getElementById('postcode').value = data.zonecode;
              document.getElementById("roadAddress").value = roadAddr;
              document.getElementById("jibunAddress").value = data.jibunAddress;
              
              // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
              if(roadAddr !== ''){
                  document.getElementById("extraAddress").value = extraRoadAddr;
              } else {
                  document.getElementById("extraAddress").value = '';
              }

              const guideTextBox = document.getElementById("guide");
              // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
              if(data.autoRoadAddress) {
                  const expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                  guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                  guideTextBox.style.display = 'block';

              } else if(data.autoJibunAddress) {
                  const expJibunAddr = data.autoJibunAddress;
                  guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                  guideTextBox.style.display = 'block';
              } else {
                  guideTextBox.innerHTML = '';
                  guideTextBox.style.display = 'none';
              }
          }
        }).open();

    }
  },
};
</script>

<style scoped>
.fixed-button {
  position: fixed;
  bottom: 5.5rem;
  right: 2rem;
  z-index: 999; /* 다른 요소 위에 표시하도록 z-index 설정 */
}

.fixed-button #create-button {
  border-radius: 2rem;
  padding: 0;
  width: 6rem;
  height: 3rem;
}
</style>
