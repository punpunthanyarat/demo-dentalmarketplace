<template lang="html">
  <div class="">
    <v-layout row justify-center>
      <v-dialog v-model="approveAppointment" persistent max-width="740px">
        <v-card>
          <v-card-title>
            <b class="display-1">อนุมัติการนัดหมาย</b>
            <v-spacer></v-spacer>
            <p class="text-xs-right"><button @click="approveAppointment = false"><v-icon color="black">close</v-icon></button></p>
          </v-card-title>
          <v-container grid-list-xl fill-height>
            <v-layout wrap align-center>
              <v-flex xs12 sm6>
                <header v-text="'วันที่ใหม่ :'"></header>
              </v-flex>
              <v-flex xs12 sm5>
                <v-menu v-model="calender" ref="calender" :close-on-content-click="false" :nudge-right="40" min-width="290px" transition="scale-transition" offset-y full-width lazy>
                  <v-text-field v-model="dateAppoint" label="ค้นหาวันที่นัด" slot="activator" append-icon="event" readonly></v-text-field>
                  <v-date-picker v-model="dateAppoint" locale="th" @change="save(dateAppoint)"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm6>
                <header v-text="'เวลาใหม่ :'"></header>
              </v-flex>
              <v-flex xs12 sm5>
                <v-menu ref="time" :close-on-content-click="false" v-model="time" :nudge-right="40" :return-value.sync="timeAppoint" lazy transition="scale-transition"
                offset-y full-width max-width="290px" min-width="290px">
                <v-text-field slot="activator" v-model="timeAppoint" label="เวลาที่นัดหมาย" append-icon="access_time" readonly></v-text-field>
                <v-time-picker v-if="time" v-model="timeAppoint" @change="$refs.time.save(timeAppoint)"></v-time-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 md7>
              </v-flex>
              <v-flex xs12 md2>
                <v-btn color="primary" @click="approvePostponementOfAppointment()" class="mt-0 mr-0">
                  <v-icon>add</v-icon>
                  <span class="hidden-xs-only">เปลี่ยนแปลงการนัดหมาย</span>
                </v-btn>
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
      calender: false,
      time: false,
      dateAppoint: new Date().toISOString().slice(0, 10),
      timeAppoint: null,
      approveAppointment: false,
      receivePostponementItems: [],
      receiveAppointId: '',
      receiveDentistId: '',
      receiveReason: '',
      receiveReasonId: ''
    }
  },
  methods: {
    open (postponementItems) {
      this.receivePostponementItems = postponementItems
      this.receiveAppointId = this.receivePostponementItems.appointId
      this.receiveDentistId = this.receivePostponementItems.dentistId
      this.receiveReason = this.receivePostponementItems.reason
      this.receiveReasonId = this.receivePostponementItems.reasonId
      this.approveAppointment = true
    },
    save (dateAppoint) {
      this.$refs.calender.save(dateAppoint)
    },
    approvePostponementOfAppointment () {
      var textSource = {
        placeId: 1,
        appointId: this.receiveAppointId,
        dentistId: this.receiveDentistId,
        dateAppoint: this.dateAppoint,
        timeAppoint: this.timeAppoint,
        reason: this.receiveReason,
        reasonId: this.receiveReasonId
      }
      // console.log('textSource', textSource)
      this.axios.post(process.env.API + '/approvePostponementOfAppointment', { Source: textSource }).then((response) => {
        if (response.data.Status === 'Success') {
          this.approvePostponement = response.data.Result
          // console.log('ผ่าน')
          this.approveAppointment = false
          this.$emit('checkStatus')
        } else {
          // console.log('ไม่ผ่าน')
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
