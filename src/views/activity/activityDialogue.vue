<template>
  <div class="activityDialogue">
    <el-form :model="form" size="mini">
      <el-form-item label="活动名称" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.aName }}</span>
        <el-input v-else v-model="form.aName" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="开始时间" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.startDate }}</span>
        <div v-else class="block">
          <el-date-picker
            v-model="form.startDate"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择开始日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="结束时间" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.endDate }}</span>
        <div v-else class="block">
          <el-date-picker
            v-model="form.endDate"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择结束日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="活动简介" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.aIntroduction }}</span>
        <el-input v-else v-model="form.aIntroduction" autocomplete="off"/>
      </el-form-item>
      <el-form-item v-if="flag==='detail'||flag==='clubappactivity'" label="社团" :label-width="formLabelWidth">
        <span v-if="flag==='detail'||flag==='clubappactivity'">{{ form.club.cname||cName }}</span>
<!--        <el-input v-else autosize v-model="form.club.cname" autocomplete="off"/>-->
<!--        <span>社联</span>-->
      </el-form-item>
      <el-form-item label="活动地点" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.location }}</span>
        <el-input v-else v-model="form.location" autocomplete="off"/>
      </el-form-item>
      <el-form-item v-if="flag==='detail'" label="创办单位" :label-width="formLabelWidth">
        <span v-if="form.department==0">社联</span>
        <span v-if="form.department==1">社团</span>
      </el-form-item>
      <el-form-item v-if="flag==='detail'||flag==='clubappactivity'||flag==='build'" label="相关文件" :label-width="formLabelWidth">
        <el-image
          v-if="flag==='detail'"
          style="width: 100px; height: 100px"
          :src="form.aafile"
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
      </el-form-item>
      <!--      <el-form-item v-if="flag==='edit'" label="创办单位" :label-width="formLabelWidth">-->
      <!--        <span>{{ form.department }}</span>-->
      <!--        <el-input v-model="form.department" autocomplete="off" />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="相关" :label-width="formLabelWidth">-->
      <!--        <el-image-->
      <!--          v-if="flag==='detail'"-->
      <!--          style="width: 100px; height: 100px"-->
      <!--          :src="form.aafile"-->
      <!--          fit="cover"-->
      <!--        />-->
      <!--        <el-upload-->
      <!--          v-else-->
      <!--          :action="action"-->
      <!--          name="file"-->
      <!--          ref="upload"-->
      <!--          :http-request="uploads"-->
      <!--          list-type="picture-card"-->
      <!--          :auto-upload="true"-->
      <!--          multiple-->
      <!--        >-->
      <!--          <i slot="default" class="el-icon-plus"></i>-->
      <!--          <div slot="file" slot-scope="{file}" >-->
      <!--            <img-->
      <!--              class="el-upload-list__item-thumbnail"-->
      <!--              :src="file.url"-->
      <!--            >-->
      <!--            <span class="el-upload-list__item-actions">-->
      <!--            <span-->
      <!--              class="el-upload-list__item-preview"-->
      <!--              @click="handlePictureCardPreview(file)"-->
      <!--            >-->
      <!--              <i class="el-icon-zoom-in"></i>-->
      <!--            </span>-->
      <!--            <span-->
      <!--              v-if="!disabled"-->
      <!--              class="el-upload-list__item-delete"-->
      <!--              @click="handleDownload(file)"-->
      <!--            >-->
      <!--              <i class="el-icon-download"></i>-->
      <!--            </span>-->
      <!--            <span-->
      <!--              v-if="!disabled"-->
      <!--              class="el-upload-list__item-delete"-->
      <!--              @click="handleRemove(file)"-->
      <!--            >-->
      <!--              <i class="el-icon-delete"></i>-->
      <!--            </span>-->
      <!--          </span>-->
      <!--          </div>-->
      <!--        </el-upload>-->
      <!--        <el-dialog :visible.sync="dialogVisible">-->
      <!--          <img width="100%" :src="dialogImageUrl" alt="">-->
      <!--        </el-dialog>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="活动状态" :label-width="formLabelWidth">-->
      <!--        <span v-if="flag==='detail'">{{ form.astatus }}</span>-->
      <!--        <el-input v-else v-model="form.astatus" autocomplete="off" />-->
      <!--      </el-form-item>-->
    </el-form>
    <div slot="footer" class="dialog-footer" align="right">
      <el-button size="mini" @click="back()">取 消</el-button>
      <el-button size="mini" type="primary" @click="aId?getEdit():getAdd()">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { updateActivity, activityInfo, addActivity, appActivity } from '@/api/activity'
import checkPermission from '@/utils/permission'
import { upload } from '@/api/club'

export default {
  name: 'ActivityDialogue',
  props: {
    aId: {
      require: false,
      type: [String, Number]
    },
    flag: {
      require: true,
      type: [String, Number]
    },
    cId: {
      require: false,
      type: Number
    },
    cName: {
      require: true
    }
  },
  data() {
    return {
      action: 'http://127.0.0.1:3000/public/upload/' + name,
      form: {
        aName: '',
        club: [
          { cname: '' }
        ]
      },
      formLabelWidth: '80px',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
    }
  },
  watch: {
    aId() {
      // this.form.cid = this.cId
      this.getDetail()
    }
  },
  created() {
    console.log(this.cId, this.flag)
  },
  mounted() {
    if (this.aId) {
      this.getDetail()
    }
  },
  methods: {
    getDetail() {
      activityInfo({ aid: this.aId }).then(response => {
        // const form = response.data.filter(item => item.cid === this.cId)
        // const fileUrl = form[0].appImage.replace(/\\/g, '/').replace(/public/, '')
        // console.log(response.data)
        // response.data.appImage = process.env.VUE_APP_BASE_API + '/' + response.data.appImage
        // this.form['appImage'] = 'http://127.0.0.1:3000' + fileUrl
        // console.log(response)
        // console.log(response.data.aafile)
        response.data.aafile = process.env.VUE_APP_BASE_API + '/' + response.data.aafile
        // console.log(response.data.aafile)
        this.form = response.data
      })
    },
    getEdit() {
      console.log('edit')
      updateActivity(this.form).then(response => {
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
      if (checkPermission(['admin'])) {
        this.form.cid = 33 // 社联的cid
        addActivity(this.form).then(response => {
          if (response.code === 20000) {
            this.$notify({
              title: 'Success',
              message: 'Create Successfully',
              type: 'success',
              duration: 2000
            })
            this.$emit('close-dialogue', false)
            // this.$emit('refresh', false)
          }
        })
      }
      if (checkPermission(['editor'])) {
        this.form.cid = this.cId
        appActivity(this.form).then(response => {
          if (response.code === 20000) {
            this.$notify({
              title: 'Success',
              message: 'App Successfully',
              type: 'success',
              duration: 2000
            })
            this.$emit('close-dialogue', false)
          }
        })
      }
    },
    back() {
      this.$emit('close-dialogue', false)
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
        this.form.aafile = response.data.path
        console.log(this.form.aafile)
      })
    }
    // handleRemove(file) {
    //   console.log(file)
    // },
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url
    //   this.dialogVisible = true
    // },
    // handleDownload(file) {
    //   console.log(file)
    // },
    // uploads() {
    //   const formData = new FormData()
    //   // console.log(this.$refs.upload)
    //   const file = this.$refs.upload.uploadFiles[0]
    //   // console.log(file)
    //   // console.log(file.raw)
    //   // const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' }}
    //   if (!file) { // 若未选择文件
    //     alert('请选择文件')
    //     return
    //   }
    //   formData.append('file', file.raw)
    //   upload(formData).then(response => {
    //     console.log(response)
    //     this.form.appImage = response.data.path
    //     console.log(this.form.appImage)
    //   })
    // }
  }
}
</script>
<style scoped>

</style>
