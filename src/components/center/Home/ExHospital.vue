<template>
  <v-layout class="ExHospital-bg">
    <v-flex pb-5 md10 offset-md1>
      <v-layout row wrap>
        <v-flex md6 pl-2 pr-2 pt-2 pb-2
        v-for="(item,i) in items_ExHospital"
        :src="item.src"
        :key="i"
        @click="">
          <v-card class="hidden-sm-and-down">
            <v-container>
              <v-layout row>
                <v-flex xs12>
                  <v-card-media
                  :src="item.img_ExHospital"
                  height="200px"
                  width="200px"
                  contain>
                  </v-card-media>
                </v-flex>
                <v-flex xs12 pr-3 pl-3>
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
                  <v-card-media
                  :src="item.img_ExHospital"
                  height="200px"
                  width="200px"
                  contain>
                  </v-card-media>
                </v-flex>
                <v-flex xs12 pr-3 pl-3>
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
</template>

<script>
export default {
  data () {
    return {
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
.ExHospital-bg {
  background-color: white;
}
</style>
