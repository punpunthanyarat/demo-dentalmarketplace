<template lang="html">
  <v-container>
    <v-layout row wrap>
      <!-- <pre>{{postponementItems}}</pre> -->
      <v-flex xs12 sm6 md10>
        <h1 class="display-1">ตารางคำร้องขอเลื่อนการนัดหมาย</h1>
      </v-flex>
      <v-flex xs12 sm6 md2>
        <v-menu  ref="dialog" :close-on-content-click="false" :nudge-right="40" min-width="295px" transition="scale-transition" offset-y full-width lazy>
          <v-text-field v-model="date" label="ค้นหาวันที่" slot="activator" append-icon="event" readonly required></v-text-field>
          <v-date-picker v-model="date" locale="th" @change="save"></v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-data-table :headers="headers"  :items="postponementItems" :pagination.sync="pagination" hide-actions>
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.index + 1 }}</td>
            <td class="text-xs-center">{{ props.item.topic }}</td>
            <td class="text-xs-center">{{ props.item.memberFullname }}</td>
            <td class="text-xs-center">{{ props.item.dentistFullname }}</td>
            <td class="text-xs-center">
              <v-btn icon @click="openModalApproveAppointment(props.item)"><v-icon color= "green">done</v-icon></v-btn>
            </td>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>
      </v-flex>
     <ModalApproveAppointment ref="modalApproveAppointment" @checkStatus="checkStatus()"/>
    </v-layout>
  </v-container>
</template>

<script>
import ModalApproveAppointment from '@/components/hospital/CalendarCounter/ModalApproveAppointment'
export default {
  components: {
    ModalApproveAppointment
  },
  data () {
    return {
      headers: [
        { text: '#', align: 'center', sortable: false },
        { text: 'หัวข้อการติดต่อ', align: 'center', sortable: false },
        { text: 'ผู้ติดต่อ', align: 'center', sortable: false },
        { text: 'ทันตแพทย์', align: 'center', sortable: false },
        { text: 'คลิกเพื่อเปลี่ยน', align: 'center', sortable: false }
      ],
      pagination: {},
      postponementItems: [],
      approvePostponement: [],
      date: new Date().toISOString().slice(0, 10),
      appointId: '',
      dentistId: '',
      dateAppoint: '',
      timeAppoint: '',
      reason: '',
      reasonId: '',
      receiveItems: [],
      sts: 0
    }
  },
  created () {
    this.PostponedTable()
    if (this.sts === 1) {
      this.checkStatus()
    }
  },
  methods: {
    checkStatus () {
      this.sts = 1
      this.PostponedTable()
      this.sts = 0
    },
    save (date) {
      this.$refs.dialog.save(date)
      this.PostponedTable()
    },
    PostponedTable () {
      var textSource = {
        placeId: 1,
        dateAppoint: this.date
      }
      this.axios.post(process.env.API + '/showPostponementOfAppointment', { Source: textSource }).then((response) => {
        if (response.data.Status === 'Success') {
          this.postponementItems = response.data.Result
          // console.log('ผ่านนนนนนนนนนน')
        } else {
          // console.log('ไม่ผ่านนนน')
        }
      })
    },
    openModalApproveAppointment (postponementItems) {
      this.$refs.modalApproveAppointment.open(postponementItems)
    }
    // approvePostponementOfAppointment (item) {
    //   this.receiveItems = item
    //   var receiveAppointId = this.receiveItems.appointId
    //   var receiveDentistId = this.receiveItems.dentistId
    //   var receiveReason = this.receiveItems.reason
    //   var receiveReasonId = this.receiveItems.reasonId
    //   var textSource = {
    //     placeId: 1,
    //     appointId: receiveAppointId,
    //     dentistId: receiveDentistId,
    //     dateAppoint: '2018-09-30',
    //     timeAppoint: '11:00',
    //     reason: receiveReason,
    //     reasonId: receiveReasonId
    //   }
    //   // console.log('textSource', textSource)
    //   this.axios.post(process.env.API + '/approvePostponementOfAppointment', { Source: textSource }).then((response) => {
    //     if (response.data.Status === 'Success') {
    //       this.approvePostponement = response.data.Result
    //       // console.log('ผ่านนนนนนนนนนน')
    //       this.PostponedTable()
    //     } else {
    //       // console.log('ไม่ผ่านนนน')
    //     }
    //   })
    // }
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage === null || this.postponementItems === []) {
        return 0
      } else {
        return Math.ceil(this.postponementItems.length / this.pagination.rowsPerPage)
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
