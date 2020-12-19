<template>
  <div class="clubDialogue">
    <el-form :model="form" size="mini">
      <el-form-item label="社团名称" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.cname }}</span>
        <el-input v-else v-model="form.cname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="社长" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.uid }}</span>
        <el-input v-else v-model="form.uid" autocomplete="off" />
      </el-form-item>
      <el-form-item label="指导老师" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.teacher }}</span>
        <el-input v-else v-model="form.teacher" autocomplete="off" />
      </el-form-item>
      <el-form-item label="创建时间" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.createAt }}</span>
        <el-input v-else v-model="form.createAt" autocomplete="off" />
      </el-form-item>
      <el-form-item label="简介" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.introduction }}</span>
        <el-input v-else type="textarea" autosize v-model="form.introduction" autocomplete="off" />
      </el-form-item>
      <el-form-item label="社团Logo" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.img }}</span>
        <el-input v-else v-model="form.img" autocomplete="off" />
      </el-form-item>
      <el-form-item label="申请材料" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.file }}</span>
        <el-input v-else v-model="form.file" autocomplete="off" />
      </el-form-item>
      <el-form-item label="申请照片" :label-width="formLabelWidth">
        <el-image
          v-if="flag==='detail'"
          style="width: 100px; height: 100px"
          :src="form.appImage"
          fit="cover"
        />
      </el-form-item>
      <el-form-item label="值班表" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.duty }}</span>
        <el-input v-else v-model="form.duty" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" align="right">
      <el-button size="mini" @click="back">取 消</el-button>
      <el-button size="mini" type="primary" @click="getEdit()">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { rootUpdateClub, clubInfo } from '@/api/club'

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
      uploadUrl: 'http://127.0.0.1:3000/public/upload/' + name,
      form: {
        cid: '',
        uid: '',
        cname: '',
        teacher: '',
        createAt: '',
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
      this.form.cid = this.cId
      this.getDetail()
    }
  },
  mounted() {
    if (this.cId) {
      // console.log(this.cId, this.flag)
      this.getDetail()
    }
  },
  methods: {
    getDetail() {
      clubInfo({ cid: this.cId }).then(response => {
        // const form = response.data.filter(item => item.cid === this.cId)
        // const fileUrl = form[0].appImage.replace(/\\/g, '/').replace(/public/, '')
        // form[0]['appImage'] = 'http://127.0.0.1:3000' + fileUrl
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
    back() {
      this.$emit('close-dialogue', false)
    }
  }
}
</script>
<style scoped>

</style>
