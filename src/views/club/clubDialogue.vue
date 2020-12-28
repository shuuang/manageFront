<template>
  <div class="clubDialogue">
    <el-form :model="form" size="mini">
      <el-form-item label="社团名称" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.cname }}</span>
        <el-input v-else v-model="form.cname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="社长" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.users.realname }}</span>
<!--        <el-input v-else v-model="form.users.realname" autocomplete="off" />-->
      </el-form-item>
      <el-form-item label="指导老师" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.teacher }}</span>
        <el-input v-else v-model="form.teacher" autocomplete="off" />
      </el-form-item>
      <el-form-item label="创建时间" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.createAt }}</span>
<!--        <el-date-picker-->
<!--          v-model="form.createAt"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          type="date"-->
<!--          placeholder="选择日期">-->
<!--        </el-date-picker>-->
      </el-form-item>
      <el-form-item label="简介" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.introduction }}</span>
        <el-input v-else type="textarea" autosize v-model="form.introduction" autocomplete="off" />
      </el-form-item>
      <el-form-item label="社团Logo" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.img }}</span>
<!--        <el-input v-else v-model="form.img" autocomplete="off" />-->
      </el-form-item>
      <el-form-item label="申请材料" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.file }}</span>
<!--        <el-input v-else v-model="form.file" autocomplete="off" />-->
      </el-form-item>
      <el-form-item label="申请照片" :label-width="formLabelWidth">
        <el-image
          v-if="flag==='detail'"
          style="width: 100px; height: 100px"
          :src="form.appImage"
          fit="cover"
        />
        <el-upload
          v-else
          :action="action"
          name="file"
          ref="upload"
          :http-request="uploads"
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
      </el-form-item>
      <el-form-item label="值班表" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.duty }}</span>
<!--        <el-input v-else v-model="form.duty" autocomplete="off" />-->
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" align="right">
      <el-button size="mini" @click="back()">取 消</el-button>
      <el-button size="mini" type="primary" @click="cId?getEdit():getAdd()">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { rootUpdateClub, clubInfo, addClub, upload } from '@/api/club'

export default {
  name: 'ClubDialogue',
  props: {
    cId: {
      require: false,
      type: [String, Number]
    },
    flag: {
      require: true,
      type: [String, Number]
    }
  },
  data() {
    return {
      action: 'http://127.0.0.1:3000/public/upload/' + name,
      form: {
        cid: '',
        uid: '',
        cname: '',
        teacher: '',
        startDate: [],
        endDate: [],
        createAt: [],
        introduction: '',
        img: '',
        file: '',
        duty: '',
        appImage: '',
        appStatus: ''
      },
      formLabelWidth: '80px',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
    }
  },
  watch: {
    cId() {
      // this.form.cid = this.cId
      this.getDetail()
    }
  },
  mounted() {
    if (this.cId) {
      this.getDetail()
    } else {
      console.log(this.cId, this.flag)
    }
  },
  methods: {
    getDetail() {
      clubInfo({ cid: this.cId }).then(response => {
        // const form = response.data.filter(item => item.cid === this.cId)
        // const fileUrl = form[0].appImage.replace(/\\/g, '/').replace(/public/, '')
        // console.log(response.data)
        response.data.appImage = process.env.VUE_APP_BASE_API + '/' + response.data.appImage
        // this.form['appImage'] = 'http://127.0.0.1:3000' + fileUrl
        // console.log(form)
        this.form = response.data
      })
    },
    getEdit() {
      rootUpdateClub(this.form).then(response => {
        if (response.code === 20000) {
          this.$notify({
            title: 'Success',
            message: 'Update Successfully',
            type: 'success',
            duration: 2000
          })
          this.$emit('close-dialogue', false)
        }
      })
    },
    getAdd() {
      console.log('2')
      addClub(this.form).then(response => {
        if (response.code === 20000) {
          this.$notify({
            title: 'Success',
            message: 'Update Successfully',
            type: 'success',
            duration: 2000
          })
          this.$emit('close-dialogue', false)
        }
      })
    },
    back() {
      this.$emit('close-dialogue', false)
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
    },
    uploads() {
      const formData = new FormData()
      // console.log(this.$refs.upload)
      const file = this.$refs.upload.uploadFiles[0]
      // console.log(file)
      // console.log(file.raw)
      // const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' }}
      if (!file) { // 若未选择文件
        alert('请选择文件')
        return
      }
      formData.append('file', file.raw)
      upload(formData).then(response => {
        console.log(response)
        this.form.appImage = response.data.path
        console.log(this.form.appImage)
      })
    }
  }
}
</script>
<style scoped>

</style>
