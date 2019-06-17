<template lang="html">
  <v-container>
    <v-layout row wrap>
      <v-dialog v-model="modal" persistent max-width="1100px">
        <v-card>
          <div class="text-xs-right"><button @click="modal = false"><v-icon color="black">close</v-icon></button></div>
          <v-container grid-list-md class="pt-0 pb-2">
            <v-card-title class="py-0 pl-4">
              <b class="display-1 primary--text">เลือกรายชื่อที่ต้องการ</b>
            </v-card-title>
            <v-card-text class="pt-0">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-radio-group v-model="selected">
                    <v-data-table :headers="headers" :items="itemsMember" hide-actions>
                      <template slot="items" slot-scope="props">
                        <td>{{props.item.memberId}}</td>
                        <td>{{ props.item.prefixNameTH + props.item.firstNameTH + ' ' + props.item.lastNameTH}}</td>
                        <td>{{ formatDate(props.item.birthDay) }}</td>
                        <td>{{ props.item.phoneNumber }}</td>
                        <td><v-radio :value="props.item"></v-radio></td>
                      </template>
                    </v-data-table>
                  </v-radio-group>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 pa-0 text-xs-right>
                  <v-btn large flat @click="modal = false">ปิด</v-btn>
                  <v-btn large color="primary" @click="submit()" :disabled="selected === ''">เลือก</v-btn>
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
      modal: false,
      selected: '',
      headers: [
        { text: 'รหัสสมาชิก', sortable: false },
        { text: 'ชื่อ - สกุล', sortable: false },
        { text: 'วันเกิด', sortable: false },
        { text: 'เบอร์ติดต่อ', sortable: false },
        { text: '', sortable: false }
      ],
      itemsMember: []
    }
  },
  methods: {
    open (item) {
      this.modal = true
      this.itemsMember = item
      // console.log(this.itemsMember)
    },
    submit () {
      this.$emit('selected', this.selected)
      this.modal = false
    },
    formatDate (date) {
      if (!date) {
        return null
      }
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    }
  }
}
</script>

<style lang="css" scoped>
</style>
