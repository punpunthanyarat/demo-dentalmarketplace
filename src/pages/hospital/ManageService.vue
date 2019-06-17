<template lang="html">
  <v-container pa-4>
    <v-layout row wrap>
      <v-flex xs8 md10>
        <h1 class="display-1">จัดการข้อมูลบริการ (หัตถการ)</h1>
      </v-flex>
      <v-flex xs4 md2 text-xs-right mb-4>
        <v-btn @click="openModalManageService()" color="primary" class="mt-0 mr-0">
          <v-icon>add</v-icon>
          <span class="hidden-xs-only" >เพิ่มข้อมูลบริการ</span>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-data-table :headers="headers" :items="showRestorationItems" :pagination.sync="pagination" hide-actions>
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.index + 1 }}</td>
            <td class="text-xs-center">{{ props.item.restorationName }}</td>
            <td class="text-xs-center">{{ props.item.restorationPrice  }}</td>
            <td class="text-xs-center">{{ props.item.restorationTimeTreatment }}</td>
            <td class="text-xs-center">{{ props.item.restorationUnit }}</td>
            <td class="text-xs-center">
              <toggle-button id="changed-font" @change="changeActive(props.item.restorationId, props.item.restorationActive)" :value="props.item.restorationActive" :width="80" :height="30" :speed="480" :labels="{unchecked: 'OFF', checked: 'ON'}"/>
            </td>
            <td class="text-xs-center"><v-icon medium class="hand"  @click="openModalEditService(props.item.restorationId, props.item.restorationActive)">edit</v-icon></td>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>
      </v-flex>
    </v-layout>
    <ModalManageService ref="modalManage" @checkStatus="checkStatus()"/>
    <ModalEditService ref="modalEdit" @checkStatus="checkStatus()"/>
  </v-container>
</template>

<script>
import ModalEditService from '@/components/hospital/ManageService/ModalEditService'
import ModalManageService from '@/components/hospital/ManageService/ModalManageService'
export default {
  components: {
    ModalManageService,
    ModalEditService
  },
  data () {
    return {
      pagination: {},
      status: false,
      headers: [
        { text: '#', align: 'center', sortable: false },
        { text: 'บริการ', align: 'center', sortable: false },
        { text: 'ราคา', align: 'center', sortable: false },
        { text: 'เวลา(นาที)', align: 'center', sortable: false },
        { text: 'หน่วย', align: 'center', sortable: false },
        { text: 'สถานะ', align: 'center', sortable: false },
        { text: 'แก้ไขหัตถการ', align: 'center', sortable: false }
      ],
      showRestorationItems: [],
      sts: 0
    }
  },
  created () {
    this.showRestoration()
    if (this.sts === 1) {
      this.checkStatus()
    }
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.showRestorationItems === []
      ) return 0

      return Math.ceil(this.showRestorationItems.length / this.pagination.rowsPerPage)
    }
  },
  methods: {
    changeActive (id, active) {
      if (active === 1) {
        // console.log('11111111')
        var textSource1 = {
          functionType: 'editActive',
          placeId: 1,
          restorationId: id,
          restorationActive: 0
        }
        this.axios.post(process.env.API + '/editRestoration', { Source: textSource1 }).then((response) => {
          if (response.data.Status === 'Success') {
            this.showRestoration()
          } else {
            // console.log('ไม่ผ่านนนน')
          }
        })
      } else if (active === 0) {
        // console.log('active', active)
        // console.log('00000000')
        var textSource0 = {
          functionType: 'editActive',
          placeId: 1,
          restorationId: id,
          restorationActive: 1
        }
        this.axios.post(process.env.API + '/editRestoration', { Source: textSource0 }).then((response) => {
          if (response.data.Status === 'Success') {
            this.showRestoration()
          } else {
            // console.log('ไม่ผ่านนนน')
          }
        })
      }
    },
    checkStatus () {
      this.sts = 1
      this.showRestoration()
      this.pages()
      this.sts = 0
    },
    showRestoration () {
      var textSource = {
        placeId: 1
      }
      this.axios.post(process.env.API + '/showRestoration', { Source: textSource }).then((response) => {
        if (response.data.Status === 'Success') {
          this.showRestorationItems = response.data.Result
          // console.log('showRestorationItems', this.showRestorationItems)
        } else {
          // console.log('ไม่ผ่านนนน')
        }
      })
    },
    openModalManageService () {
      this.$refs.modalManage.open()
    },
    openModalEditService (id, active) {
      // console.log('id', id)
      this.$refs.modalEdit.open(id, active)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
