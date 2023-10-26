<template>
  <v-card
    class="d-flex"
    max-width="400"
    outlined
  >
    <div>
      <div class="calendar-icon rounded-xl pt-1 pb-1">
        <div class="month">
          10월
        </div>
        <div class="day">27일</div>
        <div class="week">Fri</div>
      </div>
    </div>
    <v-list-item three-line>
      <v-list-item-content>
        <div>
          <span class="d-day-icon">
            모집중
          </span>
        </div>
        <v-list-item-title class="text-h5 mb-1">
          모임 제목
        </v-list-item-title>
        <v-list-item-subtitle>
          <div class="detail">
            <div>장소</div>
            <span class="time">오후 01:00</span>
            <span class="perssonel">2/10명</span>
          </div>
        </v-list-item-subtitle>
      </v-list-item-content>
      <div>
        <v-card-actions>
          <map-popup/>
          <v-btn
            outlined
            rounded
            text
          >
            참여하기
          </v-btn>
      </v-card-actions>
      </div>
    </v-list-item>
  </v-card>
</template>

<script>
import mapPopup from './mapPopup.vue'
export default {
  components: { mapPopup },
  methods: {
    showMap() {
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
  font-size: large;
  font-weight: 900;
}

.week {
  font-size: small;
}
</style>