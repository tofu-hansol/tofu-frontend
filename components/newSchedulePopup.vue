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
    <v-dialog v-model="dialog" scrollable max-width="600" max-height="600">
      <v-card max-height="500">
        <v-card-title>모임일정 생성</v-card-title>
        <v-card-text class="pa-0 pl-5 pr-5">
          <v-form>
            <v-text-field v-model="schedule.title" outlined color="#58C9B9" label="제목"></v-text-field>
            <v-text-field v-model="schedule.content" outlined color="#58C9B9" label="내용"></v-text-field>
            <v-text-field v-model="schedule.eventAt" type="datetime-local" outlined color="#58C9B9" label="날짜"></v-text-field>
            <v-row class="mt-0">
              <v-col cols="6">
                <v-text-field id="postcode" v-model="postcode" outlined color="#58C9B9" placeholder="우편번호"></v-text-field>
              </v-col>
              <v-col class="mt-3" cols="3">
                <v-btn 
                  elevation="0"
                  color="#58C9B9" 
                  @click="execDaumPostcode()"
                >우편번호 찾기</v-btn>
              </v-col>
            </v-row>
            <v-text-field id="roadAddress" v-model="roadAddress" outlined color="#58C9B9" placeholder="도로명주소"></v-text-field>
            <span id="guide" style="color:#999;display:none"></span>
            <v-text-field id="detailAddress" v-model="detailAddress" outlined color="#58C9B9" placeholder="상세주소"></v-text-field>
            <v-text-field id="latitude" v-model="latitude" outlined color="#58C9B9" placeholder="상세주소"></v-text-field>
            <v-text-field id="longitude" v-model="longitude" outlined color="#58C9B9" placeholder="상세주소"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-5">
          <v-btn rounded color="#ffffff" @click="closeDialog">닫기</v-btn>
          <v-btn rounded type="submit" color="#58C9B9" @click="createSchedule">생성</v-btn>
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
      schedule: {
        title: '',
        content: '',
        eventAt: '',
        latitude: '',
        longitude: '',
      },
      latitude: '',
      longitude: '',
      postcode: '',
      roadAddress: '',
      detailAddress: '',
    }
  },

  head() {
    return {
      title: 'kakao post number test',
      script: [
        {hid: 'script', src: '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'},
      ]
    }
  },
  
  watch: {
    latitude: function(val) {
        this.schedule.latitude = val
    },
    longitude: function(val) {
      this.schedule.longitude = val
    }
  },

  mounted() {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&libraries=services`;
      document.head.appendChild(script);
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

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          document.getElementById('postcode').value = data.zonecode;
          document.getElementById("roadAddress").value = roadAddr;

          const geocoder = new kakao.maps.services.Geocoder();
          geocoder.addressSearch(data.roadAddress, function(result, status){
            document.getElementById('latitude').value = result[0].y
            document.getElementById('longitude').value = result[0].x
          }) 

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
        },
      }).open();
    },

    async createSchedule() {
      await this.$axios.post(`/api/clubs/${this.$route.params.id}/schedules`, this.schedule,{
        headers: {
          Authentication: 'Bearer ' + this.$store.state.accessToken
        }}
      ).then(result => {
        this.$router.go(0)
      })
    }
    
  },
}
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
