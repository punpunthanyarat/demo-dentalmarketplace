<template lang="html">
  <div class="">
    <v-layout row justify-center>
      <v-dialog v-model="modalEdit" persistent max-width="740px">
        <v-card>
          <v-card-title>
            <b class="display-1">แก้ไขข้อมูลบริการ (หัตถการ)</b>
            <v-spacer></v-spacer>
            <p class="text-xs-right"><button @click="modalEdit = false"><v-icon color="black">close</v-icon></button></p>
          </v-card-title>
          <v-container grid-list-xl fill-height>
            <v-layout wrap align-center>
              <v-flex xs12 sm6>
                <header v-text="'ชื่อการให้บริการใหม่ :'"></header>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field v-model="restorationName" label="ชื่อการให้บริการ" :rules="itemRules.restorationNameRules"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <header v-text="'ราคาใหม่ (บาท) :'"></header>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field :prefix="currency" v-model="initialBalanceFormatted" label="ราคา" :rules="itemRules.priceRules"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <header v-text="'เวลาใหม่ (นาที) :'"></header>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="timeNumber" type="number" label="เวลา" mask="##" :rules="itemRules.timeRules"></v-text-field>
                <!-- <input id="number" type="number" value="42"> -->
              </v-flex>
              <!-- <v-flex xs12 sm6 md3>
                <h4>({{ parseInt((timeNumber * 20)/60) }} ชั่วโมง {{ (timeNumber * 20)%60 }} นาที)</h4>
              </v-flex> -->
              <v-flex xs12 sm6 md6>
                <header v-text="'หน่วยใหม่ :'"></header>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="unitName" label="หน่วย" :rules="itemRules.unitRules"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-layout row wrap mb-4 mr-4>
              <v-spacer></v-spacer>
              <v-btn color="primary" large @click.native="editRestoration()"><v-icon>edit</v-icon>แก้ไขข้อมูลบริการ</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      modalEdit: false,
      restorationName: '',
      timeNumber: 0,
      currency: '฿',
      unitName: '',
      disabled: false,
      initialBalance: null,
      restorationId: '',
      itemRules: {
        restorationNameRules: [
          v => !!v || 'กรุณาระบุชื่อการให้บริการ',
          v => /^[ก-๙]+$/.test(v) || 'กรุณาระบุข้อมูลเป็นภาษาไทย'
        ],
        timeRules: [
          v => !!v || 'กรุณาระบุจำนวนนาที',
          v => /^([0-9])+$/.test(v) || 'กรุณาใส่จำนวนนาที'
        ],
        priceRules: [
          v => !!v || 'กรุณาระบุราคา',
          v => /^([0-9])+$/.test(v) || 'กรุณากรอกตัวเลข'
        ],
        unitRules: [
          v => !!v || 'กรุณาระบุหน่วย',
          v => /^[ก-๙]+$/.test(v) || 'กรุณาระบุข้อมูลเป็นภาษาไทย'
        ]
      },
      restorationActive: ''
    }
  },
  computed: {
    initialBalanceFormatted: {
      get: function () {
        return this.formatAsCurrency(this.initialBalance, 0)
      },
      set: function (newValue) {
        this.initialBalance = Number(newValue.replace(/[^0-9]/g, ''))
      }
    }
  },
  methods: {
    open (id, active) {
      this.restorationId = id
      this.restorationActive = active
      this.modalEdit = true
      // console.log('restorationId', this.restorationId)
    },
    editRestoration () {
      var textSource = {
        functionType: 'editFull',
        placeId: 1,
        restorationId: this.restorationId,
        restorationName: this.restorationName,
        restorationPrice: this.initialBalanceFormatted,
        restorationTimeTreatment: this.timeNumber,
        restorationUnit: this.unitName,
        restorationActive: this.restorationActive
      }
      // console.log('textSource', textSource)
      this.axios.post(process.env.API + '/editRestoration', { Source: textSource }).then((response) => {
        if (response.data.Status === 'Success') {
          this.$emit('checkStatus')
          this.saveData()
        } else {
          // console.log('ไม่ผ่านนนน')
        }
      })
    },
    saveData () {
      this.$swal({
        title: 'แก้ไขข้อมูสำเร็จ',
        text: '',
        type: 'success'
      })
      this.modalEdit = false
    },
    formatAsCurrency (value, dec) {
      dec = dec || 0
      if (value === null) {
        return 0
      }
      return '' + value.toFixed(dec).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
    }
  }
}
</script>

<style lang="css" scoped>
.selectPermission .list__tile__action {
  min-width: 30px !important;
}
</style>
