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
            <v-text-field v-model="schedule.placeName" outlined color="#58C9B9" label="장소"></v-text-field>
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
            <v-text-field v-show="false" v-model="latitude" outlined color="#58C9B9" placeholder="위도"></v-text-field>
            <v-text-field v-show="false" v-model="latitude" outlined color="#58C9B9" placeholder="경도"></v-text-field>
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
        placeName: '',
        eventAt: '',
        latitude: 0,
        longitude: 0,
      },
      latitude: 0,
      longitude: 0,
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
        console.log(val)
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
    const self = this;
    new window.daum.Postcode({
      oncomplete: (data) => {
          self.roadAddress = data.roadAddress
          self.postcode = data.postcode
          self.detailAddress = data.detailAddress
          const roadAddr = data.roadAddress;
          let extraRoadAddr = '';
          if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
              extraRoadAddr += data.bname;
          }
          if(data.buildingName !== '' && data.apartment === 'Y'){
              extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }

          document.getElementById('postcode').value = data.zonecode;
          document.getElementById("roadAddress").value = roadAddr;

          const geocoder = new kakao.maps.services.Geocoder();
          geocoder.addressSearch(data.roadAddress, function(result, status){
            self.setLatitude(result[0].y)
            self.setLongitude(result[0].x)
          }) 

          const guideTextBox = document.getElementById("guide");
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
      await this.$axios.post(`/api/clubs/${this.$route.params.id}/schedules`, this.schedule ,{
        headers: {
          Authentication: 'Bearer ' + this.$store.state.accessToken
        }}
      ).then(result => {
        this.$router.go(0)
      })
    },
    
    setLatitude(latitude) {
      this.latitude = latitude
    },

    setLongitude(longitude) {
      this.longitude = longitude
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
