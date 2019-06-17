<template>
  <v-card  class="pa-4">
    <v-flex md12>
      <h3 class="display-1">กำหนดสิทธิ์</h3>
    </v-flex>
    <v-layout row wrap>
      <v-flex md4>
        <v-checkbox v-model="admin" label="แอดมิน"></v-checkbox>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex md4>
        <v-checkbox v-model="dentist" label="ทันตแพทย์"></v-checkbox>
      </v-flex>
      <v-flex md4>
        <v-checkbox v-model="counter" label="โต๊ะบริการ"></v-checkbox>
      </v-flex>
      <v-flex md4>
        <v-checkbox v-model="uploader" label="พนักงาานอัพโหลดข้อมูล"></v-checkbox>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-layout row wrap>
      <v-flex md4>
        <v-checkbox v-model="editor" label="แก้ไข/เปลี่ยนแปลงประวัติ"></v-checkbox>
      </v-flex>
      <v-flex md4>
        <v-checkbox v-model="manageapp" label="จัดการการนัดหมายผู้ใช้บริการ"></v-checkbox>
      </v-flex>
      <v-flex md4>
        <v-checkbox v-model="service" label="รับเรื่องผู้มาใช้บริการ"></v-checkbox>
      </v-flex>
      <v-flex md4>
        <v-checkbox v-model="callcenter" label="คอลเซ็นเตอร์"></v-checkbox>
      </v-flex>
      <v-flex md4>
        <v-checkbox v-model="management" label="กำหนดเวลาทำงานเจ้าหน้าที่"></v-checkbox>
      </v-flex>
      <v-flex md4>
        <v-checkbox v-model="timetable" label="จัดการตารางเวรทันตแพทย์"></v-checkbox>
      </v-flex>
      <v-flex md4>
        <v-checkbox v-model="finance" label="การเงิน/ชำระค่าบริการสำหรับผู้มาใช้บริการ"></v-checkbox>
      </v-flex>
      <v-flex md4>
        <v-checkbox v-model="buyer" label="จัดซื้อจัดจ้าง"></v-checkbox>
      </v-flex>
      <v-flex md4>
        <v-checkbox v-model="chanel" label="รับเรื่องร้องเรียน"></v-checkbox>
      </v-flex>
    </v-layout>
    <!-- <v-btn color="primary">ตกลง</v-btn> -->
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      editor: false,
      manageapp: false,
      service: false,
      callcenter: false,
      management: false,
      timetable: false,
      finance: false,
      buyer: false,
      chanel: false,
      admin: false,
      counter: false,
      uploader: false,
      dentist: false,
      select: [
        { text: 'State 1' },
        { text: 'State 2' },
        { text: 'State 3' },
        { text: 'State 4' },
        { text: 'State 5' },
        { text: 'State 6' },
        { text: 'State 7' }
      ]
    }
  },
  watch: {
    admin () {
      if (this.admin === true) {
        this.editor = true
        this.manageapp = true
        this.service = true
        this.callcenter = true
        this.management = true
        this.timetable = true
        this.finance = true
        this.buyer = true
        this.chanel = true
      } else if (this.admin === false) {
        this.editor = false
        this.manageapp = false
        this.service = false
        this.callcenter = false
        this.management = false
        this.timetable = false
        this.finance = false
        this.buyer = false
        this.chanel = false
      }
    }
  }
}
</script>
