<template>
  <div>
    <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
      <v-list dense>
        <v-list-tile><small class="grey--text bold">MENU</small></v-list-tile>
        <template v-for="item in listMainMenu">
          <v-list-tile @click="goPage(item.link)">
            <v-list-tile-action><v-icon>{{ item.icon }}</v-icon></v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <div v-if="myInfo === null">
          <v-divider></v-divider>
          <v-list-tile @click="openModalReg()">
            <v-list-tile-action><v-icon>assignment</v-icon></v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>ลงทะเบียน</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="openModalLogin()">
            <v-list-tile-action><v-icon>lock_open</v-icon></v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>เข้าสู่ระบบ</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="white" app fixed>
      <v-toolbar-title class="ml-0 pl-3 center-y">
        <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
        <img @click="goPage('/')" src="/static/img/main/logo.png" height="30px" class="hidden-xs-only hand"/>
        <span @click="goPage('/')" class="logofont ml-2 primary--text hand">Dental Marketplace</span>
        <!-- <img src="/static/img/main/logo_voxy.jpg" height="35px"/>
        <span class="logofont hidden-xs-only">CENTER</span> -->
        <!-- <div class="ml-5">
          <v-btn flat class="ma-0" v-for="item in listMainMenu">{{item.text}}</v-btn>
        </div> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="pr-0 mr-0" v-if="myInfo !== null">
        <v-menu v-model="menu1" min-width="300px" offset-y class="hidden-md-and-up">
          <v-btn slot="activator" icon><v-icon>more_vert</v-icon></v-btn>
          <v-card>
            <v-list>
              <v-list-tile>
                <v-list-tile-avatar>
                  <v-avatar size="45px" :tile="true">
                    <img src="/static/img/main/person.jpg">
                  </v-avatar>
                </v-list-tile-avatar>
                <v-list-tile-content class="ml-1">
                  <v-list-tile-title class="nameProfile hand" @click="">
                    <h3 class="primary--text">{{ myInfo.fullNameTH }}</h3>
                  </v-list-tile-title>
                  <v-list-tile-sub-title>{{ myInfo.fullNameEN }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn small fab color="grey lighten-3" @click="logOut()"><v-icon>power_settings_new</v-icon></v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
            <v-divider class="grey lighten-1"></v-divider>
            <v-list>
              <template v-for="place,i in myInfo.employeeIn">
                <v-list-tile @click="intoPlace(place.id)" class="hand" :key="place.id">
                  <v-list-tile-content>
                    <v-list-tile-title>{{place.placeName}} <small class="grey--text">({{place.position}})</small></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider v-if="i+1 < myInfo.employeeIn.length" :key="i"></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-menu>
        <v-menu v-model="menu2" min-width="400px" offset-y class="hidden-sm-and-down">
          <v-btn slot="activator" round outline color="primary">
            My Profile
            <v-icon class="ml-2">keyboard_arrow_down</v-icon>
          </v-btn>
          <v-card>
            <v-list>
              <v-list-tile>
                <v-list-tile-avatar>
                  <v-avatar size="45px" :tile="true">
                    <img src="/static/img/main/person.jpg">
                  </v-avatar>
                </v-list-tile-avatar>
                <v-list-tile-content class="ml-1">
                  <v-list-tile-title class="nameProfile hand" @click="">
                    <h3 class="primary--text">{{ myInfo.fullNameTH }}</h3>
                  </v-list-tile-title>
                  <v-list-tile-sub-title>{{ myInfo.fullNameEN }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn small fab color="grey lighten-3" @click="logOut()"><v-icon>power_settings_new</v-icon></v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
            <v-divider class="grey lighten-1"></v-divider>
            <v-list>
              <template v-for="place,i in myInfo.employeeIn">
                <v-list-tile @click="intoPlace(place.id)" class="hand" :key="place.id">
                  <v-list-tile-content>
                    <v-list-tile-title>{{place.placeName}} <small class="grey--text">({{place.position}})</small></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider v-if="i+1 < myInfo.employeeIn.length" :key="i"></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-menu>
      </div>
      <v-toolbar-items class="toolbarContent hidden-sm-and-down" v-if="myInfo === null">
        <div>
          <Register ref="register"/>
          <RegisterHaveOne ref="registerHaveOne"/>
        </div>
        <!-- <div class="d-flex align-center menuButton">
          <v-btn flat outline round color="primary" @click="testSetLocalStorage()" class="hand">test</v-btn>
        </div> -->
        <div class="d-flex align-center menuButton">
          <v-btn flat outline round color="primary" @click="openModalReg()" class="hand">ลงทะเบียน</v-btn>
        </div>
        <div class="d-flex align-center menuButton">
          <v-btn depressed round color="primary" slot="activator" @click="openModalLogin()" class="hand">เข้าสู่ระบบ</v-btn>
        </div>
      </v-toolbar-items>
    </v-toolbar>
    <Login ref="login" @info="nextStepLogIn"/>
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
      menu1: false,
      menu2: false,
      drawer: false,
      listMainMenu: [
        { text: 'หน้าแรก', icon: 'home', link: '/' }
        // { text: 'ค้นหาทันตแพทย์', icon: 'person', link: '/' },
        // { text: 'นัดหมายแพทย์', icon: 'person', link: '/' }
      ],
      myInfo: {}
    }
  },
  created () {
    this.myInfo = JSON.parse(localStorage.getItem('myInfo'))
  },
  methods: {
    intoPlace (placeId) {
      var textSource = {
        placeId: placeId,
        memberId: this.myInfo.memberId
      }
      this.axios.post(process.env.API + '/checkAuthorizationByPlaceId', { Source: textSource }).then((response) => {
        // console.log(response.data)
        localStorage.setItem('myPlaceId', placeId)
        localStorage.setItem('myPermission', JSON.stringify(response.data.Result))
      })
    },
    // testSetLocalStorage () {
    //   this.myInfo = {
    //     imageProfile: 'zxc123456_20180928150418.jpg',
    //     memberId: 'HT1800014',
    //     fullNameTH: 'นายสวัสดี ทดสอบ',
    //     fullNameEN: 'Mr Hello Test',
    //     employeeIn: [
    //       { placeId: 1, placeName: 'Voxy Clinic' },
    //       { placeId: 2, placeName: 'Digital Dentistry' }
    //     ]
    //   }
    //   localStorage.setItem('myInfo', JSON.stringify(this.myInfo))
    //   var info = { status: 'success' }
    //   this.nextStepLogIn(info)
    // },
    nextStepLogIn (info) {
      if (info.status === 'success') {
        // console.log('nextStepLogIn ', JSON.parse(localStorage.getItem('myInfo')))
        this.myInfo = JSON.parse(localStorage.getItem('myInfo'))
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
    goPage (link) {
      this.$router.push(link)
    },
    logOut () {
      localStorage.clear()
      this.myInfo = {}
      window.location = '/'
    }
  }
}
</script>
<style lang="css" scoped>
.nameProfile:hover {
  text-decoration: underline;
}
.logofont {
  /* margin-top: 5px;
  margin-left: 15px;
  color: #555 !important; */
  font-size: 25px !important;
  font-weight: 600 !important;
}
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
