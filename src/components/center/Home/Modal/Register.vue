<template lang="html">
  <v-container>
    <v-layout row wrap>
      <v-dialog v-model="modalReg" persistent max-width="1100px">
        <v-card>
          <div class="text-xs-right"><button @click="modalReg = false"><v-icon color="black">close</v-icon></button></div>
          <v-container grid-list-md class="pt-0 pb-2">
            <v-card-title class="py-0 pl-4">
              <b class="display-1 primary--text">ลงทะเบียนเข้าใช้งาน</b>
            </v-card-title>
            <v-card-text>
              <v-form ref="regForm" v-model="valid" lazy-validation>
                <v-layout row wrap class="pb-1">
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
                    <v-container grid-list-lg class="grey lighten-5">
                      <v-layout row wrap>
                        <v-flex xs12 md2 offset-md1 py-0 mt-3 class="hidden-sm-and-down">
                          <b>ชื่อผู้ใช้</b>
                        </v-flex>
                        <v-flex xs9 md7 offset-xs1 py-0>
                          <v-text-field v-model="username" label="ชื่อผู้ใช้" :error="itemsUsername.dup" :error-messages="itemsUsername.text" :rules="itemRules.username" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md2 offset-md1 py-0 mt-3 class="hidden-sm-and-down">
                          <b>รหัสผ่าน</b>
                        </v-flex>
                        <v-flex xs9 md7 offset-xs1 py-0>
                          <v-text-field v-model="password" label="รหัสผ่าน" :rules="itemRules.password" type="password" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md2 offset-md1 py-0 mt-3 class="hidden-sm-and-down">
                          <b>ยืนยันรหัสผ่าน</b>
                        </v-flex>
                        <v-flex xs9 md7 offset-xs1 py-0>
                          <v-text-field v-model="repassword" label="รหัสผ่าน" :rules="itemRules.repassword" type="password" required></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <v-container grid-list-lg py-2>
                      <v-layout row wrap>
                        <v-flex xs12 md4 py-0>
                          <v-select v-model="prefixNameTH " label="คำนำหน้า (ภาษาไทย)" :items="itemsGender.th" :rules="itemRules.empty" required></v-select>
                        </v-flex>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="firstNameTH" label="ชื่อ (ภาษาไทย)" :rules="itemRules.th" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="lastNameTH" label="นามสกุล (ภาษาไทย)" :rules="itemRules.th" required></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="prefixNameEN" label="คำนำหน้า (ภาษาอังกฤษ)" readonly required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="firstNameEN" label="ชื่อ (ภาษาอังกฤษ)" :rules="itemRules.en" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="lastNameEN" label="นามสกุล (ภาษาอังกฤษ)" :rules="itemRules.en" required></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap>
                        <v-flex xs12 md4 py-0>
                          <v-menu v-model="menu" ref="menu" transition="scale-transition" :close-on-content-click="false" offset-y full-width lazy>
                            <v-text-field slot="activator" v-model="birthDay" label="วัน/เดือน/ปีเกิด" append-icon="event" :rules="itemRules.birthDay" readonly required></v-text-field>
                            <v-date-picker v-model="birthDay" locale="th"  @change="save"></v-date-picker>
                          </v-menu>
                        </v-flex>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="email" label="อีเมล" :error="itemsEmail.dup" :error-messages="itemsEmail.text" :rules="itemRules.email" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 py-0>
                          <v-text-field v-model="phoneNumber" label="เบอร์มือถือ" mask="### ### ####" :rules="itemRules.empty" required></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap>
                        <v-flex xs12 md4 py-0>
                          <v-select v-model="cardType" label="ชนิดบัตร" :items="itemsCardType" item-text="th" :rules="itemRules.empty" return-object required></v-select>
                        </v-flex>
                        <v-flex xs12 md8 py-0>
                          <v-text-field v-if="cardType.th === 'หนังสือเดินทาง'" v-model="passportNo" :label="'เลขที่หนังสือเดินทาง'" :error="itemsID.dup" :error-messages="itemsID.text" :rules="itemRules.passport" :disabled="cardType === '' ? true : false"></v-text-field>
                          <v-text-field v-else v-model="cardId" :label="'เลขที่บัตรประชาชน'" :rules="itemRules.cardId" :error="itemsID.dup" :error-messages="itemsID.text" mask="# #### ##### ## #" :disabled="cardType === '' ? true : false"></v-text-field>
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
    </v-layout>
    <ModalAddProfileImg ref="addProfileImg" @profileImg="setEmitProfileImg" @profileImgShow="setEmitProfileImgShow"/>
    <Loading ref="loading"/>
  </v-container>
</template>

<script>
import { Encode, Decode } from '@/services'
import Navbar from '@/components/center/Home/Navbar'
import Loading from '@/components/Loading'
import ModalAddProfileImg from '@/components/center/Home/Modal/ModalAddProfileImg'
export default {
  components: {
    Loading, ModalAddProfileImg, Navbar, Encode, Decode
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
          v => /^[a-zA-Z0-9._-]+$/.test(v) || 'รูปแบบไม่ถูกต้อง กรุณาระบุตัวอักษรภาษาอังกฤษ หรือตัวเลข หรือ . _ - เท่านั้น'
        ],
        password: [
          v => !!v || 'กรุณาระบุรหัสผ่าน',
          v => (v.length >= 8) || 'กรุณาระบุรหัสผ่านอย่างน้อย 8 ตัว',
          v => /^((?=.*[a-zA-Z])(?=.*[0-9]).{8,})+$/.test(v) || 'รูปแบบไม่ถูกต้อง กรุณาระบุตัวอักษรภาษาอังกฤษ หรือตัวเลขเท่านั้น'
        ],
        repassword: [
          v => !!v || 'กรุณายืนยันรหัสผ่านอีกครั้ง',
          v => (v === this.password) || 'กรุณาระบุข้อมูลให้ตรงกัน'
        ],
        cardId: [
          v => !!v || 'กรุณาระบุเลขบัตรประชาชน',
          v => (v.length === 13) || 'กรุณาระบุเลขบัตรประชาชนให้ครบ 13 ตัว',
          v => this.checkNationalID(v) || 'รูปแบบไม่ถูกต้อง กรุณาตรวจสอบเลขบัตรประชาชนของท่านอีกครั้ง'
        ],
        passport: [
          v => !!v || 'กรุณาระบุหมายเลขหนังสือเดินทาง'
        ],
        email: [
          v => !!v || 'กรุณาระบุอีเมล',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'รูปแบบไม่ถูกต้อง กรุณาตรวจสอบอีเมลของท่านอีกครั้ง'
        ],
        birthDay: [
          v => !!v || 'กรุณาระบุวันเดือนปีเกิด',
          v => this.ageBelow(v) || 'อายุของท่านต่ำกว่าเกณฑ์'
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
      username: '',
      password: '',
      repassword: '',
      image: '/static/img/main/person.jpg',
      prefixNameTH: '',
      firstNameTH: '',
      lastNameTH: '',
      prefixNameEN: '',
      firstNameEN: '',
      lastNameEN: '',
      birthDay: null,
      email: '',
      phoneNumber: '',
      cardType: '',
      cardId: '',
      passportNo: '',
      disease: '', // โรคประจำตัว
      allergic: '', // แพ้ยา
      place: [],
      degree: '',
      dentistLicenseNo: '',
      skillful: [],
      itemsSkill: [],
      itemsPlace: [],
      itemsUsername: { text: [], dup: false },
      itemsEmail: { text: [], dup: false },
      itemsID: { text: [], dup: false },
      itemsGender: {
        th: ['นาย', 'นาง', 'นางสาว'] //, en: ['Mr', 'Mrs', 'Miss']
      },
      itemsCardType: [
        { en: 'ID_CARD', th: 'บัตรประชาชน' },
        { en: 'PASSPORT', th: 'หนังสือเดินทาง' }
      ],
      dataProfileImg: ''
    }
  },
  created () {
    this.dataProfileImg = new FormData()
    this.getItemsSkill()
    this.getItemsPlace()
    // this.username = 'qwe'
    // this.password = 'qweqwe123'
    // this.repassword = 'qweqwe123'
    // this.firstNameTH = 'สวัสดี'
    // this.lastNameTH = 'ทดสอบ'
    // this.firstNameEN = 'Hello'
    // this.lastNameEN = 'Test'
    // this.birthDay = '1994-01-19'
    // this.email = 'qwe@test.com'
    // this.phoneNumber = '0987654321'
  },
  watch: {
    prefixNameTH  () {
      if (this.prefixNameTH === 'นาย') {
        this.prefixNameEN = 'Mr'
      } else if (this.prefixNameTH === 'นาง') {
        this.prefixNameEN = 'Mrs'
      } else {
        this.prefixNameEN = 'Miss'
      }
    }
  },
  methods: {
    submit () {
      if (this.dataProfileImg.getAll('file').length !== 0) {
        if (this.$refs.regForm.validate()) {
          this.openLoading()
          var textSource = {
            username: this.username,
            password: this.password,
            prefixNameTH: this.prefixNameTH,
            firstNameTH: this.firstNameTH,
            lastNameTH: this.lastNameTH,
            prefixNameEN: this.prefixNameEN,
            firstNameEN: this.firstNameEN,
            lastNameEN: this.lastNameEN,
            birthDay: this.birthDay,
            email: this.email,
            phoneNumber: this.phoneNumber,
            cardType: this.cardType.en,
            cardId: this.setCardId(),
            disease: this.disease,
            allergic: this.allergic,
            employeeType: this.setEmployeeType(),
            degree: this.degree,
            place: this.place,
            dentistLicenseNo: this.dentistLicenseNo,
            skillful: this.skillful
          }
          // var source = this.reverse(btoa(unescape(encodeURIComponent(textSource)))) + this.randomString(5)
          this.axios.post(process.env.API + '/registerMember', { Source: textSource }).then((response) => {
            this.hideLoading()
            console.log(response.data)
            if (response.data.Status === 'Success') {
              this.dataProfileImg.append('username', this.username)
              // console.log(this.dataProfileImg.getAll('username'))
              // console.log(this.dataProfileImg.getAll('file'))
              this.uploadProfileImg(response.data.Result.textAlert)
            } else if (response.data.Status === 'Fail') {
              this.$swal(response.data.Result.textAlert, response.data.Result.case, 'error')
            } else {
              this.$swal('ข้อมูลขัดข้องบางประการ', 'กรุณาลองใหม่อีกครั้ง หรือติดต่อเจ้าหน้าที่', 'warning')
            }
          }, () => {
            this.hideLoading()
            this.$swal('ข้อมูลขัดข้องบางประการ', 'กรุณาลองใหม่อีกครั้ง หรือติดต่อเจ้าหน้าที่', 'warning')
          })
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
    open () {
      this.modalReg = true
    },
    openModalAddProfileImg (img) {
      this.$refs.addProfileImg.open('Add', img)
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
    setCardId () {
      var idCardNum = ''
      if (this.cardType.en === 'PASSPORT') {
        idCardNum = this.passportNo
      } else if (this.cardType.en === 'ID_CARD') {
        idCardNum = this.cardId
      }
      return idCardNum
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
    openLoading () {
      this.$refs.loading.open()
    },
    hideLoading () {
      this.$refs.loading.hide()
    },
    clearData () {
      this.$refs.regForm.reset()
      this.dataProfileImg.delete('file')
      this.dataProfileImg.delete('username')
      this.image = '/static/img/main/person.jpg'
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
      this.cardType = ''
      this.cardId = ''
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
    ageBelow (date) {
      var ageDifMs = Date.now() - new Date(date).getTime()
      var ageDate = new Date(ageDifMs)
      var age = Math.abs(ageDate.getUTCFullYear() - 1970)
      if (age < 7) {
        return false
      } else {
        return true
      }
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

.text-xs-right {
   background-color: 'blue darken-1';
}
</style>
