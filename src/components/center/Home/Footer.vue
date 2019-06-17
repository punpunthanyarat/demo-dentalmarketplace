<template>
  <div>
    <section class="grey lighten-4">
      <v-container grid-list-lg>
        <v-layout row wrap justify-center class="my-5">
          <v-flex xs12 sm4>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <b>Post Address</b>
              </v-card-title>
              <v-card-text>
                บริษัท อินเทอร์เน็ตประเทศไทย จำกัด (มหาชน)<br />
                1768 อาคารไทยซัมมิท ทาวเวอร์ ชั้น 10-12 และชั้น IT ถ.เพชรบุรีตัดใหม่ แขวงบางกะปิ เขตห้วยขวาง กรุงเทพมหานคร 10310
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm4 offset-sm1>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <b>Contact us</b>
              </v-card-title>
              <v-list class="transparent">
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon class="blue--text text--lighten-2">phone</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>0-2257-7111</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon class="blue--text text--lighten-2">email</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>info@inet.co.th</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <v-footer class="footerBg primary">
      <div class="w-100 pa-1 text-xs-center">
        <small class="white--text">Dental Marketplace — Powered by ONE Platform</small><br />
        <small class="white--text">&copy;2018 All Rights Reserved.</small>
      </div>
    </v-footer>
  </div>
</template>

<script>
export default {
  data: () => ({
    icons: [
      'email',
      'call'
    ]
  })
}
</script>

<style lang="css" scoped>
.footerBg {
  min-height: 60px;
}
</style>
