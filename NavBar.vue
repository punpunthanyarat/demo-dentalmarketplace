<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" fixed app>
      <v-list dense>
        <div class="w-100 center-x center-y">
          <img width="210px" src="/static/img/main/dentlogo.png" />
        </div>
        <v-divider></v-divider>
        <template v-for="item in items">
          <v-list-group v-if="item.children" v-model="item.model" :key="item.text" :prepend-icon="item.icon" append-icon="">
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  <span :class="item.model ? 'menu_active title' : 'title'">{{ item.text }}</span>
                  <div class="right center-y">
                    <v-icon v-show="!item.model">keyboard_arrow_down</v-icon>
                    <v-icon v-show="item.model">keyboard_arrow_up</v-icon>
                  </div>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(child, i) in item.children" :key="i" @click="goPage(child.link)">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="subheading">
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" @click="goPage(item.link)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                <span :class="item.model ? 'menu_active title' : 'title'">{{ item.text }}</span>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="navbar" color="primary" :clipped-left="$vuetify.breakpoint.lgAndUp" dark app fixed>
      <v-toolbar-title class="w-100 center-y">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down headline">คณะทันตแพทยศาสตร์ มหาวิทยาลัยเชียงใหม่</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="goPage('/')">
        <v-icon>power_settings_new</v-icon>
      </v-btn>
      <!-- <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon>
        <v-avatar size="20px">
          <img src="https://vuetifyjs.com/static/doc-images/logo.svg" >
        </v-avatar>
      </v-btn> -->
      <!-- <v-btn flat outline class="px-2">
        <v-avatar size="20px">
          <img src="https://vuetifyjs.com/static/doc-images/logo.svg" >
        </v-avatar>
        <span class="title ml-1 hidden-sm-and-down">คุณทันตแพทย์</span>
      </v-btn> -->
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        drawer: null,
        items: [
          {
            icon: 'assignment_ind',
            'arrow': 'keyboard_arrow_down',
            'arrow-alt': 'keyboard_arrow_down',
            text: 'ลงทะเบียน',
            model: false,
            children: [
              { icon: 'add', text: 'ทันตแพทย์', link: '/reg_dentist' },
              { icon: 'add', text: 'พนักงานเคาน์เตอร์', link: '/reg_counter' },
              { icon: 'add', text: 'ผู้ดูแลระบบ', link: '/reg_admin' }
            ]
          },
          { icon: 'import_contacts', text: 'บันทึกการนัดหมาย', link: '/job_create' },
          { icon: 'event_note', text: 'ตารางงาน (สำหรับหมอ)', link: '/job_list' }
        ]
      }
    },
    methods: {
      goPage (link) {
        this.$router.push(link)
      }
    }
  }
</script>

<style>
.menu_active {
  color: #27417A;
}
.navbar .btn--icon div.btn__content:before {
  width: 36px !important;
  height: 36px !important;
}
.btn .btn__content .icon, .btn .btn__content .avatar  {
  padding-left: 4px!important;
}
.toolbar .toolbar__content>:not(.btn):not(.menu):first-child:not(:only-child), .toolbar .toolbar__extension>:not(.btn):not(.menu):first-child:not(:only-child) {
    margin-left: 5px !important;
}
</style>
