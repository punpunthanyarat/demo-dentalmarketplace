<template lang="html">
  <v-container grid-list-lg mt-0 pt-0>
    <v-layout row wrap><b class="mt-3 ml-3">ค้นหารายชื่อ</b></v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 md5 offset-md0 pt-0 mt-0 px-3>
        <v-select v-model="typeSearch" :items="[{ th: 'บัตรประชาชน/หนังสือเดินทาง', en: 'id'}, { th: 'ชื่อ-นามสกุล', en: 'name'}]" label="ประเภทการค้นหา" item-text="th" item-value="en" required></v-select>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1 md5 offset-md0 pt-0 mt-0 px-3>
        <v-text-field v-model="textSearch" label="ระบุข้อความที่ต้องการค้นหา" required></v-text-field>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1 md2 offset-md0 pt-0 mt-2 px-3>
        <v-btn outline color="primary" @click="emitSearch" class="btn-w-100">
          <v-icon>search</v-icon><span class="ml-2 hidden-md-and-up">ค้นหารายชื่อ</span>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      typeSearch: 'id',
      textSearch: ''
    }
  },
  methods: {
    emitSearch () {
      var info = {
        typeSearch: this.typeSearch,
        textSearch: this.textSearch
      }
      this.$emit('info', info)
    }
  }
}
</script>
