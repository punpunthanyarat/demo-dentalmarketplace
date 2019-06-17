<template lang="html">
  <v-container>
    <v-layout row wrap>
      <v-dialog v-model="modalReg" persistent max-width="1000px">
        <v-card>
          <div class="text-xs-right"><button @click="modalReg = false"><v-icon color="black">close</v-icon></button></div>
          <v-container grid-list-md class="pt-0 pb-2">
            <v-card-title class="py-0 pl-4">
              <b class="display-1 primary--text">ลงทะเบียนเข้าใช้งาน</b>
            </v-card-title>
            <v-card-text>
              <v-form ref="regForm" v-model="valid" lazy-validation>
                <v-layout row wrap>
                  <v-flex xs12 sm4 md2>
                    <v-layout row wrap>
                      <v-flex xs8 offset-xs2>
                        <img :src="image" class="w-100 pa-0"/>
                      </v-flex>
                      <v-flex xs8 offset-xs2 class="center-x">
                        <v-btn outline color="primary" class="myLabel w-100 ma-0" @click="">
                          <input type="file" @change="onFileChange"/>
                          <v-icon color="primary">add_photo_alternate</v-icon> เลือกรูป
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 sm8 md10>
                    <v-container grid-list-lg>
                      <v-layout row wrap>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="prefixNameTH " label="คำนำหน้า (ภาษาไทย)"readonly></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="firstNameTH" label="ชื่อ (ภาษาไทย)" readonly></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="lastNameTH" label="นามสกุล (ภาษาไทย)" readonly></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="prefixNameEN" label="คำนำหน้า (ภาษาอังกฤษ)" readonly></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="firstNameEN" label="ชื่อ (ภาษาอังกฤษ)" readonly></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="lastNameEN" label="นามสกุล (ภาษาอังกฤษ)" readonly></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="birthDay" label="วัน/เดือน/ปีเกิด" append-icon="event" readonly></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="email" label="อีเมล" readonly required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="phoneNumber " label="เบอร์มือถือ" mask="### ### ####" readonly required></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="cardType.th" label="ชนิดบัตร" readonly required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md8 py-0>
                          <v-text-field v-if="cardType.th === 'หนังสือเดินทาง'" v-model="passportNo" label="เลขที่หนังสือเดินทาง" readonly required></v-text-field>
                          <v-text-field v-else v-model="cardId" label="เลขที่บัตรประชาชน" mask="# #### ##### ## #"></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="disease" label="โรคประจำตัว"></v-text-field>
                        </v-flex>
                        <v-flex xs12 md8 py-0>
                          <v-text-field v-model="allergic" label="แพ้ยา"></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap pt-2>
                  <v-flex xs12>
                    <v-container grid-list-lg pt-0 pb-2>
                      <v-layout row wrap>
                        <v-flex xs12 pb-0><b>สำหรับเจ้าหน้าที่</b></v-flex>
                      </v-layout>
                      <v-layout row wrap>
                        <v-flex xs12 sm4 md2 pb-0 pt-3>
                          <v-checkbox label="เป็นบุคลากร" v-model="isEmployee"></v-checkbox>
                        </v-flex>
                        <v-flex xs12 md10 py-0>
                          <v-layout row wrap>
                            <v-flex xs12 md4 py-0>
                              <v-text-field v-model="degree" label="วุฒิการศึกษา" :disabled="!isEmployee"></v-text-field>
                            </v-flex>
                            <v-flex xs12 md8 py-0>
                              <v-select v-model="place" label="สถานประกอบการ" :items="itemsPlace" item-text="placeName" item-value="placeId" multiple :disabled="!isEmployee"></v-select>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap v-if="isEmployee">
                        <v-flex xs12 sm4 md2 pb-0 pt-2>
                          <v-checkbox label="เป็นทันตแพทย์" v-model="isDentist"></v-checkbox>
                        </v-flex>
                        <v-flex xs12 md10 py-0>
                          <v-layout row wrap>
                            <v-flex xs12 md4 py-0>
                              <v-text-field v-model="dentistLicenseNo" label="เลขที่ใบอนุญาตประกอบวิชาชีพ" :disabled="!isDentist"></v-text-field>
                            </v-flex>
                            <v-flex xs12 md8 py-0>
                              <v-select v-model="skillful" label="ความเชี่ยวชาญ" :items="itemsSkill" item-text="nameSkillTH" item-value="skillId" multiple :disabled="!isDentist"></v-select>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap>
                        <v-flex xs12 pa-0 text-xs-right>
                          <v-btn large flat @click="modalReg = false">ปิด</v-btn>
                          <v-btn large color="primary" @click="submit()" :disabled="!valid">ลงทะเบียน</v-btn>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
          </v-container>
        </v-card>
      </v-dialog>
      <ModalAddProfileImg ref="addProfileImg" @profileImg="setEmitProfileImg" @profileImgShow="setEmitProfileImgShow"/>
      <Loading ref="loading"/>
    </v-layout>
  </v-container>
</template>

<script>
import ModalAddProfileImg from '@/components/center/Home/Modal/ModalAddProfileImg'
import Loading from '@/components/Loading'
export default {
  components: {
    ModalAddProfileImg, Loading
  },
  data () {
    return {
      isEmployee: false,
      isDentist: false,
      valid: true,
      modalReg: false,
      menu: false,
      itemRules: {
        empty: [ v => !!v || 'กรุณาระบุข้อมูล' ],
        username: [
          v => !!v || 'กรุณาระบุชื่อผู้ใช้',
          v => (v.length >= 6) || 'กรุณาระบุชื่อผู้ใช้อย่างน้อย 6 ตัว',
          v => /^[a-zA-Z0-9._-]+$/.test(v) || 'รูปแบบไม่ถูกต้อง กรุณาระบุตัวอักษรภาษาอังกฤษ เลข หรือ . _ - เท่านั้น',
          v => this.one_checkUsername(v) || ''
        ],
        password: [
          v => !!v || 'กรุณาระบุรหัสผ่าน',
          v => (v.length >= 8) || 'กรุณาระบุรหัสผ่านอย่างน้อย 8 ตัว',
          v => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&.,])[A-Za-z\d$@$!%*#?&.,]+$/.test(v) || 'รูปแบบไม่ถูกต้อง รหัสผ่านต้องประกอบด้วยตัวอักษร เลข และอักขระพิเศษอย่างละ 1 ตัว'
        ],
        repassword: [
          v => !!v || 'กรุณายืนยันรหัสผ่านอีกครั้ง',
          v => (v === this.password) || 'กรุณาระบุข้อมูลให้ตรงกัน'
        ],
        citizenid: [
          v => !!v || 'กรุณาระบุเลขบัตรประชาชน',
          v => (v.length === 13) || 'กรุณาระบุเลขบัตรประชาชนให้ครบ 13 ตัว',
          v => this.checkNationalID(v) || 'รูปแบบไม่ถูกต้อง กรุณาตรวจสอบเลขบัตรประชาชนของท่านอีกครั้ง',
          v => this.one_checkID(v) || ''
        ],
        passport: [
          v => !!v || 'กรุณาระบุหมายเลขหนังสือเดินทาง',
          v => this.one_checkID(v) || ''
        ],
        email: [
          v => !!v || 'กรุณาระบุอีเมล',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'รูปแบบไม่ถูกต้อง กรุณาตรวจสอบอีเมลของท่านอีกครั้ง',
          v => this.one_checkEmail(v) || ''
        ],
        en: [
          v => !!v || 'กรุณาระบุข้อมูล',
          v => /^([a-zA-Z])+$/.test(v) || 'กรุณาระบุข้อมูลเป็นภาษาอังกฤษ'
        ],
        th: [
          v => !!v || 'กรุณาระบุข้อมูล',
          v => /^[ก-๙]+$/.test(v) || 'กรุณาระบุข้อมูลเป็นภาษาไทย'
        ]
      },
      image: '/static/img/main/person.jpg',
      oneId: '',
      username: '',
      prefixNameTH: '',
      firstNameTH: '',
      lastNameTH: '',
      prefixNameEN: '',
      firstNameEN: '',
      lastNameEN: '',
      email: '',
      thaiEmail: '',
      phoneNumber: '',
      cardType: '',
      cardId: '',
      cardIdTemp: '',
      passportNo: '',
      birthDay: null,
      disease: '', // โรคประจำตัว
      allergic: '', // แพ้ยา
      place: [],
      degree: '',
      dentistLicenseNo: '',
      skillful: [],
      itemsSkill: [],
      itemsPlace: [],
      itemsGender: {
        th: [ { i: 0, text: 'นาย' }, { i: 1, text: 'นาง' }, { i: 2, text: 'นางสาว' } ],
        en: [ { i: 0, text: 'Mr' }, { i: 1, text: 'Mrs' }, { i: 2, text: 'Miss' } ]
      },
      dataProfileImg: ''
    }
  },
  created () {
    this.dataProfileImg = new FormData()
    this.getItemsSkill()
    this.getItemsPlace()
  },
  methods: {
    submit () {
      if (this.dataProfileImg.getAll('file').length !== 0) {
        if (this.$refs.regForm.validate()) {
          if (this.cardIdTemp.slice(6) === this.cardId.slice(6) || this.cardIdTemp === this.passportNo) {
            this.openLoading()
            var textSource = {
              username: this.username,
              prefixNameTH: this.prefixNameTH,
              firstNameTH: this.firstNameTH,
              lastNameTH: this.lastNameTH,
              prefixNameEN: this.prefixNameEN,
              firstNameEN: this.firstNameEN,
              lastNameEN: this.lastNameEN,
              birthDay: this.birthDay,
              email: this.email,
              phoneNumber: this.phoneNumber,
              disease: this.disease,
              allergic: this.allergic,
              employeeType: this.setEmployeeType(),
              degree: this.degree,
              place: this.place,
              dentistLicenseNo: this.dentistLicenseNo,
              skillful: this.skillful,
              oneId: this.oneId,
              thaiEmail: this.thaiEmail,
              cardType: this.cardType.en,
              cardId: this.setCardId()
            }
            this.axios.post(process.env.API + '/registerHaveOne', { Source: textSource }).then((response) => {
              // console.log(response.data)
              if (response.data.Status === 'Success') {
                this.dataProfileImg.append('username', this.username)
                this.uploadProfileImg(response.data.Result.textAlert)
                this.goPage('/calendar_counter')
              } else if (response.data.Status === 'Fail') {
                this.$swal(response.data.Result.textAlert, response.data.Result.case, 'error')
              } else {
                this.$swal('ข้อมูลขัดข้องบางประการ', 'กรุณาลองใหม่อีกครั้ง หรือติดต่อเจ้าหน้าที่', 'warning')
              }
              this.hideLoading()
            }, () => {
              this.$swal('ข้อมูลขัดข้องบางประการ', 'กรุณาลองใหม่อีกครั้ง หรือติดต่อเจ้าหน้าที่', 'warning')
              this.hideLoading()
            })
          } else {
            this.$swal('เลขบัตรของท่านไม่ตรงกับระบบ', 'กรุณาตรวจสอบและลองใหม่อีกครั้ง', 'error')
          }
        }
      } else {
        this.$swal('กรุณาเลือกรูปประจำตัวของท่าน', '', 'error')
      }
    },
    uploadProfileImg (textAlert) {
      this.axios.post(process.env.API + '/userEditProfileImg', this.dataProfileImg).then((response) => {
        this.$swal(textAlert, '', 'success')
        this.modalReg = false
        this.clearData()
      }, () => {
        this.$swal('ไม่สามารถลงทะเบียนได้', 'กรุณาลองใหม่อีกครั้ง หรือ ติดต่อเจ้าหน้าที่', 'error')
      })
    },
    open (username, data) {
      this.username = username
      this.oneId = data['id']
      this.prefixNameTH = data['account_title_th']
      this.firstNameTH = data['first_name_th']
      this.lastNameTH = data['last_name_th']
      this.prefixNameEN = data['account_title_eng']
      this.firstNameEN = data['first_name_eng']
      this.lastNameEN = data['last_name_eng']
      this.email = data['email'][0]['email']
      this.thaiEmail = data['thai_email']
      this.phoneNumber = data['mobile'][0]['mobile_no']
      this.birthDay = data['birth_date']
      if (data['id_card_type'] === 'ID_CARD') {
        this.cardType = {
          th: 'บัตรประชาชน',
          en: data['id_card_type']
        }
      } else {
        this.cardType = {
          th: 'หนังสือเดินทาง',
          en: data['id_card_type']
        }
        this.passportNo = data['id_card_num']
      }
      this.cardIdTemp = data['id_card_num']
      this.modalReg = true
    },
    onFileChange (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      let vm = this
      let reader = new FileReader()
      reader.onload = (e) => {
        vm.image = e.target.result
        this.openModalAddProfileImg(vm.image)
      }
      reader.readAsDataURL(files[0])
    },
    setEmitProfileImg (value) {
      this.dataProfileImg.append('file', value)
      this.checkEmitProfileImg()
    },
    setEmitProfileImgShow (value) {
      this.image = value
      this.checkEmitProfileImg()
    },
    checkEmitProfileImg () {
      if (this.dataProfileImg.getAll('file') !== null && this.image !== '/static/img/main/person.jpg') {
        this.$refs.addProfileImg.hide()
      }
    },
    openModalAddProfileImg (img) {
      this.$refs.addProfileImg.open('Add', img)
    },
    openLoading () {
      this.$refs.loading.open()
    },
    hideLoading () {
      this.$refs.loading.hide()
    },
    setEmployeeType () {
      var employeeType = ''
      if (this.isEmployee && this.isDentist) { // Dentist
        employeeType = 'dentist'
      } else if (this.isEmployee && !this.isDentist) { // Staff
        employeeType = 'staff'
      }
      return employeeType
    },
    setCardId () {
      var idCardNum = ''
      if (this.cardType.en === 'PASSPORT') {
        idCardNum = this.passportNo
      } else if (this.cardType.en === 'ID_CARD') {
        idCardNum = this.cardId
      }
      return idCardNum
    },
    clearData () {
      this.$refs.regForm.reset()
      this.username = ''
      this.password = ''
      this.repassword = ''
      this.prefixNameTH = ''
      this.firstNameTH = ''
      this.lastNameTH = ''
      this.prefixNameEN = ''
      this.firstNameEN = ''
      this.lastNameEN = ''
      this.birthDay = ''
      this.email = ''
      this.phoneNumber = ''
      this.citizenId = ''
      this.passportNo = ''
      this.disease = ''
      this.allergic = ''
    },
    getItemsSkill () {
      this.axios.post(process.env.API + '/getSkillDentistList').then((response) => {
        // console.log(response.data)
        if (response.data.Status === 'Success') {
          this.itemsSkill = response.data.Result
        }
      })
    },
    getItemsPlace () {
      this.axios.post(process.env.API + '/getPlaceList').then((response) => {
        // console.log(response.data)
        if (response.data.Status === 'Success') {
          this.itemsPlace = response.data.Result
        }
      })
    },
    save (date) {
      this.$refs.menu.save(date)
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
    },
    checkNationalID (id) {
      var sum = 0
      if (id.length !== 13) { return false }
      for (var i = 0; i < 12; i++) {
        sum += parseFloat(id.charAt(i)) * (13 - i)
      }
      if ((11 - sum % 11) % 10 !== parseFloat(id.charAt(12))) {
        return false
      }
      return true
    },
    goPage (link) {
      // this.$router.push(link)
      // window.open(link)
      window.location = link
    }
  }
}
</script>

<style scoped>
.myLabel {
  position: relative;
}
.myLabel:hover input {
  cursor:pointer;
}

.myLabel input {
  position: absolute;
  z-index: 2;
  opacity: 0;
  width: 100%;
  height: 100%;
}
</style>
