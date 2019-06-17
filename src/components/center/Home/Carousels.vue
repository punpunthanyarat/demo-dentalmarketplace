<template lang="html">
  <div>
    <v-carousel>
      <v-carousel-item v-for="(item,i) in items" :src="item.src" :key="i"></v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { src: '/static/img/main/cover1.jpg' },
        { src: '/static/img/main/cover2.jpg' }
      ]
    }
  }
}
</script>

<style lang="css" scoped>
>>> .carousel {
  height: 600px !important;
}
>>> .jumbotron__image {
  width: 100% !important;
}
@media only screen and (max-width: 600px) {
  >>> .carousel {
    height: 350px !important;
  }
  >>> .jumbotron__image {
    height: 100% !important;
  }
}
</style>
