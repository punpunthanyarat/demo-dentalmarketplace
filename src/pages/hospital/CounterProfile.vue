<template lang="html">
 <v-container pa-4>
   <v-layout row wrap style="padding: 35px 150px;">
     <v-flex xs12>
       <v-card>
         <v-toolbar dark style="background-color: #27417A;">
           <v-toolbar-title>ข้อมูลทันตแพทย์</v-toolbar-title>
         </v-toolbar>
         <v-container  v-for="item1 in itemsDentist" :key="item1.dentistFullName">
           <v-layout  row wrap class="mt-3">
             <v-flex xs3 md3 class="ml-3 mr-3">
               <v-layout row wrap class="mt-4 pb-4">
                 <v-flex  xs12 md12 class="pb-4">
                  <v-card-media :src="getProfileImg()" height="190px" contain></v-card-media>
                </v-flex>
              </v-layout>
             </v-flex>
             <!-- <pre>{{itemsDentist}}</pre> -->
             <!-- <pre>{{itemsDentist[0]}}</pre> -->
              <!-- <pre>{{itemsDentist}}</pre> -->
             <!-- <pre>{{itemsTimetable}}</pre> -->
             <v-flex xs8 md8>
               <v-layout row wrap class="mt-3 pb-4">
                 <v-flex  xs6 md4 class="pb-4">
                   <header v-text="'ชื่อทันตแพทย์ :'"></header>
                 </v-flex>
                 <v-flex xs6 md8>
                   <span v-model="dentistFullName">{{item1.dentistFullName}}</span>
                 </v-flex>
                 <v-flex xs6 md4 class="pb-4">
                   <header v-text="'ความเชี่ยวชาญ :'"></header>
                 </v-flex>
                 <v-flex xs6 md8>
                   <v-chip small v-for="item2 in item1.dentistSkillful" :key="item2.skillName" >{{item2.skillName}}</v-chip>
                 </v-flex>
                 <v-flex xs6 md4 class="pb-4">
                   <header v-text="'วุฒิการศึกษา :'"></header>
                 </v-flex>
                 <v-flex xs6 md8>
                   <span v-model="degree">{{item1.degree}}</span>
                 </v-flex>
               </v-layout>
               <!-- <pre>{{item1.dentistSkillful}}</pre> -->
             </v-flex>
           </v-layout>
           <v-layout row wrap class="mt-5">
             <v-flex xs12>
               <h4 class="text-xs-center">วันเวลาที่ทำงาน</h4>
             </v-flex>
             <v-flex xs12>
               <v-data-table :headers="headersprofile" :items="item1.workTime"  hide-actions>
                 <template slot="items" slot-scope="props">
                   <td class="text-xs-center">{{ props.item.day }}</td>
                   <td class="text-xs-center">{{ props.item.timeStart }}</td>
                   <td class="text-xs-center">-</td>
                   <td class="text-xs-center">{{ props.item.timeEnd }}</td>
                 </template>
               </v-data-table>
             </v-flex>
           </v-layout>
         </v-container>
       </v-card>
     </v-flex>
   </v-layout>
   <v-layout row wrap style="margin-top: 50px;">
     <v-flex xs12 sm6 md4>
       <b class="display-1">ตารางงาน</b>
     </v-flex>
     <v-flex xs12 sm6 md4>
       <v-menu v-model="menu" ref="menu" :close-on-content-click="false" :nudge-right="40" min-width="290px" transition="scale-transition" offset-y full-width lazy>
         <v-text-field v-model="dateAppoint" label="ค้นหาวันที่นัด" slot="activator" append-icon="event" readonly></v-text-field>
         <v-date-picker v-model="dateAppoint" locale="th" @change="save"></v-date-picker>
       </v-menu>
     </v-flex>
     <v-flex xs12 sm6 md4 class="text-xs-right">
       <v-btn color="primary" @click="openModal(itemsDentist)">
         <v-icon left dark>event</v-icon>
         เพิ่มการนัดหมาย
       </v-btn>
     </v-flex>
   </v-layout>
   <!-- <pre>{{itemsTimetable}}</pre> -->
   <v-layout row wrap>
     <v-flex xs12>
       <v-data-table v-model="appointmentTimetable" :headers="headers" :items="itemsTimetable" :pagination.sync="pagination" hide-actions>
         <template slot="items" slot-scope="props">
           <td class="text-xs-center">{{ props.index + 1 }}</td>
           <td class="text-xs-center">{{ props.item.topic }}</td>
           <td class="text-xs-center">{{ props.item.memberNameTH }}</td>
           <td class="text-xs-center">{{ props.item.dateAppoint }}</td>
           <td class="text-xs-center">{{ props.item.timeAppoint }}</td>
           <td class="text-xs-center"><v-icon medium class="hand" @click="openModalAppointmentFromCounterProfile(props.item.id)">info</v-icon></td>
         </template>
       </v-data-table>
       <div class="text-xs-center pt-2">
         <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
       </div>
     </v-flex>
   </v-layout>
   <ModalAppointmentFromCounterProfile ref="popup" @checkStatus="checkStatus()"/>
   <ModalAppointmentResults ref="modalAppointmentResults"/>
 </v-container>
</template>

<script>
import ModalAppointmentFromCounterProfile from '@/components/hospital/CalendarCounter/ModalAppointmentFromCounterProfile'
import ModalAppointmentResults from '@/components/hospital/CalendarCounter/ModalAppointmentResults'
import { Encode, Decode } from '@/services'
export default {
  components: {
    Encode,
    Decode,
    ModalAppointmentFromCounterProfile,
    ModalAppointmentResults,
    checkSts: false
  },
  data () {
    return {
      menu: false,
      dateAppoint: new Date().toISOString().slice(0, 10),
      // dateAppoint: '2018-09-25',
      pagination: {},
      image: '/static/img/main/person.jpg',
      selected: [],
      dentistId: '',
      idArray: [],
      itemsDentistList: '',
      username: 'test8989',
      dentistImage: '',
      placeId: '',
      itemsSkillDentist: [],
      dentistFullName: '',
      headers: [
        { text: '#', align: 'center', sortable: false },
        { text: 'หัวข้อการติดต่อ', align: 'center', sortable: false },
        { text: 'ผู้ติดต่อ', align: 'center', sortable: false },
        { text: 'วันที่นัด', align: 'center', sortable: false },
        { text: 'เวลาที่นัด', align: 'center', sortable: false },
        { text: 'ข้อมูล', align: 'center', sortable: false }
      ],
      headersprofile: [
        { text: 'วัน', align: 'center', sortable: false },
        { text: 'เวลาเริ่มงาน', align: 'center', sortable: false },
        { text: '', align: 'center', sortable: false },
        { text: 'เวลาเลิกงาน', align: 'center', sortable: false }
      ],
      jobList: [],
      itemsDentist: [],
      itemsTimetable: [],
      appointmentTimetable: [],
      modalAppointment2: [],
      degree: ''
    }
  },
  created () {
    this.dentistId = this.$route.params.dentistId
    this.getDentistList()
    this.getTimetable()
    // this.findId()
    // this.getProfileImg()
  },
  methods: {
    getProfileImg () {
      if (this.dentistImage === '') {
        return this.image
      } else {
        return process.env.API + '/getProfileImg' + '/' + this.dentistId + '/' + this.dentistImage
      }
    },
    checkStatus () {
      this.checkSts = true
      this.getTimetable()
    },
    // getProfileImg () {
    //   return process.env.API + '/getProfileImg/' + 'HT1800054' + '/' + 'aaa123456_20180919032504076641.png'
    // },
    getDentistList () {
      var textSource = {
        dentistId: this.dentistId,
        placeId: 1
      }
      this.axios.post(process.env.API + '/showDentistProfile', {Source: textSource}).then((response) => {
        // console.log('dentist', response.data.Result)
        if (response.data.Status === 'Success') {
          // console.log('Success')
          this.itemsDentist = response.data.Result
          // console.log('itemsDentist', response.data.Result)
          for (var i = 0; i <= this.itemsDentist.length; i++) {
            var dentistItems = this.itemsDentist[i].dentistImage
            // console.log('this.itemsDentist.dentistImage', dentistItems)
            this.dentistImage = dentistItems
          }
        }
      })
    },
    // showModalAppointment (id) {
    //   var id2 = id
    //   var textSource = {
    //     date: '2018-09-25',
    //     appointId: id2,
    //     placeId: 1
    //   }
    //   this.axios.post(process.env.API + '/showModalAppointInfo', { Source: textSource }).then((response) => {
    //     if (response.data.Status === 'Success') {
    //       this.modalAppointment2 = response.data.Result
    //       console.log('modalAppointment', this.modalAppointment2)
    //     } else {
    //       this.$swal('ข้อมูลขัดข้องบางประการ', '', 'error')
    //     }
    //   })
    // },
    getTimetable () {
      var textSource = {
        dentistId: this.dentistId,
        dateAppoint: this.dateAppoint,
        placeId: '1'
      }
      this.axios.post(process.env.API + '/showDentistTable', {Source: textSource}).then((response) => {
        // console.log('Timetable', response.data.Result)
        if (response.data.Status === 'Success') {
          this.itemsTimetable = response.data.Result
          // console.log('itemsTimetable', this.itemsTimetable)
        } else {
          console.log('Fail')
        }
      })
    },
    openModalAppointmentFromCounterProfile (id) {
      this.$refs.modalAppointmentResults.open(id, this.dateAppoint)
    },
    openModal (itemsDentist, dateAppoint) {
      this.$refs.popup.open(this.itemsDentist, this.dateAppoint)
    },
    save (date) {
      this.$refs.menu.save(date)
      this.getTimetable()
    },
    goPage () {
      window.location = '/calendar_counter'
    }
    // reverse (s) {
    //   return s.split('').reverse().join('')
    // },
    // randomString (num) {
    //   var text = ''
    //   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    //   for (var i = 0; i < num; i++) {
    //     text += possible.charAt(Math.floor(Math.random() * possible.length))
    //   }
    //   return text
    // }
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage === null || this.itemsTimetable === []) {
        return 0
      } else {
        // console.log('Show', Math.ceil(this.itemsTimetable.length / this.pagination.rowsPerPage))
        return Math.ceil(this.itemsTimetable.length / this.pagination.rowsPerPage)
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
