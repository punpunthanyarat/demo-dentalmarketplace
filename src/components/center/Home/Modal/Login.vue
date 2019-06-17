<template>
  <v-container>
   <v-layout row justify-center>
    <v-flex>
     <v-dialog v-model="modalLog" persistent max-width="400px">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>เข้าสู่ระบบ</v-toolbar-title>
          <v-spacer></v-spacer>
          <p class="text-xs-right"><button @click="modalLog = false" ><v-icon color="white">close</v-icon></button></p>
        </v-toolbar>
        <v-card-text>
          <v-container grid-list-md>
            <v-card-text>
              <v-form>
                <v-text-field v-model="username"  prepend-icon="person"  label="ชื่อผู้ใช้" type="text"></v-text-field>
                <v-text-field v-model="password"  prepend-icon="lock"  label="รหัสผ่าน" type="password"></v-text-field>
              </v-form>
            </v-card-text>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="modalLog = false" >ลงทะเบียน</v-btn>
          <v-btn color="blue darken-1" flat @click="login()">เข้าสู่ระบบ</v-btn>
        </v-card-actions>
      </v-card>
      <Loading ref="loading"/>
     </v-dialog>
    </v-flex>
   </v-layout>
  </v-container>
</template>
<script>
  import Loading from '@/components/Loading'
  export default {
    components: {
      Loading
    },
    data () {
      return {
        modalLog: false,
        username: '',
        password: ''
      }
    },
    methods: {
      open () {
        this.modalLog = true
      },
      openLoading () {
        this.$refs.loading.open()
      },
      hideLoading () {
        this.$refs.loading.hide()
      },
      login () {
        this.openLoading()
        var textSource = {
          username: this.username,
          password: this.password
        }
        this.axios.post(process.env.API + '/loginMember', { Source: textSource }).then((response) => {
          var info = {}
          // console.log('logIn ', response.data)
          if (response.data.Status === 'Success') {
            localStorage.setItem('myInfo', JSON.stringify(response.data.Result))
            info = {
              status: 'success'
            }
            this.modalLog = false
            this.$emit('info', info)
          } else if (response.data.Status === 'firstTime') {
            info = {
              status: 'firstTime',
              username: this.username,
              oneIdData: response.data.oneIdData
            }
            this.$emit('info', info)
          } else {
            this.$swal('ข้อมูลขัดข้องบางประการ', 'กรุณาลองใหม่อีกครั้ง หรือติดต่อเจ้าหน้าที่', 'warning')
          }
          this.hideLoading()
        })
      },
      goPage (link) {
        // this.$router.push(link)
        // window.open(link)
        window.location = link
      }
    }
}
</script>
<style scoped>
.text-xs-right {
   background-color: 'blue darken-1';
}
</style>
