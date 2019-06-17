<template>
  <v-container grid-list-xl>
    <v-layout row justify-center>
      <v-dialog v-model="modelSubmitEmployee" persistent max-width="1100" class="textcolor1">
        <v-card>
          <div class="text-xs-right"><button @click="close()"><v-icon color="black">close</v-icon></button></div>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container grid-list-xl class="pt-0 pb-2">
              <v-card-title class="py-0 pl-2">
                <b class="display-1 primary--text">ยืนยันคำร้องขอเป็นบุคลากร</b>
              </v-card-title>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs12 class="grey lighten-4 px-4 ml-2">
                    <v-layout row wrap>
                      <v-flex xs12 sm2 class="hidden-xs-only h-center"><b>ตำแหน่ง</b></v-flex>
                      <v-flex xs12 sm10>
                        <v-select v-model="position" :items="itemsPosition" item-text="positionName" item-value="positionId" attach label="ตำแหน่ง"></v-select>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-layout row wrap class="pt-2">
                  <v-flex xs12 sm3 md2>
                    <v-layout row wrap>
                      <v-flex xs8 offset-xs2 sm10 offset-sm1>
                        <img :src="image !== '/static/img/main/person.jpg' ? getProfileImg(memberId, image) : image" class="w-100 pa-0"/>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 sm9 md10>
                    <v-container grid-list-lg pt-0>
                      <v-layout row wrap>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="prefixNameTH" label="คำนำหน้า (ภาษาไทย)" readonly required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="firstNameTH" label="ชื่อ (ภาษาไทย)" readonly required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="lastNameTH" label="นามสกุล (ภาษาไทย)" readonly required></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="prefixNameEN" label="คำนำหน้า (ภาษาอังกฤษ)" readonly required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="firstNameEN" label="ชื่อ (ภาษาอังกฤษ)" readonly required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="lastNameEN" label="นามสกุล (ภาษาอังกฤษ)" readonly required></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="birthDay" label="วัน/เดือน/ปีเกิด" append-icon="event" readonly required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="email" label="อีเมล" readonly required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="phoneNumber" label="เบอร์มือถือ" mask="### ### ####" readonly required></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="cardType.th" label="ชนิดบัตร" readonly required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md8 py-0>
                          <v-text-field v-model="cardId" label="เลขที่บัตรประชาชน/หนังสือเดินทาง" readonly required></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap>
                        <v-flex xs12 md4 py-0>
                          <v-select v-model="employeeType" label="ประเภทบุคลากร" :items="itemEmployeeType" item-text="th" item-value="en" :rules="itemRules.empty" required></v-select>
                        </v-flex>
                        <v-flex xs12 md8 py-0>
                          <v-text-field v-model="degree" label="วุฒิการศึกษา" :rules="itemRules.empty" required readonly></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap v-if="employeeType === 'dentist'">
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="dentistLicenseNo" label="เลขที่ใบอนุญาตประกอบวิชาชีพ" :rules="itemRules.empty" required readonly></v-text-field>
                        </v-flex>
                        <v-flex xs12 md8 py-0>
                          <v-select v-model="skillful" label="ความเชี่ยวชาญ" :items="itemsSkill" item-text="nameSkillTH" item-value="skillId" multiple required readonly></v-select>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12>
                    <b class="mt-3">ตารางเวรตรวจการ</b>
                    <v-data-table :headers="headers" :items="workTime" hide-actions>
                      <template slot="items" slot-scope="props">
                        <td>{{ props.item.dayTH}}</td>
                        <td>
                          <v-text-field v-model="props.item.timeStart" label="HH:MM" append-icon="schedule" :rules="!props.item.active ? itemRules.clear : itemRules.time" single-line return-masked-value mask="##:##" :disabled="!props.item.active"></v-text-field>
                        </td>
                        <td>
                          <v-text-field v-model="props.item.timeEnd" label="HH:MM" append-icon="schedule" :rules="!props.item.active ? itemRules.clear : itemRules.time" single-line return-masked-value mask="##:##" :disabled="!props.item.active"></v-text-field>
                        </td>
                        <td><v-switch v-model="props.item.active"></v-switch></td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
                <v-layout row wrap pb-2>
                  <v-flex xs12 pa-0 text-xs-right>
                    <v-btn large flat @click="close()">ปิด</v-btn>
                    <v-btn large color="primary" @click="approveEmployee()" :disabled="!valid">ยืนยัน</v-btn>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-container>
          </v-form>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      placeId: '',
      modelSubmitEmployee: false,
      valid: true,
      itemRules: {
        clear: [],
        empty: [v => !!v || 'กรุณาระบุข้อมูล'],
        time: [
          v => !!v || 'กรุณาระบุข้อมูล',
          v => (v.length === 5) || 'ไม่ถูกรูปแบบของเวลา',
          v => (v.substr(0, 2) > -1 && v.substr(0, 2) < 24) || 'กรุณาระบุข้อมูลระหว่าง 00 - 23',
          v => (v.substr(3, 5) > -1 && v.substr(3, 5) < 60) || 'กรุณาระบุข้อมูลระหว่าง 00 - 59',
          v => (v.substr(3, 5) === '00' || v.substr(3, 5) === '20' || v.substr(3, 5) === '40') || 'กรุณาระบุในรูปแบบ 00 20 หรือ 40 นาที เพื่อความสอดคล้องกับปฏิทิน'
        ]
      },
      itemsPosition: [],
      position: [],
      image: '/static/img/main/person.jpg',
      memberId: '',
      prefixNameTH: '',
      firstNameTH: '',
      lastNameTH: '',
      prefixNameEN: '',
      firstNameEN: '',
      lastNameEN: '',
      birthDay: '',
      email: '',
      phoneNumber: '',
      cardType: '',
      cardId: '',
      degree: '',
      dentistLicenseNo: '',
      skillful: '',
      workTime: [
        { day: 'Mon', dayTH: 'จันทร์', timeStart: '', timeEnd: '', active: true },
        { day: 'Tue', dayTH: 'อังคาร', timeStart: '', timeEnd: '', active: false },
        { day: 'Wed', dayTH: 'พุธ', timeStart: '', timeEnd: '', active: false },
        { day: 'Thu', dayTH: 'พฤหัสบดี', timeStart: '', timeEnd: '', active: false },
        { day: 'Fri', dayTH: 'ศุกร์', timeStart: '', timeEnd: '', active: false },
        { day: 'Sat', dayTH: 'เสาร์', timeStart: '', timeEnd: '', active: false },
        { day: 'Sun', dayTH: 'อาทิตย์', timeStart: '', timeEnd: '', active: false }
      ],
      headers: [
        { text: 'วันประจำเวรตรวจการ', sortable: false },
        { text: 'เริ่มเวลา', sortable: false },
        { text: 'สิ้นสุดเวลา', sortable: false },
        { text: '', sortable: false }
      ],
      employeeType: '',
      itemEmployeeType: [
        { th: 'เจ้าหน้าที่', en: 'staff' },
        { th: 'ทันตแพทย์', en: 'dentist' }
      ],
      itemsSkill: []
    }
  },
  created () {
    this.placeId = 1
    this.getPositionList()
    this.getSkillList()
  },
  methods: {
    openSubmit (value) {
      this.modelSubmitEmployee = true
      // console.log(value)
      this.memberId = value.memberId
      this.prefixNameTH = value.prefixNameTH
      this.firstNameTH = value.firstNameTH
      this.lastNameTH = value.lastNameTH
      this.prefixNameEN = value.prefixNameEN
      this.firstNameEN = value.firstNameEN
      this.lastNameEN = value.lastNameEN
      this.birthDay = value.birthDay
      this.email = value.email
      this.phoneNumber = value.phoneNumber
      if (value.cardType === 'ID_CARD') {
        this.cardType = { th: 'บัตรประชาชน', en: value.cardType }
      } else {
        this.cardType = { th: 'หนังสือเดินทาง', en: value.cardType }
      }
      this.cardId = value.cardId
      this.degree = value.degree
      this.dentistLicenseNo = value.dentistLicenseNo
      this.skillful = value.skillful
      if (value.profileImage !== '') {
        this.image = value.profileImage
      }
      this.employeeType = value.employeeType
    },
    approveEmployee () {
      if (this.position.length !== 0 || this.$refs.regForm.validate()) {
        var textSource = {
          placeId: this.placeId,
          memberId: this.memberId,
          positionId: this.position,
          workTime: this.workTime,
          employeeType: this.employeeType,
          createBy: ''
        }
        console.log(textSource)
        this.axios.post(process.env.API + '/addEmployee', { Source: textSource }).then((response) => {
          if (response.data.Status === 'Success') {
            this.$swal(response.data.Result.textAlert, '', 'success')
            this.close()
            window.location.reload()
          } else if (response.data.Status === 'Fail') {
            this.$swal(response.data.Result.textAlert, response.data.Result.case, 'error')
          } else {
            this.$swal('ข้อมูลขัดข้องบางประการ', 'กรุณาลองใหม่อีกครั้ง หรือติดต่อเจ้าหน้าที่', 'warning')
          }
        })
        // this.itemsPosition = [
        //   {
        //     positionId: '1',
        //     positionName: 'พนักงานอัพโหลดไฟล์'
        //   },
        //   {
        //     positionId: '2',
        //     positionName: 'พนักงานจัดซื้อจัดจ้าง'
        //   }
        // ]
      } else {
        this.$swal('ไม่มีข้อมูล', 'กรุณาระบุข้อมูลให้ครบ', 'warning')
      }
    },
    getPositionList () {
      var textSource = {
        placeId: 1
      }
      this.axios.post(process.env.API + '/getPositionList', { Source: textSource }).then((response) => {
        // console.log(response.data)
        if (response.data.Status === 'Success') {
          this.itemsPosition = response.data.Result
        }
      })
    },
    getSkillList () {
      var textSource = { placeId: this.placeId }
      this.axios.post(process.env.API + '/getSkillDentistList', { Source: textSource }).then((response) => {
        // console.log(response.data)
        if (response.data.Status === 'Success') {
          this.itemsSkill = response.data.Result
        }
      })
    },
    close () {
      this.modelSubmitEmployee = false
      this.position = []
    },
    getProfileImg (memberId, filename) {
      return process.env.API + '/getProfileImg/' + memberId + '/' + filename
    }
  }
}
</script>

<style lang="css">
.alltable {
  border-collapse: collapse;
  border-spacing: 0px;
  margin: 0px 45px;
}
.alltabletdth {
  padding: 5px;
  border: 1px solid black;
}
.buttonx {
  padding-right: 0px;
}
th {
  padding: 0px 20px;
}
.tabHeight {
  max-height:100px;
  width:95%;
  overflow-y:auto;padding:2px;
  /* color:orange; */
  border: 2px solid black;
}
.textcolor1 {
  margin: 50px;
  color: #d42929;
  text-align: center;
}
</style>
