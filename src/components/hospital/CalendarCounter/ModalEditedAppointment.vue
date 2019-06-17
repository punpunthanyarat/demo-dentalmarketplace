<template lang="html">
  <div class="">
    <v-layout row justify-center>
      <v-dialog v-model="popup" persistent max-width="740px">
        <v-card>
          <v-card-title>
            <b class="display-1">แก้ไขการนัดหมาย</b>
            <v-spacer></v-spacer>
            <p class="text-xs-right"><button @click="popup = false"><v-icon color="black">close</v-icon></button></p>
          </v-card-title>
          <v-container grid-list-xl fill-height>
            <v-layout wrap align-center>
              <v-flex xs12 sm6>
                <header v-text="'สาเหตุการเลื่อนนัด :'"></header>
              </v-flex>
              <v-flex xs12 sm5>
                <v-text-field  v-model="reason" placeholder="กรุณาระบุสาเหตุการเลื่อนนัด" multi-line></v-text-field>
              </v-flex>
              <v-flex xs12 md8>
              </v-flex>
              <v-flex xs12 md3>
                <v-btn color="primary" @click="requsetPostponeAppoint()" class="mt-0 mr-0">
                  <v-icon>add</v-icon>
                  <span class="hidden-xs-only">ขอเลื่อนการนัดหมาย</span>
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
      popup: false,
      modalCalender: false,
      modalTime: false,
      appointId: '',
      reason: '',
      receiveReasonId: '',
      receiveDentistId: '',
      receiveAppointId: '',
      EditedAppointment: []
    }
  },
  methods: {
    open (id) {
      this.appointId = id
      // console.log('Id', this.appointId)
      this.popup = true
    },
    requsetPostponeAppoint () {
      var textSource = {
        placeId: 1,
        appointId: this.appointId,
        dentistId: 'WT1800014',
        reason: this.reason
      }
      this.axios.post(process.env.API + '/requsetPostponeAppoint', { Source: textSource }).then((response) => {
        // console.log(response.data.Status)
        // console.log('เข้า')
        // console.log(textSource)
        if (response.data.Status === 'Success') {
          this.EditedAppointment = response.data.Result
          this.popup = false
          this.$emit('checkStatus')
          this.$swal({
            title: 'บันทึกการนัดหมายสำเร็จ',
            text: '',
            type: 'success'
          })
          this.clearData()
          this.popup = false
        } else {
          this.$swal('บันทึกการนัดหมายไม่สำเร็จ', 'กรุณาลองใหม่อีกครั้ง หรือ ติดต่อเจ้าหน้าที่', 'error')
          // console.log('ไม่ผ่าน')
        }
      })
    },
    clearData () {
      this.appointId = ''
      this.dentistId = ''
      this.reason = ''
      this.reasonId = ''
    }
  }
}
</script>

<style lang="css">
</style>
