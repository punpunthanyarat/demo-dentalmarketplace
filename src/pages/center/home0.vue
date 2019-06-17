<template lang="html">
  <div>
    <Navbar/>
    <v-layout row wrap>
      <Carousels/>
    </v-layout>
    <v-layout class="searchDR-bg">
      <v-flex md10 offset-md1 class="pt-5 pb-5 px-2">
        <v-card class="pl-4 pr-4 bg">
          <v-card-title primary-title>
            <div class="headline"><strong>ค้นหาทันตแพทย์</strong></div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-actions class="pt-4">
            <v-layout row wrap class="hand hidden-md-and-up">
              <v-flex xs12>
                <v-text-field name="input-1-3" label="ชื่อ, นามสกุล, รหัสบัตรประชาชน" single-line></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select single-line :items="[{ text: 'Mobile' }, { text: 'Mobile' }, { text: 'Mobile' }]" label="ความเชี่ยวชาญ"></v-select>
              </v-flex>
              <v-flex xs12 class="pt-3">
                <v-btn round color="primary">ค้นหา</v-btn>
              </v-flex>
            </v-layout>
            <v-text-field name="input-1-3" label="ชื่อ, นามสกุล, รหัสบัตรประชาชน" single-line class="hidden-sm-and-down"></v-text-field>
            <v-select single-line :items="[{ text: 'Mobile' }, { text: 'Mobile' }, { text: 'Mobile' }]" label="ความเชี่ยวชาญ" class="hidden-sm-and-down"></v-select>
            <v-btn round color="primary" class="hidden-sm-and-down">ค้นหา</v-btn>
          </v-card-actions>
          <br/>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout class="searchLoca-bg">
      <v-flex md10 offset-md1 class="pb-5 pl-2 pr-2">
        <v-card class="pl-4 pr-4">
          <v-card-title primary-title>
            <div class="headline"><strong>ค้นหาศูนย์บริการ CT SCAN</strong></div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-actions class="pt-4">
            <v-layout row wrap class="hand hidden-md-and-up">
              <v-flex xs12>
                <v-text-field name="input-1-3" label="ชื่อศูนย์บริการ CT SCAN" single-line></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select single-line :items="[{ text: 'Mobile' }, { text: 'Mobile' }, { text: 'Mobile' }]" label="ภาค"></v-select>
              </v-flex>
              <v-flex xs12 class="pt-3">
                <v-btn round color="primary">ค้นหา</v-btn>
              </v-flex>
            </v-layout>
            <v-text-field name="input-1-3" label="ชื่อศูนย์บริการ CT SCAN" single-line class="hidden-sm-and-down"></v-text-field>
            <v-select single-line :items="[{ text: 'Mobile' }, { text: 'Mobile' }, { text: 'Mobile' }]" label="ภาค" class="hidden-sm-and-down"></v-select>
            <v-btn round color="primary" class="hidden-sm-and-down">ค้นหา</v-btn>
          </v-card-actions>
          <br/>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout class="ExHospital-bg">
      <v-flex pb-5 md10 offset-md1>
        <v-layout row wrap>
          <v-flex md6 pa-2 v-for="(item,i) in items_ExHospital" :src="item.src" :key="i">
            <v-card class="hidden-sm-and-down">
              <v-container>
                <v-layout row>
                  <v-flex xs12>
                    <v-card-media :src="item.img_ExHospital" height="200px" width="200px" contain></v-card-media>
                  </v-flex>
                  <v-flex xs12 px-3>
                    <v-card-title>
                      <div>
                        <div class="headline"><strong>{{ item.name_ExHospital }}</strong></div>
                        <small>{{ item.description_ExHospital }}</small>
                      </div>
                    </v-card-title>
                    <v-card-actions >
                      <v-btn dense outline round color="primary" class="hand" >MAP</v-btn>
                    </v-card-actions>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
            <v-card class="hidden-md-and-up">
              <v-container>
                <v-layout column>
                  <v-flex xs12>
                    <v-card-media :src="item.img_ExHospital" height="200px" width="200px" contain></v-card-media>
                  </v-flex>
                  <v-flex xs12 px-3>
                    <v-card-title>
                      <div>
                        <div class="headline"><strong>{{ item.name_ExHospital }}</strong></div>
                        <small>{{ item.description_ExHospital }}</small>
                      </div>
                    </v-card-title>
                    <v-card-actions >
                      <v-btn outline round color="primary" class="hand">MAP</v-btn>
                    </v-card-actions>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '@/components/center/Home/Navbar'
import Carousels from '@/components/center/Home/Carousels'
import Footer from '@/components/center/Home/Footer'
export default {
  components: {
    Navbar,
    Carousels,
    Footer
  },
  data () {
    return {
      items: [
        {
          src: '/static/img/carousels/slider1.jpg'
        }
      ],
      items_ExHospital: [
        {
          img_ExHospital: '/static/img/ExHospital/ExHospital1.jpg',
          name_ExHospital: 'โรงพยาบาลพระรามเก้า',
          description_ExHospital: "Ali Connors I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        {
          img_ExHospital: '/static/img/ExHospital/ExHospital2.jpg',
          name_ExHospital: 'โรงพยาบาลลาดพร้าว',
          description_ExHospital: "Ali Connors I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        {
          img_ExHospital: '/static/img/ExHospital/ExHospital3.jpg',
          name_ExHospital: 'โรงพยาบาลวิภาราม',
          description_ExHospital: "Ali Connors I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        {
          img_ExHospital: '/static/img/ExHospital/ExHospital4.jpg',
          name_ExHospital: 'โรงพยาบาลจุฬาภรณ์',
          description_ExHospital: "Ali Connors I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        }
      ]
    }
  }
}
</script>

<style lang="css" scoped>
.searchLoca-bg {
  background-color: white;
}
.searchDR-bg {
  background-color: white;
}
.fade {
  transition: .3s ease-out;
  opacity: 0;
}
.carousel__controls {
  background-color: transparent !important;
}
.carou1 {
  height: 600px;
}
</style>
