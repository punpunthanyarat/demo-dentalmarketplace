<template lang="html">
  <v-dialog v-model="isLoading" persistent max-width="300px" class="pa-5">
    <v-card class="center-x center-y pa-5">
      <v-layout row wrap>
        <v-flex xs12 class="center-x mb-3">
          <v-progress-circular
          :size="100"
          color="primary"
          indeterminate
          ></v-progress-circular>
        </v-flex>
        <v-flex xs12 class="center-x"><b class="title">กรุณารอสักครู่</b></v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    open () {
      this.isLoading = true
    },
    hide () {
      this.isLoading = false
    }
  }
}
</script>

<style lang="css" scoped>
</style>
