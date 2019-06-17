<template lang="html">
  <div>
    <Navbar/>
    <Carousels/>
    <!-- <v-container>
      <v-layout row wrap class="pt-3">
        <v-flex xs6 sm3 v-for="item,i in items" :key="i" px-1 pb-1>
          <img :src="item.src" class="w-100" />
        </v-flex>
      </v-layout>
    </v-container> -->
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
        { src: '/static/img/main/icon1.jpg' },
        { src: '/static/img/main/icon2.jpg' },
        { src: '/static/img/main/icon3.jpg' },
        { src: '/static/img/main/icon4.jpg' }
      ]
    }
  }
}
</script>

<style lang="css" scoped>
.parallax__image {
  width: 100% !important;
}
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
