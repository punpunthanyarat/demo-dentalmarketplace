<template>
  <v-container grid-list-xl>
    <v-layout row justify-center>
      <v-dialog  v-model="modelRejectEmployee" persistent max-width="1100" class="textcolor1">
        <v-card>
          <div class="text-xs-right"><button @click="close()"><v-icon color="black">close</v-icon></button></div>
          <v-container grid-list-xl class="pt-0 pb-2">
            <v-card-title class="py-0 pl-2">
              <b class="display-1 primary--text">ปฎิเสธคำร้องขอเป็นบุคลากร</b>
            </v-card-title>
            <v-card-text>
              <v-layout row wrap class="pt-2">
                <v-flex xs12 sm3 md2>
                  <v-layout row wrap>
                    <v-flex xs8 offset-xs2 sm10 offset-sm1>
                      <img :src="image !== '/static/img/main/person.jpg' ? getProfileImg(memberId, image) : image" class="w-100 pa-0"/>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm9 md10>
                  <v-container grid-list-lg pt-0 pr-0>
                    <v-layout row wrap>
                      <v-flex xs12 md4 py-0>
                        <v-text-field v-model="prefixNameTH" label="คำนำหน้า (ภาษาไทย)" disabled required></v-text-field>
                      </v-flex>
                      <v-flex xs12 md4 py-0>
                        <v-text-field v-model="firstNameTH" label="ชื่อ (ภาษาไทย)" disabled required></v-text-field>
                      </v-flex>
                      <v-flex xs12 md4 py-0>
                        <v-text-field v-model="lastNameTH" label="นามสกุล (ภาษาไทย)" disabled required></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 md4 py-0>
                        <v-text-field v-model="prefixNameEN" label="คำนำหน้า (ภาษาอังกฤษ)" disabled required></v-text-field>
                      </v-flex>
                      <v-flex xs12 md4 py-0>
                        <v-text-field v-model="firstNameEN" label="ชื่อ (ภาษาอังกฤษ)" disabled required></v-text-field>
                      </v-flex>
                      <v-flex xs12 md4 py-0>
                        <v-text-field v-model="lastNameEN" label="นามสกุล (ภาษาอังกฤษ)" disabled required></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 md4 py-0>
                        <v-text-field v-model="birthDay" label="วัน/เดือน/ปีเกิด" append-icon="event" disabled required></v-text-field>
                      </v-flex>
                      <v-flex xs12 md4 py-0>
                        <v-text-field v-model="email" label="อีเมล" disabled required></v-text-field>
                      </v-flex>
                      <v-flex xs12 md4 py-0>
                        <v-text-field v-model="phoneNumber" label="เบอร์มือถือ" mask="### ### ####" disabled required></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 md4 py-0>
                        <v-text-field v-model="cardType.th" label="ชนิดบัตร" disabled required></v-text-field>
                      </v-flex>
                      <v-flex xs12 md8 py-0>
                        <v-text-field v-model="cardId" label="เลขที่บัตรประชาชน/หนังสือเดินทาง" disabled required></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 pa-0 text-xs-right>
                        <v-btn large flat @click="close()">ปิด</v-btn>
                        <v-btn large color="primary" @click="rejectEmployee()">ปฎิเสธ</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-container>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      modelRejectEmployee: false,
      requestEmployeeId: '',
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
      cardId: ''
    }
  },
  methods: {
    openReject (value) {
      this.modelRejectEmployee = true
      // console.log(value)
      this.requestEmployeeId = value.requestEmployeeId
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
      if (value.profileImage !== '') {
        this.image = value.profileImage
      }
    },
    rejectEmployee () {
      var textSource = {
        requestEmployeeId: this.requestEmployeeId
      }
      this.axios.post(process.env.API + '/rejectEmployee', { Source: textSource }).then((response) => {
        console.log(response.data)
        if (response.data.Status === 'Success') {
          this.$swal(response.data.Result.textAlert, '', 'success')
          this.close()
        }
      })
    },
    close () {
      this.modelRejectEmployee = false
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
