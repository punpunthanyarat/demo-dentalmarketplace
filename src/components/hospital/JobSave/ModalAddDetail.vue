   <template lang="html">
  <div>
    <v-dialog v-model="modalAddDetail" persistent max-width="1000px">
      <div class="text-xs-right">
        <button @click="modalAddDetail = false">
          <v-icon color="white">close</v-icon>
        </button>
      </div>
      <v-card>
        <v-card-title class="pt-4 pl-4 pb-0">
          <b class="display-1 primary--text">บันทึกรายละเอียดการรักษา</b>
        </v-card-title>
        <v-card-text class="pt-0">
          <v-form ref="form" lazy-validation>
            <v-container grid-list-lg>
              <v-layout row wrap>
                <v-flex xs12 md3 py-0 mt-3 class="hidden-sm-and-down"><b class="title">ลักษณะการรักษา</b></v-flex>
                <v-flex xs12 md9 py-0>
                  <v-text-field v-model="restoration" label="ลักษณะการรักษา" :rules="itemRules.empty" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 py-0 mt-3 class="hidden-sm-and-down"><b class="title">หมายเลขฟัน</b></v-flex>
                <v-flex xs12 py-0>
                  <v-layout row wrap class="setTable">
                    <table class="tooth w-100 ma-2">
                      <tr>
                        <td rowspan="2" @click="setTeeth('R', '')">R</td>
                        <td v-for="teeth in toothSelected.top" :key="teeth.no" :class="teeth.active ? 'active' : ''" @click="setTeeth(teeth.no, 'top')">{{teeth.no}}</td>
                        <td rowspan="2" @click="setTeeth('L', '')">L</td>
                      </tr>
                      <tr>
                        <td v-for="teeth in toothSelected.bottom" :key="teeth.no" :class="teeth.active ? 'active' : ''" @click="setTeeth(teeth.no, 'bottom')">{{teeth.no}}</td>
                      </tr>
                    </table>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs12 md3 py-0 mt-3 class="hidden-sm-and-down"><b class="title">ข้อมูลเพิ่มเติม</b></v-flex>
                    <v-flex xs12 md9 py-0>
                      <v-text-field v-model="note" label="ข้อมูลเพิ่มเติม"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 pa-0 pt-4 text-xs-right>
                  <v-btn large color="primary" @click="submit">บันทึก</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <Loading ref="loading"/>
  </div>
</template>

<script>
import _ from 'lodash'
import Loading from '@/components/Loading'
export default {
  components: {
    Loading
  },
  props: ['jobid'],
  data () {
    return {
      modalAddDetail: false,
      itemRules: {
        empty: [v => !!v || 'กรุณาระบุข้อมูล']
      },
      restoration: '',
      toothSelected: {
        top: [
          { no: '18', active: false },
          { no: '17', active: false },
          { no: '16', active: false },
          { no: '15', active: false },
          { no: '14', active: false },
          { no: '13', active: false },
          { no: '12', active: false },
          { no: '11', active: false },
          { no: '21', active: false },
          { no: '22', active: false },
          { no: '23', active: false },
          { no: '24', active: false },
          { no: '25', active: false },
          { no: '26', active: false },
          { no: '27', active: false },
          { no: '28', active: false }
        ],
        bottom: [
          { no: '48', active: false },
          { no: '47', active: false },
          { no: '46', active: false },
          { no: '45', active: false },
          { no: '44', active: false },
          { no: '43', active: false },
          { no: '42', active: false },
          { no: '41', active: false },
          { no: '31', active: false },
          { no: '32', active: false },
          { no: '33', active: false },
          { no: '34', active: false },
          { no: '35', active: false },
          { no: '36', active: false },
          { no: '37', active: false },
          { no: '38', active: false }
        ]
      },
      note: ''
      // listJobDetail: []
    }
  },
  methods: {
    openLoading () {
      this.$refs.loading.open()
    },
    hideLoading () {
      this.$refs.loading.hide()
    },
    submit () {
      if (this.$refs.form.validate() && this.countToothSelected()) {
        var teethArray = this.setTeethArray()
        var textSource = '{"restoration": "' + this.restoration + '","teeth_no": "' + teethArray + '", "note": "' + this.note + '", "jobid": "' + this.jobid + '"}'
        var source = this.reverse(btoa(unescape(encodeURIComponent(textSource)))) + this.randomString(5)
        this.axios.post(process.env.API + '/addJobDetail', { source: source }).then((response) => {
          if (response.data === 'success') {
            this.removeToothSelectedActiveFalse()
            // this.listJobDetail.push({ restoration: this.restoration, toothSelected: this.toothSelected, note: this.note })
            // this.$emit('listJobDetail', this.listJobDetail)
            this.$emit('success', 'success')
            this.$swal('บันทึกข้อมูลสำเร็จ', '', 'success')
            this.modalAddDetail = false
            this.clearData()
          } else {
            this.$swal('ไม่สามารถบันทึกข้อมูลได้', 'กรุณาลองใหม่อีกครั้ง หรือ ติดต่อเจ้าหน้าที่', 'error')
          }
        })
      } else {
        this.$swal('ไม่สามารถดำเนินการได้', 'กรุณาตรวจสอบข้อมูลของท่านอีกครั้ง', 'error')
      }
    },
    setTeethArray () {
      var i
      var teethArray = []
      for (i = 0; i < this.toothSelected.top.length; i++) {
        if (this.toothSelected.top[i].active === true) {
          teethArray.push(this.toothSelected.top[i].no)
        }
      }
      for (i = 0; i < this.toothSelected.bottom.length; i++) {
        if (this.toothSelected.bottom[i].active === true) {
          teethArray.push(this.toothSelected.bottom[i].no)
        }
      }
      return teethArray
    },
    setTeeth (no, position) {
      var i
      if (position !== '') {
        if (position === 'top') {
          i = _.findIndex(this.toothSelected.top, ['no', no])
          this.toothSelected.top[i].active = !this.toothSelected.top[i].active
        } else {
          i = _.findIndex(this.toothSelected.bottom, ['no', no])
          this.toothSelected.bottom[i].active = !this.toothSelected.bottom[i].active
        }
      } else {
        if (no === 'R') {
          for (i = 0; i < ((this.toothSelected.top.length) / 2); i++) {
            this.toothSelected.top[i].active = !this.toothSelected.top[i].active
          }
          for (i = 0; i < ((this.toothSelected.bottom.length) / 2); i++) {
            this.toothSelected.bottom[i].active = !this.toothSelected.bottom[i].active
          }
        } else if (no === 'L') {
          for (i = (this.toothSelected.top.length - 1); i >= ((this.toothSelected.top.length) / 2); i--) {
            this.toothSelected.top[i].active = !this.toothSelected.top[i].active
          }
          for (i = (this.toothSelected.bottom.length - 1); i >= ((this.toothSelected.bottom.length) / 2); i--) {
            this.toothSelected.bottom[i].active = !this.toothSelected.bottom[i].active
          }
        }
      }
    },
    countToothSelected () {
      var i
      for (i = 0; i < this.toothSelected.top.length; i++) {
        if (this.toothSelected.top[i].active === true) {
          return true
        }
      }
      for (i = 0; i < this.toothSelected.bottom.length; i++) {
        if (this.toothSelected.bottom[i].active === true) {
          return true
        }
      }
      return false
    },
    removeToothSelectedActiveFalse () {
      this.toothSelected.top = _.remove(this.toothSelected.top, function (n) { return n.active })
      this.toothSelected.bottom = _.remove(this.toothSelected.bottom, function (n) { return n.active })
    },
    clearData () {
      this.restoration = ''
      this.teeths = []
      this.note = ''
      this.toothSelected = {
        top: [
          { no: '18', active: false },
          { no: '17', active: false },
          { no: '16', active: false },
          { no: '15', active: false },
          { no: '14', active: false },
          { no: '13', active: false },
          { no: '12', active: false },
          { no: '11', active: false },
          { no: '21', active: false },
          { no: '22', active: false },
          { no: '23', active: false },
          { no: '24', active: false },
          { no: '25', active: false },
          { no: '26', active: false },
          { no: '27', active: false },
          { no: '28', active: false }
        ],
        bottom: [
          { no: '48', active: false },
          { no: '47', active: false },
          { no: '46', active: false },
          { no: '45', active: false },
          { no: '44', active: false },
          { no: '43', active: false },
          { no: '42', active: false },
          { no: '41', active: false },
          { no: '31', active: false },
          { no: '32', active: false },
          { no: '33', active: false },
          { no: '34', active: false },
          { no: '35', active: false },
          { no: '36', active: false },
          { no: '37', active: false },
          { no: '38', active: false }
        ]
      }
    },
    open () {
      this.modalAddDetail = true
    },
    reverse (s) {
      return s.split('').reverse().join('')
    },
    randomString (num) {
      var text = ''
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      for (var i = 0; i < num; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      return text
    }
  }
}
</script>

<style scoped>
.setTable table {
  border-collapse: collapse;
  text-align: center;
}
.setTable table, .setTable td, .setTable th {
  border: 1px solid grey;
}
</style>
