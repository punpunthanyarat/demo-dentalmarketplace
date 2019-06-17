<template lang="html">
  <v-container pa-4>
    <v-layout row wrap>
      <v-flex xs12 mb-2>
        <b class="display-1">บันทึกข้อมูลการรักษา</b>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mb-3">
      <v-flex xs12>
        <v-card class="pt-2 px-3 pb-3">
          <v-container grid-list-sm>
            <v-layout row wrap>
              <v-flex xs12>
                <b class="headline primary--text">ข้อมูลการติดต่อ</b>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 sm4 md2 offset-sm1><b class="title">หัวข้อการติดต่อ :</b></v-flex>
              <v-flex xs12 sm6 md8 offset-xs1 offset-sm0>{{topic}}</v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 sm4 md2 offset-sm1><b class="title">ชื่อ-สกุลผู้ติดต่อ :</b></v-flex>
              <v-flex xs12 sm6 md8 offset-xs1 offset-sm0>คุณ{{patient}}</v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="pt-2 px-3 pb-3">
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 sm9 mb-2>
                <b class="headline primary--text">ข้อมูลการรักษา</b>
              </v-flex>
              <v-flex xs12 sm3>
                <v-btn small color="info" class="right btn-submit" @click="openModalAddDetail()">
                  <v-icon small>add</v-icon>
                  <small class="ml-1">เพิ่มรายละเอียด</small>
                </v-btn>
                <modalAddDetail ref="adddetail" @listJobDetail="setEmitListJobDetail" @success="getJobDetailByID" :jobid="jobid"/>
              </v-flex>
            </v-layout>
            <v-layout row wrap class="setTable">
              <table class="toothTEMP w-100 ma-1">
                <tr>
                  <td rowspan="2">R</td>
                  <td v-for="teeth,index in toothTemp.top" :key="teeth.no" :class="teeth.active ? 'active' : ''">{{teeth.no}}</td>
                  <td rowspan="2">L</td>
                </tr>
                <tr>
                  <td v-for="teeth,index in toothTemp.bottom" :key="teeth.no" :class="teeth.active ? 'active' : ''">{{teeth.no}}</td>
                </tr>
              </table>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 v-for="detail,index in listJobDetail" :key="index">
                <v-card class="noshadow grey--border pa-0 grey lighten-4">
                  <v-container grid-list-sm>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <b class="title bold">รายละเอียดที่ {{index + 1}}</b>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 sm4 md2 offset-sm1><span class="title">การรักษา :</span></v-flex>
                      <v-flex xs12 sm6 md8 offset-xs1 offset-sm0>{{detail.restoration}}</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 sm4 md2 offset-sm1><span class="title">หมายเลขฟัน :</span></v-flex>
                      <v-flex xs12 sm6 md8 offset-xs1 offset-sm0>
                        <span v-for="teeth in detail.teeth_no.split(',')">#{{teeth}} </span>
                        <!-- <div v-if="detail.toothSelected.top.length !== 16 && detail.toothSelected.bottom.length !== 16">
                        <span v-for="teeth in detail.toothSelected.top" :key="teeth.no" class="mr-2">#{{teeth.no}}</span>
                        <span v-for="teeth in detail.toothSelected.bottom" :key="teeth.no" class="mr-2">#{{teeth.no}}</span>
                      </div>
                      <div v-else>ทั้งปาก</div> -->
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs12 sm4 md2 offset-sm1><span class="title">ข้อมูลเพิ่มเติม :</span></v-flex>
                    <v-flex xs12 sm6 md8 offset-xs1 offset-sm0>{{detail.note}}</v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import modalAddDetail from '@/components/hospital/JobSave/ModalAddDetail'
import { Encode, Decode } from '@/services'
export default {
  components: {
    Encode,
    Decode,
    modalAddDetail
  },
  data () {
    return {
      jobid: '',
      topic: '',
      patient: '',
      toothTemp: {
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
      listJobDetail: []
    }
  },
  created () {
    this.jobid = this.$route.params.jobid
    this.getJobByID()
    this.getJobDetailByID()
  },
  methods: {
    getJobByID (jobid) {
      var source = this.reverse(btoa(unescape(encodeURIComponent('{"jobid": "' + this.jobid + '"}')))) + this.randomString(5)
      this.axios.post(process.env.API + '/getJobByID', { source: source }).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        this.topic = result[0]['topic']
        this.patient = result[0]['patient']
      })
    },
    getJobDetailByID (value) {
      var source = this.reverse(btoa(unescape(encodeURIComponent('{"jobid": "' + this.jobid + '"}')))) + this.randomString(5)
      this.axios.post(process.env.API + '/getJobDetailByID', { source: source }).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        this.listJobDetail = result
        this.setToothTemp()
      })
    },
    setEmitListJobDetail (value) {
      this.listJobDetail = value
      this.setToothTemp()
    },
    setToothTemp () {
      var k
      for (var i = 0; i < this.listJobDetail.length; i++) {
        var keep = this.listJobDetail[i].teeth_no.split(',')
        for (var j = 0; j < keep.length; j++) {
          for (k = 0; k < this.toothTemp.top.length; k++) {
            if (keep[j] === this.toothTemp.top[k].no) {
              this.toothTemp.top[k].active = true
            }
          }
          for (k = 0; k < this.toothTemp.bottom.length; k++) {
            if (keep[j] === this.toothTemp.bottom[k].no) {
              this.toothTemp.bottom[k].active = true
            }
          }
        }
      }
      // console.log(this.toothTemp)
    },
    openModalAddDetail () {
      this.$refs.adddetail.open()
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
