<template lang="html">
  <v-container pa-4>
    <v-layout row wrap>
      <v-flex xs12 sm6 md10>
        <h1 class="display-1">ตารางงาน</h1>
      </v-flex>
      <v-flex xs12 sm6 md2>
        <v-menu v-model="menu" ref="menu1" :close-on-content-click="false" :nudge-right="40" min-width="290px" transition="scale-transition" offset-y full-width lazy>
          <v-text-field v-model="dateAppoint" label="ค้นหาวันที่นัด" slot="activator" append-icon="event" readonly required></v-text-field>
          <v-date-picker v-model="dateAppoint" locale="th" @change="save"></v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>
    <!-- <pre>{{itemsTimetable}}</pre> -->
    <v-layout row wrap>
      <v-flex xs12>
        <v-data-table :headers="headers" :items="itemsTimetable" :pagination.sync="pagination" hide-actions>
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.index + 1 }}</td>
            <td class="text-xs-center">{{ props.item.topic }}</td>
            <td class="text-xs-center">{{ props.item.memberNameTH }}</td>
            <td class="text-xs-center">{{ props.item.dateAppoint }}</td>
            <td class="text-xs-center">{{ props.item.timeAppoint }}</td>
            <td class="text-xs-center"><v-icon medium class="hand" @click="openModal(props.item.id, dateAppoint)">info</v-icon></td>
            <td class="text-xs-center"><v-icon medium class="hand"  @click="openModalEditedAppointment(props.item.id)">edit</v-icon></td>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>
          <ModalAppointmentResults ref="popups"/>
          <ModalEditedAppointment ref="modalEditedAppointment" @checkStatus="checkStatus"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ModalAppointmentResults from '@/components/hospital/CalendarCounter/ModalAppointmentResults'
import ModalEditedAppointment from '@/components/hospital/CalendarCounter/ModalEditedAppointment'
import { Encode, Decode } from '@/services'
export default {
  components: {
    Encode,
    Decode,
    ModalEditedAppointment,
    ModalAppointmentResults
  },
  data () {
    return {
      menu: false,
      dateAppoint: new Date().toISOString().slice(0, 10),
      search: '2018-06-21',
      pagination: {},
      selected: [],
      headers: [
        { text: '#', align: 'center', sortable: false },
        { text: 'หัวข้อการติดต่อ', align: 'center', sortable: false },
        { text: 'ผู้ติดต่อ', align: 'center', sortable: false },
        { text: 'วันที่นัด', align: 'center', sortable: false },
        { text: 'เวลาที่นัด', align: 'center', sortable: false },
        { text: 'ข้อมูล', align: 'center', sortable: false },
        { text: 'ขอเลื่อนการนัดหมาย', align: 'center', sortable: false }
      ],
      jobList: [],
      dentistId: 'WT1800014',
      itemsTimetable: [],
      sts: 0
    }
  },
  created () {
    this.getTimetable()
    if (this.sts === 1) {
      this.checkStatus()
    }
  },
  methods: {
    openModalEditedAppointment (id) {
      this.$refs.modalEditedAppointment.open(id)
    },
    checkStatus () {
      this.sts = 1
      this.getTimetable()
      this.sts = 0
    },
    // getJobList () {
    //   this.axios.post(process.env.API + '/getJobList').then((response) => {
    //     var result = JSON.parse(Decode.decode(response.data))
    //     this.jobList = result
    //     console.log(this.jobList)
    //   })
    // },
    getTimetable () {
      var textSource = {
        dentistId: 'WT1800014',
        dateAppoint: this.dateAppoint,
        placeId: 1
      }
      this.axios.post(process.env.API + '/showDentistTable', {Source: textSource}).then((response) => {
        // console.log('Timetable', response.data.Result)
        if (response.data.Status === 'Success') {
          this.itemsTimetable = response.data.Result
          // console.log('Success', response.data.Result)
        } else {
          // console.log('Fail')
        }
      })
    },
    openModal (id, dateAppoint) {
      this.$refs.popups.open(id, this.dateAppoint)
    },
    save (date) {
      this.$refs.menu1.save(date)
      this.getTimetable()
    },
    goPage (link) {
      this.$router.push(link)
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
        // console.log('this.pagination.rowsPerPage', this.pagination.rowsPerPage)
        // console.log('this.itemsTimetable.length', this.itemsTimetable.length)
        return Math.ceil(this.itemsTimetable.length / this.pagination.rowsPerPage)
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
