<template lang="html">
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 md10>
        <h1 class="display-1">ปฎิทินการนัดหมาย</h1>
      </v-flex>
      <v-flex xs12 sm6 md2>
        <v-menu v-model="modal" ref="dialog" :close-on-content-click="false" :nudge-right="40" min-width="290" transition="scale-transition" offset-y full-width lazy>
          <v-text-field v-model="date" label="ค้นหาวันที่นัด" slot="activator" append-icon="event" readonly required></v-text-field>
          <v-date-picker v-model="date" locale="th" @change="save"></v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>
    <v-layout>
      <table class="mt-1 tabHeight counterTable alltabletdth">
        <thead>
          <tr>
            <th class="allth alltabletdth">รายชื่อ/เวลา</th>
            <th class="allth alltabletdth" colspan="3">
              <p class="columntime mb-0">08:00</p>
              <p class="columntime mb-0">09:00</p>
            </th>
            <th class="allth alltabletdth" colspan="3">
              <p class="columntime mb-0">09:00</p>
              <p class="columntime mb-0">10:00</p>
            </th>
            <th class="allth alltabletdth" colspan="3">
              <p class="columntime mb-0">10:00</p>
              <p class="columntime mb-0">11:00</p>
            </th>
            <th class="allth alltabletdth" colspan="3">
              <p class="columntime mb-0">11:00</p>
              <p class="columntime mb-0">12:00</p>
            </th>
            <th class="allth alltabletdth" colspan="3">
              <p class="columntime mb-0">12:00</p>
              <p class="columntime mb-0">13:00</p>
            </th>
            <th class="allth alltabletdth" colspan="3">
              <p class="columntime mb-0">13:00</p>
              <p class="columntime mb-0">14:00</p>
            </th>
            <th class="allth alltabletdth" colspan="3">
              <p class="columntime mb-0">14:00</p>
              <p class="columntime mb-0">15:00</p>
            </th>
            <th class="allth alltabletdth" colspan="3">
              <p class="columntime mb-0">15:00</p>
              <p class="columntime mb-0">16:00</p>
            </th>
            <th class="allth alltabletdth" colspan="3">
              <p class="columntime mb-0">16:00</p>
              <p class="columntime mb-0">17:00</p>
            </th>
          </tr>
        </thead>
        <tbody class="tbodyscroll">
          <tr v-for="item1, indexI in calenderItems">
            <td @click="goPage('/calendar_profile' + '/' + item1.dentistId)" class="hand changefont alltabletdth">{{ item1.dentistName }}</td>
            <td @click="openModal(item2.active, item2.appointId, item1.dateAppoint, item1, item1.dentistName, item1.dentistId, item2.timeAppoint)" :colspan="item2.timeCell" v-for="item2, indexJ in item1.appointment" class="hand" :class="setClassTable(item2.active)">
            </td>
          </tr>
        </tbody>
      </table>
    </v-layout>

    <ModalAppointment ref="popup" @checkStatus="checkStatus()"/>
    <ModalAppointmentResults ref="popups"/>
  </v-container>
</template>

<script>
import _ from 'lodash'
import ModalAppointment from '@/components/hospital/CalendarCounter/ModalAppointment'
import ModalAppointmentResults from '@/components/hospital/CalendarCounter/ModalAppointmentResults'
import Footer from '@/components/center/Home/Footer'
export default {
  components: {
    ModalAppointment,
    ModalAppointmentResults,
    Footer
  },
  data: () => ({
    date: new Date().toISOString().slice(0, 10),
    modal: false,
    time1: '',
    itemsDentist: [],
    calenderItems: [],
    newCalenderItems: [],
    appointmentItems: [],
    newAppointment: [],
    rearrangeCalender: [],
    tableRearrangeCalender: []
  }),
  created () {
    this.getDentist()
    this.showCalender()
  },
  methods: {
    sortTime (item) {
      return _.sortBy(item, [function (o) { return o.timeAppoint }])
    },
    checkStatus () {
      this.showCalender()
    },
    setClassTable (item) {
      return ['alltabletdth', {'changeTablecolor': item === false}, {'changecolor': item}]
    },
    save (date) {
      this.$refs.dialog.save(date)
      this.showCalender()
    },
    showCalender () {
      var textSource = {
        dateAppoint: this.date,
        placeId: 1
      }
      this.axios.post(process.env.API + '/showCalendar', { Source: textSource }).then((response) => {
        // console.log('passCalender')
        // console.log('Calender', response.data.Result)
        if (response.data.Status === 'Success') {
          // var checkStatus = response.data.Status
          this.calenderItems = response.data.Result
          for (var i = 0; i < this.calenderItems.length; i++) {
            // var dentistName = this.calenderItems[i].dentistName
            // console.log('dentistName', dentistName, 'i', i)
            this.calenderItems[i].appointment = this.sortTime(this.calenderItems[i].appointment)

            // for (var j = 0; j < this.calenderItems[i].appointment.length; j++) {
            //   var appointment = this.calenderItems[i].appointment[j]
            //   var timeAppointmentStart = appointment.timeAppoint
            //   // console.log('timeAppointment', timeAppointmentStart)
            //   var splitTime = timeAppointmentStart.split(':')
            //   var timeStartMin = (+splitTime[0]) * 60 + (+splitTime[1])
            //   var treatmentTime = appointment.timeTreatment
            //   // console.log('treatmentTime', treatmentTime)
            //   var timeEndMin = (timeStartMin * 1) + (treatmentTime * 1)
            //   var hours = (timeEndMin / 60)
            //   var floorhours = Math.floor(hours)
            //   var minutes = (hours - floorhours) * 60
            //   var floorminutes = Math.round(minutes)
            //   if (floorhours.toString().length === 1) {
            //     floorhours = '0' + floorhours
            //     // console.log('floorhours0', floorhours)
            //     // console.log('timeStartMin', timeStartMin, ' mins', 'timeAppointmentStart', timeAppointmentStart)
            //     // console.log('timeEndMin', timeEndMin, ' mins', 'floorhours0', floorhours)
            //   } else {
            //     floorhours = floorhours.toString()
            //     // console.log('timeStartMin', timeStartMin, ' mins', 'timeAppointmentStart', timeAppointmentStart)
            //     // console.log('timeEndMin', timeEndMin, ' mins', 'floorhours1', floorhours)
            //     // console.log('floorhours1', floorhours)
            //   }
            //   if (floorminutes === 0) {
            //     floorminutes = floorminutes + '0'
            //     // console.log('floorminutes', floorminutes)
            //   } else {
            //     floorminutes = floorminutes * 1
            //   }
            //   // var timeAppointmentEnd = floorhours + ':' + floorminutes
            //   // console.log('timeStartMin', timeStartMin, ' mins', 'timeAppointment', timeAppointmentStart)
            //   // console.log('timeEndMin', timeEndMin, ' mins', 'timeAppointmentEnd', timeAppointmentEnd)
            //   // console.log('****************')
            //   // console.log('timeAppointmentEnd', timeAppointmentEnd)
            //   // console.log('appointment', appointment, 'i', i, 'j', j)
            //   // if (appointment.active === 0) {
            //   //   // var active0 = appointment.active
            //   //   // console.log('active0', active0)
            //   //   // console.log('************')
            //   // } else if (appointment.active === 1) {
            //   //   // var active1 = appointment.active
            //   //   // var timeStartMin2 = timeStartMin + 60
            //   //   if (timeEndMin > (timeStartMin + 20)) {
            //   //     console.log('ตรงงงงงง')
            //   //     // checkStatus2 = 'Fail'
            //   //     // return checkStatus2
            //   //     console.log('timeStartMin++', timeStartMin++)
            //   //     console.log('****************')
            //   //   } else {
            //   //     console.log('ไม่ตรงงงงงง')
            //   //     console.log('timeStartMin++', timeStartMin++)
            //   //     console.log('****************')
            //   //   }
            //   // }
            // }
            // console.log('--------------')
          }
        } else {
          this.$swal('ข้อมูลขัดข้องบางประการ', '', 'error')
        }
      })
    },
    getDentist () {
      var textSource = {
        placeId: 1
      }
      this.axios.post(process.env.API + '/getDentistListByPlaceId', { Source: textSource }).then((response) => {
        // console.log(response.data)
        if (response.data.Status === 'Success') {
          this.itemsDentist = response.data.Result
        }
      })
    },
    openModal (active, id, date, item1, dentistName, dentistId, timeAppoint) {
      if (active === 0) {
        // console.log('dentistName', dentistName)
        this.$refs.popup.open(item1, dentistName, date, dentistId, timeAppoint)
      } else {
        this.$refs.popups.open(id, date)
        // console.log('id', id)
      }
    },
    // openProfile () {
    //   this.$refs.profile.open()
    // },
    goPage (link) {
      this.$router.push(link)
    },
    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    }
  }
}
</script>

<style lang="css" scoped>
.changecolor {
  background-color: #F0E68C;
  color: white;
}
.counterTable {
  border-collapse: collapse;
  border-spacing: 0px;
}
.alltabletdth {
  padding: 10px 10px;
  border: 1px solid black;
}
.allth {
  padding: 5px 20px;
  text-align: center;
  background-color: #27417A;
  color: white;
}
.tabHeight {
  max-height:100px;
  width:100%;
  overflow-y:auto;
  padding:2px;
}
.tbodyscroll {
  height: 150px;
  overflow-y: auto;
  overflow-x: hidden;
}
.changeTablecolor:hover {
  background-color: rgb(255, 99, 71);
}
.changefont:hover {
  font-weight: bold;
  color: #27417A;
}
.columntime {
  font-size: 18px;
}
</style>
