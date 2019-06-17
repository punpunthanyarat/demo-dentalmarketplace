<template lang="html">
  <div class="">
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="700">
        <v-card>
          <v-card-title><b class="display-1">{{title}}</b></v-card-title>
          <div class="px-3" v-show="!isCrop">
            <img ref="previewImgEdit" :src="imagePreview" class="previewImg">
          </div>
          <div class="" v-show="isCrop">
            <vue-croppie ref=croppieRef :enableResize="false" :viewport="{ width: 300, height: 300 }">
            </vue-croppie>
            <div class="centerDiv">
              <v-btn outline @click="rotate(-90)">Rotate Left</v-btn>
              <v-btn outline @click="rotate(90)">Rotate Right</v-btn>
            </div>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" outline @click.native="hide()">Cancel</v-btn>
            <v-btn color="primary" depressed @click.native="uploadFile()">{{type}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      dialog: false,
      valid: '',
      type: '',
      title: '',
      company: {},
      imagePreview: '',
      isUpload: false,
      valueProgress: 0,
      cropped: null,
      croppedShow: null,
      isCrop: false
    }
  },
  methods: {
    open (type, data) {
      this.type = type
      this.imagePreview = data
      $(this.$refs.file).val(null)
      $(this.$refs.previewImgEdit).attr('src', this.imagePreview)
      if (type === 'Add') {
        this.title = 'เลือกรูปประจำตัวของท่าน'
      } else {
        this.title = 'แก้ไขรูปประจำตัวของท่าน'
      }
      this.dialog = true

      this.isCrop = true
      this.$refs.croppieRef.bind({
        url: this.imagePreview
      })
    },
    hide () {
      this.dialog = false
      this.clear()
    },
    clear () {
      this.isCrop = false
      this.isUpload = false
      this.valueProgress = 0
      $(this.$refs.file).val(null)
      $(this.$refs.previewImgEdit).attr('src', '')
    },
    rotate (rotationAngle) {
      this.$refs.croppieRef.rotate(rotationAngle)
    },
    // renderPreview () {
    //   this.isCrop = false
    //   var reader = new FileReader()
    //   var me = this
    //   reader.onload = function (e) {
    //     $(me.$refs.previewImgEdit).attr('src', e.target.result)
    //     me.isCrop = true
    //     me.$refs.croppieRef.bind({
    //       url: e.target.result
    //     })
    //   }
    //   reader.readAsDataURL(this.$refs.file.files[0])
    // },
    uploadFile () {
      var options = {
        type: 'blob',
        format: 'png'
      }
      this.$refs.croppieRef.result(options, (output) => {
        this.cropped = output
        if (!this.cropped) {
          this.$swal('กรุณาเลือกไฟล์', '', 'warning')
          return ''
        }
        this.$emit('profileImg', this.cropped)
      })

      options = {
        type: 'base64',
        format: 'png'
      }
      this.$refs.croppieRef.result(options, (output) => {
        this.croppedShow = output
        if (!this.croppedShow) {
          this.$swal('กรุณาเลือกไฟล์', '', 'warning')
          return ''
        }
        this.$emit('profileImgShow', this.croppedShow)
      })
    }
  }
}
</script>
<style scoped>
.previewImg { width: 100% !important; }
.addProfileImg { box-shadow: none !important; }
</style>
