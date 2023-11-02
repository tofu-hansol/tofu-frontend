<template>
  <div>
    <v-card
      v-for="schedule in schedules"
      :key="schedule.id"
      class="d-flex mt-2"
      outlined
    >
      <div>
        <div class="calendar-icon rounded-xl pt-1 pb-1">
          <div class="month">
            {{ `${getMonth(schedule.eventAt)}월` }}
          </div>
          <div class="day">{{ `${getDay(schedule.eventAt)}일` }}</div>
          <div class="week">{{ getDayOfWeek(schedule.eventAt) }}</div>
        </div>
      </div>
      <v-list-item three-line>
        <v-list-item-content>
          <div>
            <v-btn class="pa-1 ma-0" elevation="0" rounded :color="getScheduleStateColor(schedule.clubScheduleStatus)" style="font-size: small; height: 100%;">
              {{ getScheduleState(schedule.clubScheduleStatus) }}
            </v-btn>
          </div>
          <v-list-item-title class="text-h5 mb-1">
            {{ schedule.title }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <div class="detail">
              <div>장소: {{ schedule.placeName }}</div>
              <span class="time">{{ `${getTime(schedule.eventAt)}` }}</span>
              <!-- <span class="perssonel">2/10명</span> -->
            </div>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-card-actions>
          <v-row class="d-flex flex-column">
            <map-popup class="ma-1" :latitude="schedule.latitude" :longitude="schedule.longitude"/>
            <v-btn
              v-if="isAble(schedule.clubScheduleStatus)"
              outlined
              rounded
              text
              @click="joinClubSchedule(schedule.id)"
            >
              참여하기
            </v-btn>
          </v-row>
      </v-card-actions>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import mapPopup from './mapPopup.vue'
export default {
  components: { mapPopup },
  data() {
    return {
      schedules : [
        // { id: 1,
        //   event_at: '2023-10-10 07:58:43',
        //   title: '한솔두부',
        //   placeName: '한솔두부모임',
        //   clubId: 1,
        //   status: 'RECRUITING',
        // },
        { id: 0,
          title: '',
          eventAt: '',
          clubScheduleStatus: '',
          placeName: '',
          latitude: 0,
          longitude: 0,
          applicants: 0
        }
      ]
    }
  },
  
  created() {
    this.dateLoad()
  },

  methods: {
    async dateLoad() {
      const clubId = this.$route.params.id
      const result = await this.$axios.get(`/api/clubs/${clubId}/schedules`)
      this.schedules = result.data.data
    },

    async joinClubSchedule(scheduleId) {
      if (!this.$store.state.memberId) {
        alert('로그인 후 시도해주세요.')
        return this.$router.push('/user/sign-in')
      }

      const clubId = this.$route.params.id
      await this.$axios.post(`/api/clubs/${clubId}/schedules/${scheduleId}/applicants`).then(result => {
        alert('참가 신청이 완료되었습니다!')
      }).catch(error => {
        alert(error.response.data.message)
      })
    },

    getDayOfWeek(date) {
      const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Set']
      const dayOfWeek = week[new Date(date).getDay()]

      return dayOfWeek
    },
    
    getYear(date){
      return date.substring(0,4)
    },

    getMonth(date){
      return date.substring(5,7)
    },

    getDay(date) {
      return date.substring(8,10)
    },

    getTime(date){
      const dateList = date.split('T')
      const time = dateList[1]
      return time
    },

    isAble(status) {
      return status === 'RECRUITING'
    },

    getScheduleState(status) {
      const statusName = ['모집중', '마감']
      return status === 'RECRUITING' ? statusName[0] : statusName[1]
    },

    getScheduleStateColor(status) {
      const colors = ['#52da40', '#e93c3c']
      return status === 'RECRUITING' ? colors[0] : colors[1]
    }
  }
}
</script>

<style scoped>
.v-card {
  align-items: center;
  padding: 0 1rem;
}

.calendar-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  width: 4.5rem;
  height: 4.5rem;
  background-color: #f6f8fa;
}

.calendar-icon > * {
  box-sizing: border-box; 
  width:100%; 
  height:100%;
  text-align: center;
}

.month {
  font-size: small;
}

.day {
  font-size: x-large;
  font-weight: 900;
}

.week {
  font-size: small;
}
</style>