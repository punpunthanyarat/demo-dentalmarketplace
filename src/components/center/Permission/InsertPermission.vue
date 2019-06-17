<template lang="html">
  <v-container xs12 md12 py-0>
    <v-dialog v-model="modalInsert" persistent max-width="1100px">
      <v-card>
        <div class="text-xs-right"><button @click="modalInsert = false"><v-icon color="black">close</v-icon></button></div>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container grid-list-md class="pt-0 pb-2">
            <v-card-title class="py-0">
              <b class="display-1 primary--text">เพิ่มตำแหน่ง</b>
            </v-card-title>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12 class="grey lighten-4 px-4 mx-1">
                  <v-layout row wrap>
                    <v-flex xs12 sm2><h3 class="center-y">ตำแหน่ง</h3></v-flex>
                    <v-flex xs12 sm10><v-text-field v-model="positionName" label="ระบุชื่อตำแหน่ง" :rules="itemRules.empty" single-line required></v-text-field></v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout row wrap class="selectPermission mx-1">
                <v-flex xs12 mt-3><h3>กำหนดสิทธิ์</h3></v-flex>
                <v-flex xs12>
                  <v-layout row wrap class="px-4">
                    <v-flex xs12 md6 v-for="item in itemsPermission" :key="item.id">
                      <v-list subheader>
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
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 pa-0 pt-2 text-xs-right>
                  <v-btn large color="primary" @click="submit" :disabled="!valid">เพิ่ม</v-btn>
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
      modalInsert: false,
      valid: true,
      itemRules: {
        empty: [ v => !!v || 'กรุณาระบุข้อมูล' ]
      },
      positionName: '',
      itemsPermission: []
    }
  },
  created () {
    this.getPermissionList()
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        var textSource = {
          positionName: this.positionName,
          itemsPermission: this.itemsPermission
        }
        this.axios.post(process.env.API + '/addPermission', { Source: textSource }).then((response) => {
          // console.log(response.data)
          if (response.data.Status === 'Success') {
            this.$swal(response.data.Result.textAlert, '', 'success')
            this.$emit('status', response.data.Status)
            this.clearData()
          } else if (response.data.Status === 'Fail') {
            this.$swal(response.data.Result.textAlert, response.data.Result.case, 'error')
          } else {
            this.$swal('ข้อมูลขัดข้องบางประการ', 'กรุณาลองใหม่อีกครั้ง หรือติดต่อเจ้าหน้าที่', 'warning')
          }
        })
      }
    },
    // removeAvtiveFalse (itemsPermission) {
    //   var itemsPermissionNew = itemsPermission
    //   for (var i = 0; i < itemsPermission.length; i++) {
    //     itemsPermissionNew[i].permissions = _.remove(itemsPermission[i].permissions, function (n) { return n.active === true })
    //   }
    //   return itemsPermissionNew
    // },
    open () {
      this.modalInsert = true
      this.getPermissionList()
    },
    hide () {
      this.modalInsert = false
    },
    getPermissionList () {
      this.axios.post(process.env.API + '/getPermissionList').then((response) => {
        // console.log(response.data)
        if (response.data.Status === 'Success') {
          this.itemsPermission = response.data.Result
        } else if (response.data.Status === 'Fail') {
          this.$swal(response.data.Result.textAlert, response.data.Result.case, 'error')
        } else {
          this.$swal('ข้อมูลขัดข้องบางประการ', 'กรุณาลองใหม่อีกครั้ง หรือติดต่อเจ้าหน้าที่', 'warning')
        }
      })
    },
    clearData () {
      this.positionName = ''
      this.itemsPermission = []
    }
  }
}
</script>

<style lang="css" scoped>
.selectPermission .list__tile__action {
  min-width: 30px !important;
}
</style>
