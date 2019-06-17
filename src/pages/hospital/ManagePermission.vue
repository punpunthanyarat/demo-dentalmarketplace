<template lang="html">
  <v-container pa-4>
    <v-layout row wrap>
      <v-flex xs8 md10>
        <h1 class="display-1">การกำหนดสิทธิ์</h1>
      </v-flex>
      <v-flex xs4 md2 text-xs-right mb-4>
        <v-btn color="primary" @click="openInsertPermission()" class="mt-0 mr-0">
          <v-icon>add</v-icon>
          <span class="hidden-xs-only">เพิ่มตำแหน่ง</span>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <!-- <pre>{{listPosition}}</pre> -->
        <v-data-table :headers="headers" :items="listPosition" :pagination.sync="pagination" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ props.index+1 }}</td>
            <td>{{ props.item.positionName }}</td>
            <td>
              <div v-for="item in props.item.itemsPermission" :key="item.id">
                <b class="body-1 grey--text" v-if="checkModuleActive(item.permissions)">{{item.module}}<br/></b>
                <v-chip small v-for="perm in item.permissions" :key="perm.id" v-if="perm.active" class="mt-0 mb-2">
                  <small>{{perm.name}}</small>
                </v-chip>
              </div>
            </td>
            <td class="right"><v-btn icon @click="openEditPermission(props.item)"><v-icon color="grey">edit</v-icon></v-btn></td>
          </template>
        </v-data-table>
        <!-- <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div> -->
      </v-flex>
    </v-layout>
    <InsertPermission ref="insertPermission" @status="hideModalPermission"/>
    <EditPermission ref="editPermission" @status="hideModalPermission"/>
  </v-container>
</template>

<script>
import InsertPermission from '@/components/center/Permission/InsertPermission'
import EditPermission from '@/components/center/Permission/EditPermission'
export default {
  components: {
    InsertPermission, EditPermission
  },
  data () {
    return {
      placeId: 1,
      pagination: {},
      headers: [
        { text: '#', sortable: false },
        { text: 'ตำแหน่ง', sortable: false },
        { text: 'สิทธิ์การเข้าถึง', sortable: false },
        { text: '', sortable: false }
      ],
      listPosition: []
    }
  },
  created () {
    this.placeId = 1
    this.qryShowPositionList()
  },
  // computed: {
  //   pages () {
  //     if (this.pagination.rowsPerPage === null || this.pagination.totalItems === null) {
  //       return 0
  //     }
  //     return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
  //   }
  // },
  methods: {
    qryShowPositionList () {
      var textSource = {
        placeId: this.placeId
      }
      this.axios.post(process.env.API + '/showPositionList', { Source: textSource }).then((response) => {
        // console.log(response.data)
        if (response.data.Status === 'Success') {
          this.listPosition = response.data.Result
        } else if (response.data.Status === 'Fail') {
          this.$swal(response.data.Result.textAlert, response.data.Result.case, 'error')
        } else {
          this.$swal('ข้อมูลขัดข้องบางประการ', 'กรุณาลองใหม่อีกครั้ง หรือติดต่อเจ้าหน้าที่', 'warning')
        }
      })
    },
    checkModuleActive (permissions) {
      for (var i = 0; i < permissions.length; i++) {
        if (permissions[i].active || permissions[i].active === 1) {
          return true
        }
      }
      return false
    },
    hideModalPermission (value) {
      if (value === 'Success') {
        this.$refs.insertPermission.hide()
        this.$refs.editPermission.hide()
        this.qryShowPositionList()
      }
    },
    openInsertPermission () {
      this.$refs.insertPermission.open()
    },
    openEditPermission (item) {
      this.$refs.editPermission.open(item)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
