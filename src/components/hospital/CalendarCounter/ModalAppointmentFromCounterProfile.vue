<template lang="html">
  <div class="">
    <v-layout row justify-center>
      <v-dialog v-model="popup" fullscreen transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title class="pl-3">เพิ่มการนัดหมาย</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn class="pr-2" icon dark @click.native="popup = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-container fill-height>
            <v-form ref="form" lazy-validation>
              <v-layout wrap align-center>
                    <v-flex xs12 sm4 class="mt-4">
                      <header v-text="'หัวข้อ :'"></header>
                    </v-flex>
                    <v-flex xs12 sm8 class="mt-4">
                      <v-text-field
                      v-model="topic"
                      label="หัวข้อ"
                      >
                    </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4 class="mt-4">
                      <header v-text="'บริการ (หัตถการ) :'"></header>
                    </v-flex>
                    <!-- <pre>{{restorationNameTH}}</pre> -->
                    <!-- <pre>{{restorationId}}</pre> -->
                    <v-flex xs12 sm8 class="mt-4">
                      <v-select
                        :items="itemsRestoration"
                        item-text="restorationNameTH"
                        item-value="restorationId"
                        v-model="restorationId"
                        label="เลือกการบริการ.."
                        max-height="400"
                        multiple chips persistent-hint>
                      </v-select>
                      <!-- <pre>{{itemsRestoration}}</pre> -->
                      <!-- <pre>{{itemsUser}}</pre> -->
                </v-flex>
                <v-flex xs12 sm4 class="mt-4">
                  <header v-text="'ผู้มาติดต่อ :'"></header>
                </v-flex>
                <v-flex xs12 sm8 class="mt-4">
                  <v-radio-group v-model="type" row>
                    <v-radio class="mr-5" label="ผู้ใช้บริการคนใหม่" value="new"></v-radio>
                    <v-radio class="ml-5" label="ผู้ใช้บริการคนเดิม" value="old"></v-radio>
                  </v-radio-group>
                </v-flex>
                <!-- {{itemsUser.memberId}} -->
                <v-flex v-if="type == 'old'" xs12 sm8 offset-md4 class="mt-4">
                  <v-card class="grey-border grey lighten-5">
                    <v-container grid-list-xl>
                      <v-layout row wrap style="padding: 40px 30px;">
                        <v-flex xs12 md5 py-0>
                          <v-select v-model="search" label="ค้นหาด้วย" :items="searchItems" :rules="itemRules.empty" ></v-select>
                        </v-flex>
                        <v-flex xs12 md5 py-0>
                          <v-text-field v-if="search.text === 'ชื่อ-นามสกุล'" v-model="searchFullname" :label="'ชื่อ-นามสกุล'"  :disabled="search === '' ? true : false"></v-text-field>
                          <v-text-field v-else v-model="searchCardId" :label="'เลขที่บัตรประชาชน/หนังสือเดินทาง'"  :disabled="search === '' ? true : false"></v-text-field>
                          <!-- <pre>{{itemsCardType.text}}</pre> -->
                        </v-flex>
                        <v-flex xs12  md2 py-0>
                          <v-btn  color="primary" @click="searchInput()">ค้นหา</v-btn>
                        </v-flex>
                      </v-layout>
                      <v-divider v-if="selectedUser == true"></v-divider>
                        <v-container grid-list-xs,sm,md,lg,xl v-if="selectedUser == true"  hide-actions class="grey-border grey lighten-5">
                          <b>รหัสสมาชิก: {{selected.memberId}}</b>
                          <v-layout row wrap>
                            <v-flex md2>
                              <v-layout row wrap>
                                <v-flex md12>
                                  <img :src="getProfileImg(profileImg, memberId)" class="w-100 pa-0"/>
                                </v-flex>
                              </v-layout>
                            </v-flex>
                            <v-flex md10>
                              <v-layout row wrap>
                                <v-flex md4 class="mt-4">
                                  <v-text-field v-model="selected.prefixNameTH" label="คำนำหน้า"  disabled ></v-text-field>
                                </v-flex>
                                <v-flex md4 class="mt-4">
                                  <v-text-field v-model="selected.firstNameTH" label="ชื่อ"  disabled ></v-text-field>
                                </v-flex>
                                <v-flex md4 class="mt-4">
                                  <v-text-field v-model="selected.lastNameTH"  label="นามสกุล"  disabled ></v-text-field>
                                </v-flex>
                                <v-flex md4 class="mt-4">
                                  <v-text-field v-model="selected.prefixNameEN" label="Prefix"  disabled ></v-text-field>
                                </v-flex>
                                <v-flex md4 class="mt-4">
                                  <v-text-field v-model="selected.firstNameEN" label="Firstname"  disabled ></v-text-field>
                                </v-flex>
                                <v-flex md4 class="mt-4">
                                  <v-text-field v-model="selected.lastNameEN"  label="Lastname"  disabled ></v-text-field>
                                </v-flex>
                              </v-layout>
                            </v-flex>
                          </v-layout>
                        </v-container>
                    </v-container>
                    <!-- <pre> type = {{type}}</pre> -->
                  </v-card>
                  <v-dialog v-model="searchMember" persistent max-width="1100px">
                    <v-card>
                      <div class="text-xs-right"><button @click="searchMember = false"><v-icon color="black">close</v-icon></button></div>
                      <v-container grid-list-md class="pt-0 pb-2">
                        <v-card-title class="py-0 pl-4">
                          <b class="display-1 primary--text">เลือกรายชื่อที่ต้องการ</b>
                        </v-card-title>
                        <v-card-text class="pt-0">
                          <v-layout row wrap>
                            <v-flex xs12>
                              <v-radio-group v-model="selected" >
                                <v-data-table :headers="headers" :items="memberItems" hide-actions>
                                  <template slot="items" slot-scope="data">
                                    <td>{{data.item.memberId}}</td>
                                    <td>{{ data.item.prefixNameTH }} {{ data.item.firstNameTH }}  {{ data.item.lastNameTH }}</td>
                                    <td >{{ data.item.birthDay }}</td>
                                    <td >{{ data.item.phoneNumber }}</td>
                                    <td ><v-radio :value="data.item"></v-radio></td>
                                  </template>
                                </v-data-table>
                              </v-radio-group>
                            </v-flex>
                          </v-layout>
                          <v-layout row wrap>
                            <v-flex xs12 pa-0 text-xs-right>
                              <v-btn large flat @click="searchMember = false">ปิด</v-btn>
                              <v-btn large color="primary" @click="closeSearchUser()"  :disabled="selected === ''">เลือก</v-btn>
                            </v-flex>
                          </v-layout>
                        </v-card-text>
                      </v-container>
                    </v-card>
                  </v-dialog>
                </v-flex>
                <v-flex xs12 sm8 offset-sm4 v-if="type == 'new'" class="mt-4">
                  <v-card class="grey-border grey lighten-5">
                    <v-container grid-list-xl>
                      <v-layout row wrap style="padding: 40px 30px;">
                        <v-flex xs12 sm6 md4>
                          <v-select v-model="prefixNameEN" :items="nameTitle.prefixNameEN" :rules="itemRules.empty" label="คำนำหน้าชื่อ"></v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="firstNameEN" label="ชื่อ (ภาษาอังกฤษ)" :rules="itemRules.en"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="lastNameEN" label="นามสกุล (ภาษาอังกฤษ)" :rules="itemRules.en"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-select v-model="prefixNameTHNew" :items="nameTitle.prefixNameTH"  label="คำนำหน้าชื่อ"></v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="firstNameTHNew" label="ชื่อ (ภาษาไทย)" :rules="itemRules.th" ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="lastNameTHNew" label="นามสกุล (ภาษาไทย)" :rules="itemRules.th" ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4 class="pt-3">
                          <v-menu ref="menu3" :close-on-content-click="false" v-model="menu3" :nudge-right="40"
                          lazy transition="scale-transition" offset-y full-width min-width="290px">
                          <v-text-field slot="activator" v-model="birthDay" label="วันเกิด" append-icon="event" :rules="itemRules.empty" readonly></v-text-field>
                          <v-date-picker ref="picker" v-model="birthDay" :max="new Date().toISOString().substr(0, 10)" min="1950-01-01" @change="save"></v-date-picker>
                          </v-menu>
                        </v-flex>
                        <v-flex xs12 sm6 md8 class="pt-3">
                          <v-text-field v-model="phoneNumber" :rules="itemRules.phoneRules" mask="###-###-####" max="10" label="เบอร์โทรศัพท์ที่ติดต่อได้"></v-text-field>
                        </v-flex>
                        <!-- <v-flex xs12 sm6 md4>
                          <v-text-field v-model="cardId" label="หมายเลขบัตร" :rules="itemRules.cardIdRule"></v-text-field>
                        </v-flex> -->
                          <v-flex xs12 md4 py-0>
                            <v-select v-model="cardType" label="ชนิดบัตร" :items="itemsCardType" :rules="itemRules.empty" ></v-select>
                          </v-flex>
                          <v-flex xs12 md8 py-0>
                            <v-text-field v-if="cardType.text === 'หนังสือเดินทาง'" v-model="passportNo" :label="'เลขที่หนังสือเดินทาง'" :rules="itemRules.passport" :disabled="cardType === '' ? true : false"></v-text-field>
                            <v-text-field v-else v-model="cardId1" :label="'เลขที่บัตรประชาชน'" :rules="itemRules.cardId" :disabled="cardType === '' ? true : false"></v-text-field>
                            <!-- <pre>{{itemsCardType.text}}</pre> -->
                          </v-flex>
                          <!-- <v-flex xs12 md4 py-0>
                            <v-select v-model="degree" :items="itemsDegree" item-text="degree" label="วุฒิการศึกษา" ></v-select>
                          </v-flex> -->
                        <!-- <pre> type = {{type}}</pre> -->
                      </v-layout>
                   </v-container>
                 </v-card>
                </v-flex>
                <v-flex xs12 sm4 class="mt-4">
                  <header v-text="'ทันตแพทย์ :'"></header>
                </v-flex>
                <!-- <pre>{{itemsDentist}}</pre> -->
                <v-flex xs12 sm8 class="mt-4">
                  <v-select v-model="receiveDentistId" :placeholder="receiveDentistFullName" label="ระบุชื่อหมอ" readonly   >
                    <!-- <template slot="item" slot-scope="data">
                      <v-list-tile-avatar>
                        <img :src="image">
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.dentistNameTH"></v-list-tile-title>
                      </v-list-tile-content>
                    </template> -->
                  </v-select>
                </v-flex>
                <v-flex xs12 sm4 class="mt-4">
                  <header v-text="'วันที่นัดหมาย :'"></header>
                </v-flex>
                <v-flex xs12 sm4 class="pr-5 mt-4">
                  <!-- <v-dialog ref="dialog" v-model="modal" :return-value.sync="dateAppoint" persistent lazy full-width width="290px">
                    <v-date-picker v-model="dateAppoint" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.dialog.save(dateAppoint)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog> -->
                  <v-text-field slot="activator" v-model="receiveDateAppoint" :placeholder="receiveDateAppoint" label="วันที่นัดหมาย" append-icon="event" readonly></v-text-field>
                </v-flex>
                <v-flex xs12 sm4 class="pl-5 mt-4">
                  <v-menu ref="menu" :close-on-content-click="false" v-model="menu2" :nudge-right="40" :return-value.sync="timeAppoint" lazy transition="scale-transition"
                  offset-y full-width max-width="290px" min-width="290px">
                  <v-text-field slot="activator" v-model="timeAppoint" label="เวลาที่นัดหมาย" append-icon="access_time" readonly></v-text-field>
                  <v-time-picker v-if="menu2" v-model="timeAppoint" @change="$refs.menu.save(timeAppoint)"></v-time-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm4 class="mt-4">
                  <header v-text="'สิ่งที่ควรปฎิบัติมา :'"></header>
                </v-flex>
                <v-flex xs12 sm8 class="mt-4">
                  <v-text-field
                  v-model="description"
                  label="สิ่งที่ควรปฎิบัติมา"
                  multi-line
                  >
                </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12 text-xs-right>
                  <v-btn  class="mt-5" v-if="type=='old'" color="primary" @click="addAppointmentold()">ยืนยัน</v-btn>
                  <v-btn  class="mt-5" v-if="type=='new'" color="primary" @click="addAppointmentnew()">ยืนยัน</v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import { Encode, Decode } from '@/services'
export default {
  components: {
    Encode,
    Decode
  },
  created () {
    this.getItemsUser()
    this.getItemsDentist()
    this.getRestoration()
    this.typeSearch()
  },
  data () {
    return {
      menu2: false,
      menu3: false,
      selectedUser: false,
      date2: null,
      modal2: false,
      birthDay: null,
      restoration: '',
      searchMember: false,
      modal: false,
      isLoading: false,
      dialog: false,
      popup: false,
      memberId: '',
      tdPrefixNameTh: '',
      tdFullNameTh: '',
      prefixNameTH: '',
      firstNameTH: '',
      lastNameTH: '',
      cardType: '',
      search: '',
      image: '/static/img/main/person.jpg',
      receivedentistItems: [],
      receiveDentistFullName: '',
      receiveDentistId: '',
      receiveDateAppoint: '',
      restorationId: [],
      topic: '',
      description: '',
      type: '',
      dentistId: '',
      dateAppoint: null,
      timeAppoint: null,
      selectRestoration: [],
      addAppointo: [],
      addAppointn: [],
      itemsRestoration: [],
      // selectPrefixThai: [],
      phoneNumber: '',
      passportNo: '',
      searchCardId: '',
      searchFullname: '',
      textSearch: '',
      typeMember: '',
      cardId: '',
      cardId1: '',
      prefixNameTHNew: '',
      firstNameTHNew: '',
      lastNameTHNew: '',
      prefixNameEN: '',
      firstNameEN: '',
      lastNameEN: '',
      receiveDentistName: [],
      checkStatus: false,
      memberItems: [],
      itemsUser: [],
      profileImage: '',
      memberID: '',
      itemsDentist: [],
      restorationNameTH: [],
      restorationName: '',
      selected: '',
      headers: [
        { text: 'รหัสสมาชิก', sortable: false },
        { text: 'ชื่อ - สกุล', sortable: false },
        { text: 'วันเกิด', sortable: false },
        { text: 'เบอร์ติดต่อ', sortable: false },
        { text: '', sortable: false }
      ],
      itemsMember: [],
      itemsCardType: [
        { data: 'ID_CARD', text: 'บัตรประชาชน' },
        { data: 'PASSPORT', text: 'หนังสือเดินทาง' }
      ],
      searchItems: [
        { data: 'ID_CARD', text: 'บัตรประชาชน/หนังสือเดินทาง' },
        { data: 'PASSPORT', text: 'ชื่อ-นามสกุล' }
      ],
      nameTitle: {
        prefixNameEN: [
          'Mr.', 'Mrs.', 'Miss'
        ],
        prefixNameTH: [
          'นาย', 'นาง', 'นางสาว'
        ]
      },
      itemRules: {
        empty: [ v => !!v || 'กรุณาระบุข้อมูล' ],
        en: [
          v => !!v || 'กรุณากรอกชื่อให้ครบถ้วน',
          v => /^([A-z ])+$/.test(v) || 'กรุณากรอกภาษาอังกฤษ'
        ],
        phoneRules: [
          v => !!v || 'กรุณาใส่เบอร์โทรศัพท์',
          v => /^([0-9])+$/.test(v) || 'กรุณากรอกตัวเลข'
        ],
        cardId: [
          v => !!v || 'กรุณาระบุเลขบัตรประชาชน',
          v => (v.length === 13) || 'กรุณาระบุเลขบัตรประชาชนให้ครบ 13 ตัว',
          v => this.checkNationalID(v) || 'รูปแบบไม่ถูกต้อง กรุณาตรวจสอบเลขบัตรประชาชนของท่านอีกครั้ง'
        ],
        passport: [
          v => !!v || 'กรุณาระบุหมายเลขหนังสือเดินทาง'
        ],
        th: [
          v => !!v || 'กรุณาระบุข้อมูล',
          v => /^[ก-๙]+$/.test(v) || 'กรุณาระบุข้อมูลเป็นภาษาไทย'
        ]
      },
      column: null,
      row: null
    }
  },
  watch: {
    menu3 (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    getProfileImg (receiveProfileImage, receiveMemberID) {
      this.profileImg = receiveProfileImage
      this.memberId = receiveMemberID
      if (this.profileImg === '') {
        return this.image
      } else {
        return process.env.API + '/getProfileImg' + '/' + this.memberId + '/' + this.profileImg
      }
    },
    open (itemsDentist, dateAppoint) {
      this.receivedentistItems = itemsDentist
      for (var i = 0; i < this.receivedentistItems.length; i++) {
        this.receiveDentistFullName = this.receivedentistItems[i].dentistFullName
        // console.log('receiveDentistFullName', this.receiveDentistFullName)
        this.receiveDentistId = this.receivedentistItems[i].dentistId
        // console.log('receivedentistItems', this.receivedentistItems)
      }
      this.receiveDateAppoint = dateAppoint
      // console.log('receiveDateAppoint', this.receiveDateAppoint)
      this.popup = true
    },
    closeSearchUser () {
      this.selectedUser = true
      this.searchMember = false
    },
    setCardId () {
      var idCardNum = ''
      if (this.cardType.text === 'หนังสือเดินทาง') {
        idCardNum = this.passportNo
        // console.log(this.passportNo)
        // console.log('passportNo')
      } else if (this.cardType.text === 'บัตรประชาชน') {
        idCardNum = this.cardId1
        // console.log(this.cardId1)
        // console.log('บัตรประชาชน')
      }
      return idCardNum
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
    setSearch () {
      var search1 = ''
      if (this.search.text === 'บัตรประชาชน/หนังสือเดินทาง') {
        search1 = this.searchCardId
        // console.log(this.passportNo)
        // console.log('passportNo')
      } else if (this.search.text === 'ชื่อ-นามสกุล') {
        search1 = this.searchFullname
        // console.log(this.cardId1)
        // console.log('บัตรประชาชน')
      }
      return search1
    },
    typeSearch () {
      var typeSearch1 = ''
      if (this.search.text === 'บัตรประชาชน/หนังสือเดินทาง') {
        typeSearch1 = 'id'
        return typeSearch1
        // console.log(this.passportNo)
        // console.log('passportNo')
      } else if (this.search.text === 'ชื่อ-นามสกุล') {
        typeSearch1 = 'name'
        return typeSearch1
        // console.log(this.cardId1)
        // console.log('บัตรประชาชน')
      }
    },
    clearDataOld () {
      this.restorationId = []
      this.topic = ''
      this.description = ''
      this.type = []
      this.memberId = []
      this.searchFullname = ''
      this.searchCardId = ''
      this.dentistId = ''
      this.itemsDentist = ''
      this.selectedUser = false
      this.timeAppoint = null
    },
    clearDataNew () {
      this.restorationId = []
      this.topic = ''
      this.description = ''
      this.type = []
      this.dentistId = ''
      this.itemsDentist = ''
      this.prefixNameEN = ''
      this.firstNameEN = ''
      this.lastNameEN = ''
      this.birthDay = ''
      this.phoneNumber = ''
      this.prefixNameTHNew = ''
      this.firstNameTHNew = ''
      this.lastNameTHNew = ''
      this.passportNo = ''
      this.cardId1 = ''
      this.timeAppoint = null
    },
    searchInput () {
      var textSource = {
        placeId: '1',
        typeMember: 'member',
        typeSearch: this.typeSearch(),
        textSearch: this.setSearch()
      }
      this.axios.post(process.env.API + '/getMemberListByKeyword', { Source: textSource }).then((response) => {
        // console.log('เข้าค้นหา')
        // console.log(this.search.text)
        // console.log(textSource)
        // console.log(response.data.Status)
        if (response.data.Status === 'Success') {
          if (response.data.Result !== 'No Data') {
            this.memberItems = response.data.Result
            for (var i = 0; i < this.memberItems.length; i++) {
              var receiveProfileImage = this.memberItems[i].profileImage
              var receiveMemberID = this.memberItems[i].memberId
              this.getProfileImg(receiveProfileImage, receiveMemberID)
            }
            this.searchMember = true
          } else {
            this.$swal('ไม่พบข้อมูล', 'กรุณาลองใหม่อีกครั้ง หรือติดต่อเจ้าหน้าที่', 'warning')
          }
          // this.firstNameTHInput = response.data.Result.firstNameTH
          // console.log(this.memberItems)
          // console.log('fitstname')
          // console.log('ผ่านค้นหา')
        } else {
          // console.log('ไม่ผ่านค้นหา')
          this.$swal('ไม่พบข้อมูล', 'กรุณาลองใหม่อีกครั้ง หรือติดต่อเจ้าหน้าที่', 'warning')
        }
      })
    },
    addAppointmentold () {
      var textSource = {
        restorationId: [this.restorationId.toString()],
        topic: this.topic,
        type: this.type,
        description: this.description,
        info: {
          memberId: this.selected.memberId
        },
        dentistId: this.receiveDentistId.toString(),
        dateAppoint: this.receiveDateAppoint,
        timeAppoint: this.timeAppoint
      }
      this.axios.post(process.env.API + '/addAppoint', { Source: textSource }).then((response) => {
        // console.log(response.data.Status)
        // console.log('เข้า')
        // console.log(textSource)
        if (response.data.Status === 'Success') {
          this.addAppointo = response.data.Result
          this.checkStatus = true
          this.$emit('checkStatus', this.checkStatus)
          this.$swal({
            title: 'บันทึกการนัดหมายสำเร็จ',
            text: '',
            type: 'success'
          })
          // console.log('textSource', textSource)
          // console.log('ผ่าน')
          this.clearDataOld()
          this.popup = false
        } else {
          // console.log('ไม่ผ่าน')
          this.$swal('บันทึกการนัดหมายไม่สำเร็จ', 'กรุณาลองใหม่อีกครั้ง หรือ ติดต่อเจ้าหน้าที่', 'error')
          // console.log('ผ่าน')
        }
      })
    },
    addAppointmentnew () {
      var textSource = {
        restorationId: [this.restorationId.toString()],
        topic: this.topic,
        description: this.description,
        type: this.type,
        info: {
          prefixNameTH: this.prefixNameTHNew,
          firstNameTH: this.firstNameTHNew,
          lastNameTH: this.lastNameTHNew,
          prefixNameEN: this.prefixNameEN,
          firstNameEN: this.firstNameEN,
          lastNameEN: this.lastNameEN,
          birthDay: this.birthDay,
          phoneNumber: this.phoneNumber,
          cardType: this.cardType.text,
          cardId: this.setCardId()
        },
        dentistId: this.receiveDentistId.toString(),
        dateAppoint: this.receiveDateAppoint,
        timeAppoint: this.timeAppoint
      }
      this.axios.post(process.env.API + '/addAppoint', { Source: textSource }).then((response) => {
        // console.log(response.data.Status)
        // console.log('เข้า')
        // console.log(textSource)
        if (response.data.Status === 'Success') {
          this.addAppointn = response.data.Result
          this.checkStatus = true
          this.$emit('checkStatus', this.checkStatus)
          this.$swal({
            title: 'บันทึกการนัดหมายสำเร็จ',
            text: '',
            type: 'success'
          })
          this.clearDataNew()
          this.popup = false
        } else {
          this.$swal('บันทึกการนัดหมายไม่สำเร็จ', 'กรุณาลองใหม่อีกครั้ง หรือ ติดต่อเจ้าหน้าที่', 'error')
          // console.log('ไม่ผ่าน')
        }
      })
    },
    saveData () {
      this.$swal({
        title: 'บันทึกข้อมูลแล้ว',
        text: '',
        type: 'success'
      })
      this.popup = false
      window.location.reload()
    },
    // saveReceive (item) {
    //   this.receiveItem = item
    // },
    getRestoration () {
      this.axios.post(process.env.API + '/getRestorationList').then((response) => {
        // console.log('restorationNameTH', response.data.Result)
        if (response.data.Status === 'Success') {
          this.itemsRestoration = response.data.Result
        }
      })
    },
    getItemsDentist () {
      var textSource = {
        placeId: 1
      }
      this.axios.post(process.env.API + '/getDentistListByPlaceId', { Source: textSource }).then((response) => {
        // console.log(response.data)
        if (response.data.Status === 'Success') {
          this.itemsDentist = response.data.Result
        }
      })
    },
    save (birthDay) {
      this.$refs.menu3.save(birthDay)
    },
    getItemsUser () {
      this.axios.post(process.env.API + '/getMemberList').then((response) => {
        // console.log(response.data)
        if (response.data.Status === 'Success') {
          this.itemsUser = response.data.Result
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
