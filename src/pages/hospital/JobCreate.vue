<template lang="html">
  <v-container pa-4>
    <v-layout row wrap>
      <v-flex xs12 mb-2>
        <b class="display-1">บันทึกการนัดหมาย</b>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="pt-2 px-3 pb-3">
          <v-form ref="form" lazy-validation>
            <v-container grid-list-lg>
              <v-layout row wrap>
                <v-flex xs12 md3 py-0 mt-3 class="hidden-sm-and-down"><span class="title">หัวข้อการติดต่อ</span></v-flex>
                <v-flex xs12 md9 py-0>
                  <v-text-field v-model="topic" label="หัวข้อการติดต่อ" :rules="itemRules.empty" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 md3 py-0 mt-3 class="hidden-sm-and-down"><span class="title">ผู้ติดต่อ (คนไข้)</span></v-flex>
                <v-flex xs12 md9 py-0>
                  <v-select autocomplete v-model="patient" :items="itemsPatient" label="ผู้ติดต่อ (คนไข้)" :rules="itemRules.empty" item-text="name" item-value="username" max-height="auto" required>
                    <template slot="item" slot-scope="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content v-text="data.item"></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-avatar><img :src="data.item.avatar !== '' ? getProfileImg(data.item.username, data.item.avatar) : image"></v-list-tile-avatar>
                        <v-list-tile-content>
                          <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 md3 py-0 mt-3 class="hidden-sm-and-down"><span class="title">ทันตแพทย์เจ้าของไข้</span></v-flex>
                <v-flex xs12 md9 py-0>
                  <v-select autocomplete v-model="dentist" :items="itemsDentist" label="ทันตแพทย์เจ้าของไข้" :rules="itemRules.empty" item-text="name" item-value="username" max-height="auto" required>
                    <template slot="item" slot-scope="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content v-text="data.item"></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-avatar><img :src="data.item.avatar !== '' ? getProfileImg(data.item.username, data.item.avatar) : image"></v-list-tile-avatar>
                        <v-list-tile-content>
                          <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                          <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 md3 py-0 mt-3 class="hidden-sm-and-down"><span class="title">วันเวลาที่นัดหมาย</span></v-flex>
                <v-flex xs12 md5 py-0>
                  <v-menu v-model="menu_date" ref="menu_date" :close-on-content-click="false" :nudge-right="40" min-width="290px" transition="scale-transition" offset-y full-width lazy>
                    <v-text-field v-model="date" label="วันที่นัดหมาย" slot="activator" append-icon="event" readonly required :rules="itemRules.empty"></v-text-field>
                    <v-date-picker v-model="date" locale="th" @change="saveDate"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 md4 py-0>
                  <v-menu v-model="menu_time" ref="menu_time" :close-on-content-click="false" :nudge-right="40" :return-value.sync="time" min-width="290px" transition="scale-transition" offset-y full-width lazy>
                    <v-text-field v-model="time" label="เวลาที่นัดหมาย" slot="activator" append-icon="access_time" readonly required :rules="itemRules.empty"></v-text-field>
                    <v-time-picker v-model="time" @change="saveTime"></v-time-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
    <div class="pt-3 w-100">
      <v-btn large color="primary" class="right btn-submit" @click="submit">บันทึกข้อมูล</v-btn>
      <!-- <v-btn large flat class="right" @click="">ล้างข้อมูล</v-btn> -->
    </div>
    <Loading ref="loading"/>
  </v-container>
</template>

<script>
import { Encode, Decode } from '@/services'
import Loading from '@/components/Loading'
export default {
  components: {
    Encode,
    Decode,
    Loading
  },
  created () {
    this.getItemsPatient()
    this.getItemsDentist()
  },
  data () {
    return {
      menu_date: false,
      menu_time: false,
      itemRules: {
        empty: [v => !!v || 'กรุณาระบุข้อมูล']
      },
      image: '/static/img/main/person.jpg',
      topic: '',
      patient: '',
      dentist: '',
      date: null,
      time: null,
      itemsPatient: [],
      itemsDentist: []
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
      if (this.$refs.form.validate()) {
        var textSource = '{"topic": "' + this.topic + '","created_by": "admin", "patient": "' + this.patient + '", "dentist": "' + this.dentist + '", "date": "' + this.date + '", "time": "' + this.time + '"}'
        var source = this.reverse(btoa(unescape(encodeURIComponent(textSource)))) + this.randomString(5)
        this.axios.post(process.env.API + '/createJob', { source: source }).then((response) => {
          if (response.data === 'success') {
            this.$swal('บันทึกข้อมูลสำเร็จ', '', 'success')
            this.clearData()
          } else {
            this.$swal('ไม่สามารถบันทึกข้อมูลได้', 'กรุณาลองใหม่อีกครั้ง หรือ ติดต่อเจ้าหน้าที่', 'error')
          }
        })
      }
    },
    getItemsPatient () {
      this.axios.post(process.env.API + '/getPatientList').then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        this.itemsPatient = result
      })
    },
    getItemsDentist () {
      this.axios.post(process.env.API + '/getDentistList').then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        this.itemsDentist = result
      })
    },
    getProfileImg (username, filename) {
      return process.env.API + '/getProfileImg/' + username + '/' + filename
    },
    clearData () {
      this.topic = ''
      this.patient = ''
      this.dentist = ''
      this.date = null
      this.time = null
    },
    saveDate (date) {
      this.$refs.menu_date.save(date)
    },
    saveTime (time) {
      this.$refs.menu_time.save(time)
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

<style lang="css" scoped>
</style>
