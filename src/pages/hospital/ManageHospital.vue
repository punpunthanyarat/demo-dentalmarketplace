<template lang="html">
  <v-container pa-4>
    <v-layout row wrap>
      <v-flex xs8 md10>
        <h1 class="display-1 mb-4">จัดการข้อมูลที่เกี่ยวข้อง</h1>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-container>
            <!-- <pre>{{showInformationPlaceItems}}</pre> -->
            <v-layout row wrap>
              <v-flex xs12 sm4 md2>
                <v-layout row wrap>
                  <v-flex xs8 offset-xs2 v-for=" Image in showInformationPlaceItems" :key="Image.placeLogo">
                    <img :src="showLogoPlace(Image.placeLogo)" class="w-100 pa-0"/>
                  </v-flex>
                  <v-flex xs8 offset-xs2 class="center-x">
                    <v-btn outline color="primary" class="myLabel w-100 ma-0" @click="">
                      <input type="file" @change="onFileChange"/>
                      <v-icon color="primary">add_photo_alternate</v-icon> เปลี่ยนรูป
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm8 md10>
                <v-container grid-list-lg class="grey lighten-5" v-for="item1 in showInformationPlaceItems" :key="item1.placeId">
                  <v-layout row wrap>
                    <v-flex xs12 md10 py-0 mt-3>
                      <div v-show="!isEditingHospitalName">
                        <h1 class="display-1">{{ item1.placeName }}</h1>
                      </div>
                      <div v-show="isEditingHospitalName">
                        <v-text-field v-model="hospitalName" :disabled ="!isEditingHospitalName" @change="EditingHospitalName()"></v-text-field>
                      </div>
                    </v-flex>
                    <!-- @change="EditingHospitalName()" -->
                    <v-flex text-xs-right xs12 md2>
                      <v-btn fab small color="primary" v-show="!isEditingHospitalName" @click="isEditingHospitalName = !isEditingHospitalName">
                        <v-icon v-if="!isEditingHospitalName">edit</v-icon>
                      </v-btn>
                    </v-flex>
                    <v-flex xs10>
                      <div v-show="isEditingAddress">
                        <v-text-field v-model="hospitalAddress" color="blue darken-4" multi-line :disabled ="!isEditingAddress" @change="EditingHospitalAdress()"></v-text-field>
                      </div>
                        <div v-show="!isEditingAddress" slot="label">
                          {{ item1.placeAddress }}
                        </div>
                    </v-flex>
                    <v-flex text-xs-right xs12 md2>
                      <v-btn fab small color="primary" v-show="!isEditingAddress" @click="isEditingAddress = !isEditingAddress">
                        <v-icon v-if="!isEditingAddress">edit</v-icon>
                      </v-btn>
                    </v-flex>
                    <!-- <v-flex xs10>
                      <div v-show="!isEditingAddress">
                        <a href="https://goo.gl/maps/g25PonYKfg22" target="_blank" disabled>
                          6 ซอย โยธี แขวง ทุ่งพญาไท เขต ราชเทวี กรุงเทพมหานคร 10400
                        </a>
                      </div>
                      <div v-show="isEditingAddress">
                        <v-text-field placeholder="https://www.example.com"></v-text-field>
                      </div>
                    </v-flex> -->
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
            <v-layout row wrap class="mt-5">
              <v-flex xs9>
                <h2 class="text-xs-left">วันเวลาที่ทำงาน</h2>
              </v-flex>
              <v-flex xs2>
                <v-btn color="primary" @click="showTime = !showTime">
                  <v-icon left dark>alarm</v-icon>
                  เปลี่ยนแปลงเวลาทำการ
                </v-btn>
              </v-flex>
              <!-- <pre>{{showInformationPlaceItems}}</pre> -->
              <v-flex xs12>
                <v-data-table v-if="showTime" :headers="headersprofile" v-for="item1 in showInformationPlaceItems":items="item1.placeWorkTime" :key="item1.placeId" hide-actions>
                  <template slot="items" slot-scope="props">
                    <td class="text-xs-center">{{ props.item.day }}</td>
                    <td class="text-xs-center">{{ props.item.timeStart }}</td>
                    <td class="text-xs-center">{{ props.item.timeEnd }}</td>
                    <td class="text-xs-center">
                      <toggle-button id="changed-font" @change="editActive(props.item.id, props.item.active)" :value="props.item.active" :width="80" :height="30" :speed="480" :labels="{checked: 'ON', unchecked: 'OFF'}"/>
                    </td>
                  </template>
                </v-data-table>
                <v-data-table v-else :headers="editHeadersprofile" v-for="item1 in showInformationPlaceItems":items="item1.placeWorkTime" :key="item1.placeId" hide-actions>
                  <template slot="items" slot-scope="props">
                    <td class="text-xs-center">{{ props.item.day }}</td>
                    <td class="text-xs-center">
                      <v-text-field v-model="props.item.timeStart"  @change="EditTimeStart(props.item.id, props.item.timeStart)" label="HH:MM" append-icon="schedule"  :rules="!props.item.active ? itemRules.clear : itemRules.time" single-line return-masked-value mask="##:##" :disabled="!props.item.active"></v-text-field>
                    </td>
                    <td class="text-xs-center">
                        <v-text-field v-model="props.item.timeEnd"  @change="EditTimeEnd(props.item.id, props.item.timeEnd)" label="HH:MM" append-icon="schedule"  :rules="!props.item.active ? itemRules.clear : itemRules.time" single-line return-masked-value mask="##:##" :disabled="!props.item.active"></v-text-field>
                    </td>
                    <td class="text-xs-center">
                      <toggle-button id="changed-font" @change="editActive(props.item.id, props.item.active)" :value="props.item.active" :width="80" :height="30" :speed="480" :labels="{checked: 'ON', unchecked: 'OFF'}"/>
                    </td>
                  </template>
                </v-data-table>
                <v-layout row wrap>
                  <v-spacer></v-spacer>
                  <v-flex xs2 pt-3>
                    <v-btn v-show="!showTime" @click="saveData()" color="primary"><v-icon>add</v-icon>บันทึกข้อมูล</v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-card class="mt-5">
      <v-container grid-list-lg v-for="item1 in showInformationPlaceItems" :key="item1.placeId">
        <v-layout row wrap>
          <v-flex xs12 md10>
            <h1 class="display-1">เกี่ยวกับเรา</h1>
          </v-flex>
          <v-flex text-xs-right xs12 md2>
            <v-btn fab small color="primary" v-show="!isEditTextBox" @click="isEditTextBox = !isEditTextBox">
              <v-icon v-if="!isEditTextBox">edit</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <div>
          <v-flex xs12>
            <v-text-field v-show="!isEditTextBox" v-model="item1.placeAbout" :disabled="!isEditTextBox" color="blue darken-4" multi-line></v-text-field>
          </v-flex>
        </div>
        <div>
          <!-- <v-text-field v-model="about" v-show="isEditTextBox" @keyup.enter="EditingAbout()"></v-text-field> -->
          <v-layout row wrap>
            <v-flex xs12>
              <ckeditor v-show="isEditTextBox" v-model="about" :config="config" @blur="onBlur($event)" @focus="onFocus($event)"></ckeditor>
            </v-flex>
            <v-flex xs12>
              <v-layout row wrap>
                <v-spacer></v-spacer>
                <v-flex xs2>
                  <v-btn v-show="isEditTextBox" @click="EditingAbout()" color="primary"><v-icon>add</v-icon>บันทึกข้อมูล</v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </div>
      </v-container>
    </v-card>
    <Loading ref="loading"/>
    <ModalAddProfileImg ref="addProfileImg" @profileImg="setEmitProfileImg" @profileImgShow="setEmitProfileImgShow"/>
  </v-container>
</template>

<script src="/path/to/ckeditor.js"></script>
<script>
import Ckeditor from 'vue-ckeditor2'
import ModalAddProfileImg from '@/components/center/Home/Modal/ModalAddProfileImg'
import Loading from '@/components/Loading'
export default {
  components: {
    ModalAddProfileImg, Loading, Ckeditor
  },
  data () {
    return {
      placeId: '',
      menu: false,
      isEditingHospitalName: null,
      isEditingAddress: null,
      showTime: true,
      isEditTextBox: null,
      hospitalName: '',
      hospitalTimeStart: '',
      logo: '',
      timeStart: '',
      timeEnd: '',
      editTimeStartItems: [],
      editTimeEndItems: [],
      about: '',
      dataProfileImg: '',
      config: {
        toolbar: [
          [ 'Undo', 'Redo', '-', 'Bold', 'Italic', 'Underline', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-' ]
        ],
        autoParagraph: false,
        allowedContent: true,
        removePlugins: 'elementspath',
        height: 300
      },
      search: new Date().toISOString().slice(0, 10),
      pagination: {},
      showInformationPlaceItems: [],
      hospitalAddress: '',
      image: '/static/img/icons/drawer_icon.png',
      headersprofile: [
        { text: 'วัน', align: 'center', sortable: false },
        { text: 'เวลาเปิด', align: 'center', sortable: false },
        { text: 'เวลาปิด', align: 'center', sortable: false },
        { text: 'สถานะ', align: 'center', sortable: false }
      ],
      editHeadersprofile: [
        { text: 'วัน', align: 'center', sortable: false },
        { text: 'เวลาเปิดใหม่', align: 'center', sortable: false },
        { text: 'เวลาปิดใหม่', align: 'center', sortable: false },
        { text: 'สถานะ', align: 'center', sortable: false }
      ],
      itemRules: {
        clear: [],
        empty: [v => !!v || 'กรุณาระบุข้อมูล'],
        time: [
          v => !!v || 'กรุณาระบุเวลา',
          v => (v.length === 5) || 'ไม่ถูกรูปแบบของเวลา',
          v => (v.substr(0, 2) > -1 && v.substr(0, 2) < 24) || 'กรุณาระบุข้อมูลระหว่าง 00 - 23',
          v => (v.substr(3, 5) > -1 && v.substr(3, 5) < 60) || 'กรุณาระบุข้อมูลระหว่าง 00 - 59',
          v => (v.substr(3, 5) === '00' || v.substr(3, 5) === '20' || v.substr(3, 5) === '40') || 'กรุณาระบุในรูปแบบ 00 20 หรือ 40 นาที เพื่อความสอดคล้องกับปฏิทิน'
        ]
      }
    }
  },
  created () {
    this.placeId = 1
    this.dataProfileImg = new FormData()
    this.showInformationPlace()
  },
  methods: {
    EditTimeStart (id, timeStart) {
      var textSource = {
        functionType: 'timeStart',
        placeId: 1,
        placeWorkTime: {
          id: id,
          timeStart: timeStart
        }
      }
      this.axios.post(process.env.API + '/editInformationPlace', { Source: textSource }).then((response) => {
        if (response.data.Status === 'Success') {
        } else {
          // console.log('ไม่ผ่าน')
        }
      })
    },
    EditTimeEnd (id, timeEnd) {
      var textSource = {
        functionType: 'timeEnd',
        placeId: 1,
        placeWorkTime: {
          id: id,
          timeEnd: timeEnd
        }
      }
      this.axios.post(process.env.API + '/editInformationPlace', { Source: textSource }).then((response) => {
        if (response.data.Status === 'Success') {
        } else {
          // console.log('ไม่ผ่าน')
        }
      })
    },
    saveData () {
      this.showTime = !this.showTime
      this.showInformationPlace()
    },
    editActive (id, active) {
      if (active === 1) {
        var textSourceTrue = {
          functionType: 'active',
          placeId: 1,
          placeWorkTime: {
            id: id,
            active: 0
          }
        }
        this.axios.post(process.env.API + '/editInformationPlace', { Source: textSourceTrue }).then((response) => {
          if (response.data.Status === 'Success') {
            this.showInformationPlace()
          } else {
            // console.log('ไม่ผ่าน')
          }
        })
      } else if (active === 0) {
        var textSourceFalse = {
          functionType: 'active',
          placeId: 1,
          placeWorkTime: {
            id: id,
            active: 1
          }
        }
        this.axios.post(process.env.API + '/editInformationPlace', { Source: textSourceFalse }).then((response) => {
          if (response.data.Status === 'Success') {
            this.showInformationPlace()
          } else {
            // console.log('ไม่ผ่าน')
          }
        })
      }
    },
    EditingHospitalName () {
      var textSource = {
        functionType: 'placeName',
        placeId: 1,
        placeName: this.hospitalName
      }
      this.axios.post(process.env.API + '/editInformationPlace', { Source: textSource }).then((response) => {
        if (response.data.Status === 'Success') {
          this.isEditingHospitalName = !this.isEditingHospitalName
          this.showInformationPlace()
        } else {
          // console.log('ไม่ผ่าน')
        }
      })
    },
    EditingHospitalAdress () {
      // console.log('pass')
      var textSource = {
        functionType: 'placeAddress',
        placeId: 1,
        placeAddress: this.hospitalAddress
      }
      this.axios.post(process.env.API + '/editInformationPlace', { Source: textSource }).then((response) => {
        if (response.data.Status === 'Success') {
          this.isEditingAddress = !this.isEditingAddress
          this.showInformationPlace()
        } else {
          // console.log('ไม่ผ่าน')
        }
      })
    },
    EditingAbout () {
      var textSource = {
        functionType: 'placeAbout',
        placeId: 1,
        placeAbout: this.about
      }
      this.axios.post(process.env.API + '/editInformationPlace', { Source: textSource }).then((response) => {
        if (response.data.Status === 'Success') {
          this.isEditTextBox = !this.isEditTextBox
          this.showInformationPlace()
        } else {
          // console.log('ไม่ผ่าน')
        }
      })
    },
    showInformationPlace () {
      var textSource = {
        placeId: 1
      }
      this.axios.post(process.env.API + '/showInformationPlace', { Source: textSource }).then((response) => {
        if (response.data.Status === 'Success') {
          this.showInformationPlaceItems = response.data.Result
        } else {
          // console.log('ไม่ผ่าน')
        }
      })
    },
    showLogoPlace (placeLogo) {
      var Logo = placeLogo
      if (Logo === '') {
        return this.image
      } else {
        return process.env.API + '/getLogoPlace' + '/' + this.placeId + '/' + placeLogo
      }
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
      this.dataProfileImg.append('logo', value)
      this.checkEmitProfileImg()
      this.EditLogo()
    },
    setEmitProfileImgShow (value) {
      this.image = value
      this.checkEmitProfileImg()
      this.EditLogo()
    },
    checkEmitProfileImg () {
      if (this.dataProfileImg.getAll('logo') !== null && this.image !== '/static/img/main/person.jpg') {
        this.$refs.addProfileImg.hide()
      }
    },
    EditLogo () {
      // console.log('this.dataProfileImg', this.dataProfileImg.getAll('logo'))
      this.dataProfileImg.append('placeId', this.placeId)
      // console.log('this.dataProfileImg.appendplace', this.dataProfileImg.getAll('placeId'))
      this.axios.post(process.env.API + '/editLogoPlace', this.dataProfileImg).then((response) => {
        if (response.data === 'Success') {
          // console.log('ผ่านเข้ารูป')
          this.showInformationPlace()
        } else {
          // console.log('ไม่ผ่าน')
        }
      })
      this.dataProfileImg = new FormData()
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
    onBlur (editor) {
      // console.log(editor)
    },
    onFocus (editor) {
      // console.log(editor)
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
