<template lang="html">
  <div>
    <Navbar/>
    <Carousels/>
    <div>
      <v-container grid-list-xs,sm,md,lg,xl>
        <v-layout row wrap>
          <h1>เวลานัดหมายแพทย์ที่สะดวก</h1>
        </v-layout>
        <v-card>
          <v-container grid-list-md>
            <v-layout wrap align-center>
              <v-flex xs12 sm6>
                <v-subheader v-text="'วันและเวลาที่ต้องการพบแพทย์'"></v-subheader>
              </v-flex>
              <v-flex xs12 sm6 md3>
               <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent lazy full-width width="290px">
                 <v-text-field slot="activator" v-model="date" label="วว/ดด//ปป" prepend-icon="event" readonly></v-text-field>
                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                  </v-date-picker>
               </v-dialog>
              </v-flex>
              <v-flex xs12 sm6 md3>
               <v-select :items="times" v-model="selectTimes" label="เวลาใดก็ได้" max-height="400"></v-select>
              </v-flex>
              <v-flex xs12 sm6>
               <v-subheader v-text="'รายละเอียดเพิ่มเติม'"></v-subheader>
              </v-flex>
              <v-flex xs12 sm6>
               <v-textarea v-model="bio" color="primary"placeholder="กรุณาอธิบายรายละเอียดเพิ่มเติมเพื่อช่วยให้ทีมงานของเราค้นหาคำตอบได้ตรงกับความต้องการของท่าน เช่น โปรแกรมการรักษา สาขาวิชาที่แพทย์เชี่ยวชาญ หรือแพทย์ที่ท่านสนใจ">
               </v-textarea>
              </v-flex>
              <!-- <v-flex xs12 sm6>
                <v-subheader v-text="'แนบไฟล์'"></v-subheader>
              </v-flex> -->
            </v-layout>
          </v-container>
        </v-card>
      </v-container>
      <v-container grid-list-xs,sm,md,lg,xl>
       <v-layout row wrap>
        <h1>ข้อมูลผู้ป่วย</h1>
       </v-layout>
       <v-card>
        <v-container fluid grid-list-xl>
         <v-form ref="form" v-model="valid" lazy-validation>
          <v-layout wrap align-center>
           <v-flex xs12 sm6>
            <v-subheader v-text="'ชื่อ'"></v-subheader>
           </v-flex>
           <v-flex xs12 sm6>
            <v-text-field v-model="nameTH" :rules="NameRulesTH" placeholder="(ชื่อที่ใช้ในหนังสือเดินทาง/บัตรประชาชน)" required></v-text-field>
           </v-flex>
           <v-flex xs12 sm6>
            <v-subheader v-text="'นามสกุล'"></v-subheader>
           </v-flex>
           <v-flex xs12 sm6>
            <v-text-field v-model="surnameTH" :rules="SurnameRulesTH"></v-text-field>
           </v-flex>
           <v-flex xs12 sm6>
            <v-subheader v-text="'วันเกิด'"></v-subheader>
           </v-flex>
           <v-flex xs12 sm6>
             <v-dialog ref="dialog2" v-model="modal2" :return-value.sync="date2" persistent lazy full-width width="290px">
              <v-text-field  slot="activator" v-model="date2" label="วว/ดด//ปป" prepend-icon="event" :rules="[v => !!v || 'กรุณาเลือกวันเกิด']" readonly></v-text-field>
               <v-date-picker v-model="date2" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.dialog2.save(date2)">OK</v-btn>
               </v-date-picker>
             </v-dialog>
           </v-flex>
           <v-flex xs12 sm6>
             <v-subheader v-text="'เพศ'"></v-subheader>
           </v-flex>
           <v-flex xs12 sm6>
            <v-radio-group v-model="contactPerson" row>
             <v-radio class="mr-5" label="ชาย" value="newperson"></v-radio>
             <v-radio class="ml-5" label="หญิง" value="oldperson"></v-radio>
            </v-radio-group>
           </v-flex>
           <v-flex xs12 sm6>
            <v-subheader v-text="'อีเมล'"></v-subheader>
           </v-flex>
           <v-flex xs12 sm6>
             <v-text-field label="E-mail" v-model="email" :rules="emailRules" :error="chkEmailDuplicate" :error-messages="msgEmailDuplicate" color="primary" autocapitalize="off"></v-text-field>
           </v-flex>
           <v-flex xs12 sm6>
             <v-subheader v-text="'เบอร์ติดต่อกลับ'"></v-subheader>
           </v-flex>
           <v-flex xs12 sm6>
            <v-text-field v-model="phone" placeholder="โปรดแจ้งเบอร์ที่สามารถติดต่อได้ทันที" :rules="phoneRules" mask="###-###-####" max="10" required></v-text-field>
           </v-flex>
           <v-flex xs12 sm6 md12 offset-md5>
            <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue']">
             <div slot="label">
              ยอมรับข้อตกลง
              <a href="javascript:;" @click.stop="conditions = true">เงื่อนไขการใช้งาน</a>
             </div>
            </v-checkbox>
           </v-flex>
           <v-dialog v-model="conditions" width="70%">
            <v-card>
              <v-card-text v-html="content"></v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="conditions = false">Ok</v-btn>
                </v-card-actions>
            </v-card>
           </v-dialog>
           <v-flex xs12 sm6 md12>
            <v-btn dark block style="background-color: #27417A;" @click="saveData" :loading="isLoading">ทำการนัดหมาย</v-btn>
           </v-flex>
          </v-layout>
         </v-form>
        </v-container>
            <!-- <v-flex xs12 sm6>
             <v-subheader v-text="'แนบไฟล์'"></v-subheader>
            </v-flex> -->
       </v-card>
      </v-container>
    </div>
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
      bio: '',
      date: null,
      date2: null,
      modal: false,
      modal2: false,
      checkbox: false,
      conditions: false,
      valid: true,
      isLoading: false,
      nameTH: '',
      surnameTH: '',
      chkEmailDuplicate: false,
      msgEmailDuplicate: [],
      email: '',
      phone: '',
      NameRulesTH: [
        v => !!v || 'กรุณากรอกชื่อให้ครบถ้วน',
        v => /^([ก-๏ ])+$/.test(v) || 'กรุณากรอกภาษาไทย'
      ],
      SurnameRulesTH: [
        v => !!v || 'กรุณากรอกนามสกุลให้ครบถ้วน',
        v => /^([ก-๏ ])+$/.test(v) || 'กรุณากรอกภาษาไทย'
      ],
      emailRules: [
        v => !!v || 'กรุณาใส่อีเมล',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'รูปแบบอีเมลไม่ถูกต้อง'
      ],
      phoneRules: [
        v => !!v || 'กรุณาใส่เบอร์โทรศัพท์',
        v => /^([0-9])+$/.test(v) || 'กรุณากรอกตัวเลข'
      ],
      content: '<h4>เงื่อนไขการใช้บริการ</h4>1.การใช้บริการของเรา <br>&nbsp;&nbsp;&nbsp;1.1 การใช้บริการของเราไม่ได้ทำให้คุณเป็นเจ้าของสิทธิในทรัพย์สินทางปัญญาใดๆ ในบริการหรือเนื้อหาที่คุณเข้าถึง <br>&nbsp;&nbsp;&nbsp;1.2 การใช้บริการจากเรา เราอาจส่งประกาศเกี่ยวกับบริการ ข่าวสารเกี่ยวกับการบริหารจัดการ และข้อมูลอื่นๆ ให้แก่คุณ คุณสามารถเลือกไม่รับการสื่อสารเหล่านี้บางรายการได้ <br>&nbsp;&nbsp;&nbsp;1.3 บริการบางอย่างของเราสามารถใช้บนอุปกรณ์เคลื่อนทึ่ห้ามใช้บริการดังกล่าวในลักษณะที่ทำให้คุณเสียสมาธิและทำให้ไม่สามารถปฏิบัติตามกฎจราจรหรือกฎหมายด้านความปลอดภัย <br><br>2. บัญชี One Platform ของคุณ <br>&nbsp;&nbsp;&nbsp;2.1 คุณอาจต้องมีบัญชี One Platform เพื่อที่จะใช้บริการบางส่วนของเราอาจมีข้อกำหนดอื่นหรือเพิ่มเติมบังคับใช้กับคุณ และผู้ดูแลระบบของคุณอาจสามารถเข้าถึงหรือปิดการใช้งานบัญชีของคุณได้ <br>&nbsp;&nbsp;&nbsp;2.2 เพื่อปกป้องบัญชี One Platform ของคุณ โปรดเก็บรักษารหัสผ่านเป็นความลับ คุณมีความรับผิดชอบต่อกิจกรรมที่เกิดขึ้นบนหรือผ่านบัญชี One Platform ของคุณ พยายามไม่ใช้รหัสผ่านบัญชี One Platform ซ้ำบนแอปพลิเคชันของบุคคลที่สาม <br><br>3. การคุ้มครองข้อมูลส่วนบุคคลและลิขสิทธิ์ <br>&nbsp;&nbsp;&nbsp;3.1 เมื่อคุณใช้บริการของเรา ถือว่าคุณยินยอมให้ One Platform ใช้ข้อมูลดังกล่าวตามนโยบายส่วนบุคคลนั้น <br><br>4. การปรับเปลี่ยนและการยุติการให้บริการของเรา <br>&nbsp;&nbsp;&nbsp;4.1 เราทำการเปลี่ยนแปลงและปรับปรุงบริการของเราอย่างสม่ำเสมอ เราอาจเพิ่มหรือนำ <br>ระบบการทำงานหรือคุณลักษณะบางอย่างออก และเราอาจระงับหรือหยุดให้บริการใดบริการหนึ่งโดยสิ้นเชิง <br>&nbsp;&nbsp;&nbsp;4.2 คุณสามารถหยุดใช้บริการของเราได้ทุกเมื่อ <br><br>5. การใช้บริการของเราในทางธุรกิจ <br>&nbsp;&nbsp;&nbsp;5.1 หากคุณใช้บริการของเราในนามของธุรกิจ ธุรกิจนั้นจะต้องยอมรับข้อกำหนดเหล่านี้ <br>&nbsp;&nbsp;&nbsp;5.2 ธุรกิจจะไม่เรียกร้องให้ One Platform และบริษัทในเครือ เจ้าหน้าที่ ตัวแทน และพนักงานของ One Platform ชดใช้ค่าเสียหายให้แก่คุณ และคุณจะไม่ฟ้องร้องคดีหรือดำเนินการใดๆอันเกิดจากหรือเกี่ยวกับการใช้บริการหรือการละเมิดข้อกำหนดเหล่านี้รวมถึงไม่ให้บุคคลดังกล่าวมีความรับผิดหรือต้องชำระค่าใช้จ่ายใดๆ ที่เกิดจากการเรียกร้องค่าสินไหมทดแทน การสูญเสีย ความเสียหาย การฟ้องร้องคดี การตัดสินคดี ค่าใช้จ่ายในการดำเนินคดี และค่าทนายความ <br>',
      times: [
        'เวลาใดก็ได้', '07:00-07:59', '08:00-08:59', '09:00-09:59', '10:00-10:59', '11:00-11:59',
        '12:00-12:59', '13:00-13:59', '14:00-14:59', '15:00-15:59', '16:00-16:59', '17:00-17:59'
      ],
      selectTimes: []
    }
  },
  methods: {
    saveData () {
      this.$swal({
        title: 'ระบบได้บันทึกการนัดหมายของคุณแล้ว',
        text: '',
        type: 'success'
      })
    },
    checkEmailDuplicate () {
      this.axios.get('https://one.th/api/check_email?email=' + this.email).then((response) => {
        if (response.data.result === 'Success') {
          this.chkEmailDuplicate = false
          this.msgEmailDuplicate = []
        }
      }, (error) => {
        console.log(error)
        this.chkEmailDuplicate = true
        this.msgEmailDuplicate = ['อีเมล์นี้ถูกใช้แล้ว']
      })
      return true
    }
  },
  watch: {
    date () {
      if (this.date !== null) {
        var year = (parseInt(this.date.split('-')[0]) + 543).toString()
        this.dateShow = this.date.split('-')[2] + '-' + this.date.split('-')[1] + '-' + year
        this.dateThai = year + '-' + this.date.split('-')[1] + '-' + this.date.split('-')[2]
      }
    }
    // menu (val) {
    //   val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    // }
  }
}
</script>

<style lang="css" scoped>
</style>
