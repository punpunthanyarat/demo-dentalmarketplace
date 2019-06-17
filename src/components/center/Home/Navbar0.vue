<template lang="html">
  <div>
    <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.lgAndUp" app v-model="drawer" class="hidden-md-and-up">
      <v-list dense>
        <template>
          <v-toolbar flat class="transparent">
          </v-toolbar>
          <v-list class="pt-0" dense>
            <v-divider></v-divider>
             <v-list-tile v-for="item in listMainMenu" :key="item.title" router :to="item.link">
              <v-list-tile-action>
               <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
               <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
             </v-list-tile>
          </v-list>
          <v-list class="pt-0" dense>
            <v-divider></v-divider>
            <v-subheader class="pt-0" dense>ลงทะเบียน</v-subheader>
            <v-list-tile v-for="item in listReg" :key="item.title" @click="openModalReg()">
              <v-list-tile-action>
               <v-icon>{{ item.icon_Reg }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
             <v-list-tile-title>{{ item.text_Reg }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-list class="pt-0" dense>
            <v-divider></v-divider>
           <v-list-tile v-for="item in Logout" :key="item.title" @click="">
            <v-list-tile-action>
             <v-icon>{{ item.icon_Out }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
             <v-list-tile-title @click="openModalLogin ()">{{ item.text_Out }}</v-list-tile-title>
            </v-list-tile-content>
           </v-list-tile>
          </v-list>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app fixed color="white" class="myToolbar">
      <v-toolbar-side-icon @click.stop="!drawer" class="hand hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title class="hand ml-1 hidden-md-and-up"></v-toolbar-title>
      <div class="px-1 py-1 pl-3 d-flex align-center">
        <img width="1%" src="/static/img/icons/tooth2.jpg" />Dental Marketplace
      </div>
      <!-- <v-spacer></v-spacer> -->
      <v-toolbar-items class="toolbarContent hidden-sm-and-down">
        <div class="d-flex align-center menuButton">
          <v-btn flat round @click="toPage('/')" class="hand">หน้าหลัก</v-btn>
        </div>
        <div class="d-flex align-center menuButton">
          <v-btn flat round @click="toPage('/Appointment')" class="hand">นัดหมายแพทย์</v-btn>
        </div>
        <div class="d-flex align-center menuButton">
          <v-btn flat round @click="" class="hand">ค้นหาทันตแพทย์</v-btn>
        </div>
        <div class="d-flex align-center menuButton">
          <v-btn flat round @click="" class="hand">ศูนย์บริการ CT Scan</v-btn>
        </div>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items class="toolbarContent hidden-sm-and-down">
        <div>
          <Register ref="register"/>
          <RegisterHaveOne ref="registerHaveOne"/>
        </div>
        <div class="d-flex align-center menuButton">
          <v-btn flat outline round color="primary" @click="openModalReg()" class="hand">ลงทะเบียน</v-btn>
        </div>
        <div class="pr-4 d-flex align-center menuButton">
          <v-btn depressed round color="primary" slot="activator" @click="openModalLogin()" class="hand">เข้าสู่ระบบ</v-btn>
          <Login ref="login" @info="nextStepLogIn"/>
        </div>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import Login from '@/components/center/Home/Modal/Login'
import Register from '@/components/center/Home/Modal/Register'
import RegisterHaveOne from '@/components/center/Home/Modal/RegisterHaveOne'
export default {
  components: {
    Login, Register, RegisterHaveOne
  },
  data () {
    return {
      drawer: false,
      listMainMenu: [
        { text: 'หน้าหลัก', value: 'home', icon: 'home', link: '/' },
        { text: 'ค้นหาทันตแพทย์', value: 'searchDent', icon: 'person', link: '888' },
        { text: 'ศูนย์บริการ CT Scan', value: 'searchLoca', icon: 'room', link: '888' }
      ],
      listMyMenu: []
      // listReg: [
      //   { text_Reg: 'เจ้าหน้าที่', value_Reg: 'Regoff', icon_Reg: 'account_circle' },
      //   { text_Reg: 'ทันตแพทย์', value_Reg: 'RegDen', icon_Reg: 'account_circle' },
      //   { text_Reg: 'ผู้ใช้บริการ', value_Reg: 'RegUse', icon_Reg: 'account_circle' }
      // ],
    }
  },
  methods: {
    nextStepLogIn (info) {
      if (info.status === 'success') {
        this.listMyMenu = info.employeeIn
      } else if (info.status === 'firstTime') {
        // console.log(info.oneIdData)
        this.$refs.registerHaveOne.open(info.username, info.oneIdData)
      }
    },
    openModalLogin () {
      this.$refs.login.open()
    },
    openModalReg () {
      this.$refs.register.open()
    },
    toPage (url) {
      this.$router.push(url)
    }
  }
}
</script>
<style lang="css" scoped>
.myToolbar{
  padding-left: 0 !important;
}
.navbarLogo{
  width: 200px;
  height: auto;
  /* cursor: pointer; */
  margin-left: 24px;
}
.menuList{
  font-size: 16px;
  font-weight: bold;
  padding: 1em;
  color: #72717c;
  cursor: pointer;
}
.menuList:hover{
  color: #28c1a5;
}
.menuButton{
  padding: 1em 0.5em;
}
.toolbarContent{
  margin-right: 24px;
}
@media only screen and (max-width: 768px){
  .navbarLogo{
    margin-left: 0;
  }
}
</style>
