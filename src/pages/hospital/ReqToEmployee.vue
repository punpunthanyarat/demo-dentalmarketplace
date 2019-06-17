<template lang="html">
  <v-container grid-list-xl>
    <v-layout row wrap class="mb-4">
      <v-flex xs12 sm12 md4>
        <v-card class="changebg hand">
          <v-card-text  @click="filterEmployee('all')">
            <v-layout row wrap>
              <v-flex xs8><h1>บุคลากร</h1></v-flex>
              <v-flex xs4 text-xs-right><h1>{{ numAllDentist + numAllStaff }}</h1></v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs8><span>รอการอนุมัติ</span></v-flex>
              <v-flex xs4 text-xs-right><span text-md-right>{{ numWaitApproveDentist + numWaitApproveStaff }}</span></v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md4>
        <v-card class="changebg hand">
          <v-card-text @click="filterEmployee('dentist')">
            <v-layout row wrap>
              <v-flex xs8><h1>ทันตแพทย์</h1></v-flex>
              <v-flex xs4 text-xs-right><h1>{{ numAllDentist }}</h1></v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs8><span>รอการอนุมัติ</span></v-flex>
              <v-flex xs4 text-xs-right><span text-md-right>{{ numWaitApproveDentist }}</span></v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md4 class="">
        <v-card class="changebg hand" @click.native="">
          <v-card-text @click="filterEmployee('staff')">
            <v-layout row wrap>
              <v-flex xs8><h1>เจ้าหน้าที่</h1></v-flex>
              <v-flex xs4 text-xs-right>
                <h1>{{ numAllStaff }}</h1>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs8><span>รอการอนุมัติ</span></v-flex>
              <v-flex xs4 text-xs-right>
                <span text-md-right>{{ numWaitApproveStaff }}</span>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 class="pb-0">
        <h2 class="display-1">ตารางคำร้องขอเป็นบุคลากร</h2>
      </v-flex>
      <v-flex xs12 md12>
        <v-data-table :headers="headers" :items="filterEmployeeList" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.memberId }}</td>
            <td>{{ props.item.prefixNameTH  }}</td>
            <td>{{ props.item.firstNameTH  }}</td>
            <td>{{ props.item.lastNameTH  }}</td>
            <td>{{ props.item.employeeType }}</td>
            <td class="right">
              <v-btn icon @click="submitEmployeeRequestion(props.item)"><v-icon color= "green">done</v-icon></v-btn>
              <v-btn icon @click="rejectEmployeeRequestion(props.item)"><v-icon color="red">close</v-icon></v-btn>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <ModalSubmitEmployeesRequestion ref="submitEmployeesRequestion" />
    <ModalRejectEmployeesRequestion ref="rejectEmployeesRequestion" />
  </v-container>
</template>


<script>
import _ from 'lodash'
import ModalSubmitEmployeesRequestion from '@/components/hospital/Request/ModalSubmitEmployeesRequestion'
import ModalRejectEmployeesRequestion from '@/components/hospital/Request/ModalRejectEmployeesRequestion'
export default {
  data () {
    return {
      numAllDentist: 0,
      numAllStaff: 0,
      numWaitApproveDentist: 0,
      numWaitApproveStaff: 0,
      headers: [
        { text: 'รหัสสมาชิก', sortable: false },
        { text: 'คำนำหน้า', sortable: false },
        { text: 'ชื่อ', sortable: false },
        { text: 'นามสกุล', sortable: false },
        { text: 'ตำแหน่ง', sortable: false },
        { text: '', sortable: false }
      ],
      requestEmployeeList: [],
      filterEmployeeList: []
    }
  },
  components: {
    ModalSubmitEmployeesRequestion, ModalRejectEmployeesRequestion
  },
  created () {
    this.showEmployeeRequestion()
    this.countEmployee()
  },
  methods: {
    filterEmployee (type) {
      if (type === 'all') {
        this.filterEmployeeList = this.requestEmployeeList
      } else {
        this.filterEmployeeList = _.filter(this.requestEmployeeList, function (o) { return o.employeeType === type })
      }
    },
    countEmployee () {
      var textSource = { placeId: 1 }
      this.axios.post(process.env.API + '/getCountEmployee', { Source: textSource }).then((response) => {
        // console.log(response.data)
        if (response.data.Status === 'Success') {
          this.numAllDentist = response.data.Result.numberAllDentist
          this.numAllStaff = response.data.Result.numberAllStaff
          this.numWaitApproveDentist = response.data.Result.numberWaitApproveDentist
          this.numWaitApproveStaff = response.data.Result.numberWaitApproveStaff
        }
      })
    },
    showEmployeeRequestion () {
      var textSource = { placeId: 1 }
      this.axios.post(process.env.API + '/showEmployeeRequestion', { Source: textSource }).then((response) => {
        // console.log(response.data)
        if (response.data.Status === 'Success') {
          this.requestEmployeeList = response.data.Result
          this.filterEmployeeList = response.data.Result
        }
      })
    },
    submitEmployeeRequestion (item) {
      this.$refs.submitEmployeesRequestion.openSubmit(item)
    },
    rejectEmployeeRequestion (item) {
      this.$refs.rejectEmployeesRequestion.openReject(item)
    }
  }
}
</script>

<style lang="css" scoped>
.changebg:hover {
  background-color: #27417A;
  color: white;
}
.redsts {
  margin-bottom: 0px;
  color: #d42929;
  text-align: center;
}
.greensts {
  margin-bottom: 0px;
  color: green;
  text-align: center;
}
</style>
