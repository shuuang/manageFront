<template>
  <div>
    <el-upload
      :action="action"
      name="file"
      ref="upload"
      :http-request="myupload"
      list-type="picture-card"
      :auto-upload="true"
      multiple
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{file}" >
        <img
          class="el-upload-list__item-thumbnail"
          :src="file.url"
        >
        <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { apiName } from '@/api/api'
export default {
  name: "fileTest",
  data() {
    return {
      action: process.env.VUE_APP_BASE_API + '/club/upload',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      file: ''
    }
  },
  methods: {
    uploads() {
      const formData = new FormData()
      const file = this.$refs.upload.uploadFiles[0]
      console.log(file)
      console.log(file.raw)
      // const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' }}
      if (!file) { // 若未选择文件
        alert('请选择文件')
        return
      }
      formData.append('file', file.raw)
      apiName({
        url: '/club/upload',
        method: 'post',
        data: file.raw
      }).then(response => {
        console.log(file.raw)
        console.log(response)
      })
    },
    myupload() {
      const file = this.$refs.upload.uploadFiles[0]
      console.log(file)
      apiName({
        url: '/club/upload',
        method: 'post',
        data: { file: file.raw }
      }).then(response => {
        console.log(this.file)
        console.log(response)
      })
    },
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    }
  }
}
</script>

<style scoped>

</style>
