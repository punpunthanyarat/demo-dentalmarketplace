<template lang="html">
<v-layout>
  <v-container>
    <v-layout row wrap py-2>
    <v-flex xs8 md10 py-0>
      <h1 class="display-1">การกำหนดสิทธิ์</h1>
    </v-flex>
    <v-flex xs2 md2 py-0>
      <InsertPermission ref="insertpermission"/>
      <v-btn color="primary" @click="openInsertPermission()">เพิ่มข้อมูล</v-btn>
    </v-flex>
    </v-layout>
        <v-layout row wrap>
          <v-flex xs12 md12 py-4>
              <v-layout row wrap>
                <EditPermission ref="editpermission"/>
                <v-flex xs12>
                  <v-data-table
                    :headers="headers"
                    :items="table"
                    hide-actions
                  >
                    <template slot="items" slot-scope="props" >
                      <td>รอหลังบ้าน</td>
                      <!-- <td>{{ props.item.positionName }}</td> -->
                      <td>
                        <v-layout row wrap>
                          <v-flex xs8 md10 py-1>
                            <!-- <v-combobox v-model="table" label="การอนุญาติหน้าที่" chips clearable prepend-icon="filter_list"
                             solo box multiple >
                             <template xs2  py-2 v-model="table" slot="selection" slot-scope="data">
                               <v-chip :selected="data.selected" close @input="remove(data.item.action)" >
                                <strong>{{ data.item.action }}</strong>
                               </v-chip>
                             </template>
                           </v-combobox> -->
                             <!-- <v-select v-model="props.item.permission.permissionName"  :items="props.item.permission.permissionName" :value="props.item.permission.permissionName" chips multiple disabled></v-select>
                            <v-select v-model="testPer"  :items="itemsPer" item-text="permissionName" item-value="permissionId"  multiple></v-select> -->
                            <v-select v-model="permission"  :items="table" item-text="permissionName" item-value="permissionId"  multiple chips readonly></v-select>
                          </v-flex>
                          <v-spacer></v-spacer>
                         <v-flex xs12 md1 py-4>
                          <button  @click="openEditPermission(props.item)" ><v-icon>edit</v-icon></button>
                         </v-flex>
                        </v-layout>
                      </td>
                    </template>
            </v-data-table>
          </v-flex>
          <v-flex xs12 md8 py-0>
            <!-- {{testPer}}
            <v-select v-model="testPer" label="การอนุญาติ" :items="itemsPer" item-text="permissionName" item-value="permissionId" multiple></v-select>
              <v-select v-model="testPer2" label="การอนุญาติ" :items="table" item-text="permissionName" item-value="permissionId" multiple></v-select> -->
          </v-flex>
        </v-layout>

      </v-flex>
      </v-layout>
      <v-layout row wrap>
      <v-flex xs0 md8 py-4>

      </v-flex>
      <v-flex xs12 md4 py-4>
      <v-card-text>
             <v-pagination
               v-model="page"
               :length="4"
             ></v-pagination>
      </v-card-text>
      </v-flex>
     </v-layout>



   <EditPermission @addaction="addaction" @addPermissionSelected="addPermission" @addPermissionPosition="addPosition"/>
  </v-container>
</v-layout>
</template>

<script>
import EditPermission from '@/components/center/Permission/EditPermission'
import Navbar from '@/pages/Navbar'
import InsertPermission from '@/components/center/Permission/InsertPermission'
export default {
  data () {
    return {
      page: 1,
      headers: [
        { text: 'ตำแหน่ง', sortable: false },
        { text: 'หน้าที่', sortable: false }
      ],
      table: [],
      items: ['คอลเซ็นเตอร์', 'เข็นเปล'],
      permission: [9]
    }
  },
  components: {
    EditPermission, Navbar, InsertPermission
  },
  created () {
    this.getPermission()
  },
  methods: {
    remove (item) {
      this.table.splice(this.table.indexOf(item), 1)
      this.table = [...this.table]
    },
    openEditPermission (item) {
      this.$refs.editpermission.open(item)
      // this.table.push({action: 'huuhjk'})
    },
    addPermission (selectedItem) {
      // this.table.push({action: 'selectedItem'})
      console.log(this.selectedItem)
      console.log(2222222)
    },
    openInsertPermission () {
      this.$refs.insertpermission.open()
    },
    getPermission () {
      this.axios.post(process.env.API + '/getPermissionList').then((response) => {
        console.log(response.data)
        console.log('sdrtyuiol;lkuyt567uilkjhgyuio')
        if (response.data.Status === 'Success') {
          this.itemsPer = response.data.Result
          this.table = response.data.Result
        }
      })
    }
    // addTable (index) {
    //   this.table.splice(index + 1, 0, {})
    // }
  }
}
</script>

<style lang="css" scoped>
.text-xs-right {
   background-color: 'blue darken-1';
 }
</style>
