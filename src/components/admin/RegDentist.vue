<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 mb-2>
        <b class="display-1">ลงทะเบียนทันตแพทย์</b>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-layout row wrap>
            <v-flex xs12 md8 pt-2 offset-md2 center-x>
              <v-select v-model="username" :items="itemsUser" label="ระบุชื่อของผู้ที่ต้องการเลือก" item-text="name" item-value="username" autocomplete required>
                <template slot="item" slot-scope="data">
                  <v-list-tile-avatar>
                    <img :src="image">
                    <!-- <img :src="data.item.avatar !== '' ? getProfileImg(data.item.username, data.item.avatar) : image"> -->
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                    <!-- <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title> -->
                  </v-list-tile-content>
                </template>
              </v-select>
            </v-flex>
          </v-layout>


          <v-form ref="regForm" lazy-validation v-if="showData">
            <v-divider class="my-3"></v-divider>
            <v-layout row wrap class="pt-4">
              <v-flex xs12 sm4 md2>
                <v-layout row wrap>
                  <v-flex xs8 offset-xs2>
                    <img :src="image !== '/static/img/main/person.jpg' ? getProfileImg(username, image) : image" class="w-100 pa-0"/>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm8 md10>
                <v-container grid-list-lg pt-0>
                  <v-layout row wrap>
                    <v-flex xs12 md4 py-0>
                      <v-select v-model="pnameTH" label="คำนำหน้า (ภาษาไทย)" :items="['นาย','นาง','นางสาว']" disabled required></v-select>
                    </v-flex>
                    <v-flex xs12 md4 py-0>
                      <v-text-field v-model="fnameTH" label="ชื่อ (ภาษาไทย)" disabled required></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4 py-0>
                      <v-text-field v-model="lnameTH" label="นามสกุล (ภาษาไทย)" disabled required></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs12 md4 py-0>
                      <v-select v-model="pnameEN" label="คำนำหน้า (ภาษาอังกฤษ)" :items="['Mr.','Mrs.','Miss']" disabled required></v-select>
                    </v-flex>
                    <v-flex xs12 md4 py-0>
                      <v-text-field v-model="fnameEN" label="ชื่อ (ภาษาอังกฤษ)" disabled required></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4 py-0>
                      <v-text-field v-model="lnameEN" label="นามสกุล (ภาษาอังกฤษ)" disabled required></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs12 md4 py-0>
                      <v-text-field v-model="birthday" label="วัน/เดือน/ปีเกิด" append-icon="event" disabled required></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4 py-0>
                      <v-text-field v-model="email" label="อีเมล" :rules="itemRules.email" disabled required></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4 py-0>
                      <v-text-field v-model="mobile" label="เบอร์มือถือ" mask="### ### ####" disabled required></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs12 md4 py-0>
                      <v-text-field v-model="dentistLicenseNo" label="เลขที่ใบอนุญาตประกอบวิชาชีพ" :rules="itemRules.empty" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 md8 py-0>
                      <v-select v-model="skillful" label="ความเชี่ยวชาญ" :items="itemsSkill" item-text="skill_name" item-value="skill_id" multiple required></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs12 md4 py-0>
                      <v-select v-model="position" label="ตำแหน่ง" :items="itemsPosition"  multiple required></v-select>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card>
      </v-flex>
      <!-- <v-flex xs12 v-if="showData==false">

        <Permission/>

      </v-flex> -->
    </v-layout>
    <div v-if="showData" class="pt-3 w-100">
      <v-btn large color="primary" class="right btn-submit" @click="submitReg">ลงทะเบียน</v-btn>
      <!-- <v-btn large flat class="right" @click="">ล้างข้อมูล</v-btn> -->

    </div>
    <!-- <v-layout>
      <v-flex xs12 v-if="showRequesttobeEmployee">
        <RequesttobeEmployee/>
      </v-flex>
    </v-layout> -->
    <!-- <Permission/> -->

  </v-container>
</template>

<script>
// import Permission from '@/components/admin/Permission'
import { Encode, Decode } from '@/services'
// import RequesttobeEmployee from '@/pages/hospital/RequesttobeEmployee'
export default {
  components: {
    Encode,
    Decode
  },
  created () {
    this.getItemsUser()
    this.getSkill()
  },
  watch: {
    username () {
      this.getUserInfo()
    },
    showData () {
      if (this.showData === true) {
        this.showRequesttobeEmployee = false
      }
    }
  },
  data () {
    return {
      menu: false,
      showData: false,
      showRequesttobeEmployee: true,
      username: '',
      itemsUser: [
        {name: 'Thhh'}
      ],
      itemRules: {
        empty: [v => !!v || 'กรุณาระบุข้อมูล']
      },
      image: '/static/img/main/person.jpg',
      pnameTH: '',
      fnameTH: '',
      lnameTH: '',
      pnameEN: '',
      fnameEN: '',
      lnameEN: '',
      birthday: null,
      email: '',
      mobile: '',
      dentistLicenseNo: '',
      skillful: ['S1001'],
      itemsSkill: [],
      position: '',
      itemsPosition: ['ทันตแพทย์']
    }
  },
  methods: {
    submitReg () {
      if (this.$refs.regForm.validate() && this.skillful.length !== 0) {
        var textSource = '{"username": "' + this.username + '", "dentistLicenseNo": "' + this.dentistLicenseNo + '", "skillful": "' + this.skillful + '"}'
        var source = this.reverse(btoa(unescape(encodeURIComponent(textSource)))) + this.randomString(5)
        this.axios.post(process.env.API + '/setRoleDentist', { source: source }).then((response) => {
          if (response.data === 'success') {
            this.$swal('ลงทะเบียนสำเร็จ', '', 'success')
            this.clearData()
          } else {
            this.$swal('ไม่สามารถลงทะเบียนได้', 'กรุณาลองใหม่อีกครั้ง หรือ ติดต่อเจ้าหน้าที่', 'error')
          }
        })
      } else {
        this.$swal('ไม่สามารถลงทะเบียนได้', 'กรุณาตรวจสอบข้อมูลอีกครั้ง', 'error')
      }
    },
    getItemsUser () {
      this.axios.post(process.env.API + '/getPatientList').then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        this.itemsUser = result
      })
    },
    getUserInfo () {
      if (this.username !== '') {
        var source = this.reverse(btoa(unescape(encodeURIComponent('{"username": "' + this.username + '"}')))) + this.randomString(5)
        this.axios.post(process.env.API + '/getUserInfo', { source: source }).then((response) => {
          var result = JSON.parse(Decode.decode(response.data))
          this.showData = true
          this.pnameTH = result[0]['account_title_th']
          this.fnameTH = result[0]['first_name_th']
          this.lnameTH = result[0]['last_name_th']
          this.pnameEN = result[0]['account_title_eng']
          this.fnameEN = result[0]['first_name_eng']
          this.lnameEN = result[0]['last_name_eng']
          this.birthday = result[0]['birth_date']
          this.email = result[0]['email']
          this.mobile = result[0]['mobile_no']
          this.image = result[0]['profile_image']
        })
      }
    },

    getProfileImg (username, filename) {
      return process.env.API + '/getProfileImg/' + username + '/' + filename
    },
    getSkill () {
      this.axios.post(process.env.API + '/getSkillList').then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        console.log(result)
        this.itemsSkill = result
      })
    },
    save (date) {
      this.$refs.menu.save(date)
    },
    checkNationalID (id) {
      var sum = 0
      for (var i = 0; i < 12; i++) {
        sum += parseFloat(id.charAt(i)) * (13 - i)
      }
      if ((11 - sum % 11) % 10 !== parseFloat(id.charAt(12))) {
        return false
      }
      return true
    },
    clearData () {
      this.showData = false
      this.username = ''
      this.image = '/static/img/main/person.jpg'
      this.pnameTH = ''
      this.fnameTH = ''
      this.lnameTH = ''
      this.pnameEN = ''
      this.fnameEN = ''
      this.lnameEN = ''
      this.birthday = null
      this.email = ''
      this.mobile = ''
      this.dentistLicenseNo = ''
      this.skillful = ['S1001']
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
