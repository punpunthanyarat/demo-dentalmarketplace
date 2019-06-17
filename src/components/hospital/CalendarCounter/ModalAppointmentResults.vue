<template lang="html">
  <div class="">
    <v-layout row justify-center>
      <v-dialog v-model="popups" persistent max-width="740px">
        <v-card v-for="item1 in modalAppointment" :key="item1.appointId">
          <!-- <pre>{{modalAppointment}}</pre> -->
            <v-card-title>
              <b class="display-1">การนัดหมายเลขที่: {{item1.appointId}}</b>
              <v-spacer></v-spacer>
              <p class="text-xs-right"><button @click="popups = false"><v-icon color="black">close</v-icon></button></p>
            </v-card-title>
            <v-container grid-list-xl fill-height>
              <v-layout wrap align-center>
                <v-flex xs12 sm6 md6>
                  <header v-text="'หัตถการ :'"></header>
                </v-flex>
                <v-flex xs12 sm6 md6 v-for="item2 in item1.restoration" :key="item2.restorationName">
                  <v-text-field :placeholder="item2.restorationName" readonly></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <header v-text="'ผู้มาติดต่อ :'"></header>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field :placeholder="item1.memberFullname" readonly></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <header v-text="'ทันตแพทย์ :'"></header>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field  :placeholder="item1.dentistFullname" readonly></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <header v-text="'วันที่นัดหมาย :'"></header>
                </v-flex>
                <v-flex xs12 sm3 md3>
                  <v-text-field :placeholder="item1.dateAppoint" readonly></v-text-field>
                </v-flex>
                <v-flex xs12 sm3 md3>
                  <v-text-field :placeholder="item1.timeAppoint" readonly></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      popups: false,
      modalAppointment: [],
      date: '',
      appointId: ''
    }
  },
  created () {
    // this.showModalAppointment()
  },
  methods: {
    open (id, date) {
      this.appointId = id
      this.date = date
      this.popups = true
      // console.log('idddd', this.appointId)
      this.showModalAppointment()
    },
    openFromJoblist (id, dateAppoint) {
      this.appointId = id
      this.date = dateAppoint
      this.popups = true
      // console.log('id', this.appointId)
      // console.log('date', this.date)
      this.showModalAppointment()
    },
    showModalAppointment () {
      var textSource = {
        date: this.date,
        appointId: this.appointId,
        placeId: 1
      }
      this.axios.post(process.env.API + '/showModalAppointInfo', { Source: textSource }).then((response) => {
        // console.log('this.appointId', this.appointId, 'fghjkl;')
        if (response.data.Status === 'Success') {
          this.modalAppointment = response.data.Result
          // console.log('modalAppointment', this.modalAppointment)
        } else {
          this.$swal('ข้อมูลขัดข้องบางประการ', '', 'error')
        }
      })
    },
    saveData () {
      this.$swal({
        title: 'บันทึกข้อมูลแล้ว',
        text: '',
        type: 'success'
      })
      this.popups = false
    }
  }
}
</script>
<style scoped>
</style>
