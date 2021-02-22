<template>
  <div class="clubDialogue">
    <el-form :model="form" size="mini">
      <el-form-item label="社团名称" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.cname }}</span>
        <el-input v-else v-model="form.cname" autocomplete="off" />
      </el-form-item>
      <el-form-item v-if="flag==='detail'||flag==='add'" label="社长" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.users.realname }}</span>
        <el-select v-else v-model="form.value" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="指导老师" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.teacher }}</span>
        <el-input v-else v-model="form.teacher" autocomplete="off" />
      </el-form-item>
      <el-form-item v-if="flag==='detail'||flag==='add'"  label="创建时间" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.createAt }}</span>
        <el-date-picker
          v-else
          v-model="value"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="简介" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.introduction }}</span>
        <el-input v-else type="textarea" autosize v-model="form.introduction" autocomplete="off" />
      </el-form-item>
      <el-form-item v-if="flag==='detail'||flag==='add'"  label="社团Logo" :label-width="formLabelWidth">
        <el-image
          v-if="flag==='detail'"
          style="width: 100px; height: 100px"
          :src=form.img
          fit="cover"
        />
        <el-upload
          v-else
          :action="action"
          name="file"
          ref="imgFile"
          :http-request="imgUpload"
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
          </span>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="flag==='detail'||flag==='add'"  label="申请材料" :label-width="formLabelWidth">
        <el-image
          v-if="flag==='detail'"
          style="width: 100px; height: 100px"
          :src=form.file
          fit="cover"
        />
        <el-upload
          v-else
          :action="action"
          name="file"
          ref="fileFile"
          :http-request="fileUpload"
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
          </span>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="flag==='detail'||flag==='add'"  label="申请照片" :label-width="formLabelWidth">
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
          ref="appImageFile"
          :http-request="appImageUpload"
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
          </span>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="值班表" :label-width="formLabelWidth">
        <el-image
          v-if="flag==='detail'"
          style="width: 100px; height: 100px"
          :src=form.duty
          fit="cover"
        />
        <el-upload
          v-else
          :action="action"
          name="file"
          ref="dutyFile"
          :http-request="dutyUpload"
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
          </span>
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" align="right">
<!--      <el-button size="mini" @click="test()">取 消</el-button>-->
      <el-button size="mini" @click="back()">取 消</el-button>
      <el-button size="mini" type="primary" @click="cId?getEdit():getAdd()">确 定</el-button>
    </div>
    <el-dialog :visible.sync="ImgBig">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { rootUpdateClub, clubInfo, addClub, upload } from '@/api/club'
import { usersList } from '@/api/myuser'

export default {
  name: 'ClubDialogue',
  props: {
    cId: {
      require: false,
      type: [String, Number]
    },
    flag: {
      // add edit detail
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
        appStatus: '',
        users: [
          { realname: '' }
        ]
      },
      formLabelWidth: '80px',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      ImgBig: false,
      options: [],
      value: ''
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
  created() {
    this.getList()
  },
  methods: {
    // test() {
    //   console.log(this.value)
    // },
    getDetail() {
      clubInfo({ cid: this.cId }).then(response => {
        // const form = response.data.filter(item => item.cid === this.cId)
        // const fileUrl = form[0].appImage.replace(/\\/g, '/').replace(/public/, '')
        // console.log(response.data)
        // response.data.appImage = process.env.VUE_APP_BASE_API + '/' + response.data.appImage
        // response.data.appImage = process.env.VUE_APP_BASE_API + '/' + response.data.appImage
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
      // console.log(this.form)
      this.form.createAt = this.value
      console.log(this.form)
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
      this.ImgBig = true
    },
    handleDownload(file) {
      console.log(file)
    },
    dutyUpload() {
      const formData = new FormData()
      // console.log(this.$refs.upload)
      const file = this.$refs.dutyFile.uploadFiles[0]
      // console.log(file)
      // console.log(file.raw)
      // const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' }}
      if (!file) { // 若未选择文件
        alert('请选择文件')
        return
      }
      formData.append('file', file.raw)
      upload(formData).then(response => {
        // console.log(response)
        this.form.duty = 'http://localhost:3000/' + response.data.path
        // console.log(this.form.duty)
      })
    },
    appImageUpload() {
      const formData = new FormData()
      const file = this.$refs.appImageFile.uploadFiles[0]
      if (!file) { // 若未选择文件
        alert('请选择文件')
        return
      }
      formData.append('file', file.raw)
      upload(formData).then(response => {
        // console.log(response)
        this.form.appImage = 'http://localhost:3000/' + response.data.path
        // console.log(this.form.appImage)
      })
    },
    fileUpload() {
      const formData = new FormData()
      const file = this.$refs.fileFile.uploadFiles[0]
      if (!file) { // 若未选择文件
        alert('请选择文件')
        return
      }
      formData.append('file', file.raw)
      upload(formData).then(response => {
        // console.log(response)
        this.form.file = 'http://localhost:3000/' + response.data.path
        // console.log(this.form.appImage)
      })
    },
    imgUpload() {
      const formData = new FormData()
      const file = this.$refs.imgFile.uploadFiles[0]
      if (!file) { // 若未选择文件
        alert('请选择文件')
        return
      }
      formData.append('file', file.raw)
      upload(formData).then(response => {
        // console.log(response)
        this.form.img = 'http://localhost:3000/' + response.data.path
        // console.log(this.form.img)
      })
    },
    getList() {
      usersList().then(response => {
        // console.log(response)
        // console.log(response)
        const list = response.data.map(item => {
          return {
            value: item.uid,
            label: item.realname
          }
        })
        this.options = list
        console.log(this.options)
      })
    }
  }
}
</script>
<style scoped>

</style>
