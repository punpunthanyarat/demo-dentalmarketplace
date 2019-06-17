<template lang="html">
  <v-container xs12 md12 py-0>
    <v-dialog v-model="modalEdit" persistent max-width="1100px">
      <v-card>
        <div class="text-xs-right"><button @click="modalEdit = false"><v-icon color="black">close</v-icon></button></div>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container grid-list-md class="pt-0 pb-2">
            <v-card-title class="py-0">
              <b class="display-1 primary--text">แก้ไขสิทธิ์การเข้าถึง</b>
            </v-card-title>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12 class="grey lighten-4 px-4 mx-1">
                  <v-layout row wrap>
                    <v-flex xs12 sm2><h3 class="center-y">ตำแหน่ง</h3></v-flex>
                    <v-flex xs12 sm10><v-text-field v-model="positionName" label="ระบุชื่อตำแหน่ง" :rules="itemRules.empty" readonly single-line required></v-text-field></v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout row wrap class="selectPermission mx-1">
                <v-flex xs12 mt-3><h3>กำหนดสิทธิ์</h3></v-flex>
                <v-flex xs12 md6 v-for="item in itemsPermission" :key="item.id">
                  <v-list subheader class="">
                    <b class="grey--text">{{item.module}}</b>
                    <v-list-tile v-for="perm in item.permissions" :key="perm.id">
                      <v-list-tile-action><v-checkbox v-model="perm.active"></v-checkbox></v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>{{perm.name}}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 pa-0 pt-2 text-xs-right>
                  <v-btn large color="primary" @click="submit" :disabled="!valid">แก้ไข</v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
// import _ from 'lodash'
export default {
  data () {
    return {
      placeId: '',
      modalEdit: false,
      valid: true,
      itemRules: {
        empty: [ v => !!v || 'กรุณาระบุข้อมูล' ]
      },
      positionId: '',
      positionName: '',
      itemsPermission: []
    }
  },
  created () {
    this.placeId = 1
  },
  methods: {
    submit () {
      var textSource = {
        placeId: this.placeId,
        positionId: this.positionId,
        itemsPermission: this.itemsPermission
      }
      this.axios.post(process.env.API + '/editPermission', { Source: textSource }).then((response) => {
        // console.log(response.data)
        if (response.data.Status === 'Success') {
          this.$swal(response.data.Result.textAlert, '', 'success')
          this.$emit('status', response.data.Status)
        } else if (response.data.Status === 'Fail') {
          this.$swal(response.data.Result.textAlert, response.data.Result.case, 'error')
        } else {
          this.$swal('ข้อมูลขัดข้องบางประการ', 'กรุณาลองใหม่อีกครั้ง หรือติดต่อเจ้าหน้าที่', 'warning')
        }
      })
    },
    open (item) {
      this.modalEdit = true
      this.positionId = item.positionId
      this.positionName = item.positionName
      this.itemsPermission = item.itemsPermission
    },
    hide () {
      this.modalEdit = false
    }
  }
}
</script>

<style lang="css" scoped>
.selectPermission .list__tile__action {
  min-width: 30px !important;
}
</style>
