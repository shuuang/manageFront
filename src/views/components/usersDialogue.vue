<template>
  <div class="usersDialogue">
    <el-form :model="form">
      <el-form-item label="学号" :label-width="formLabelWidth">
<!--        <span v-if="flag==='detail'">{{ formData.teamDesc }}</span>-->
        <el-input v-model="form.stuNumber" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="form.realname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-input v-model="form.gender" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="行政班级" :label-width="formLabelWidth">
        <el-input v-model="form.class" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="微信" :label-width="formLabelWidth">
        <el-input v-model="form.wechat" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="QQ" :label-width="formLabelWidth">
        <el-input v-model="form.qq" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="出生日期" :label-width="formLabelWidth">
        <el-input v-model="form.birthday" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="住址" :label-width="formLabelWidth">
        <el-input v-model="form.home" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="民族" :label-width="formLabelWidth">
        <el-input v-model="form.nation" autocomplete="off"></el-input>
      </el-form-item>
<!--      <el-form-item label="活动区域" :label-width="formLabelWidth">-->
<!--        <el-select v-model="form.region" placeholder="请选择活动区域">-->
<!--          <el-option label="区域一" value="shanghai"></el-option>-->
<!--          <el-option label="区域二" value="beijing"></el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="getEdit()">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { rootUser, rootUpdate } from '@/api/myuser'

export default {
  name: "usersDialogue",
  props: {
    uId: {
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
      form: {
        role: '',
        uid: '',
        stuNumber: '',
        realname: '',
        gender: '',
        class: '',
        email: '',
        phone: '',
        wechat: '',
        qq: '',
        birthday: '',
        home: '',
        nation: ''
      },
      formLabelWidth: '120px'
    }
  },
  mounted() {
    if (this.uId) {
      console.log(this.uId, this.flag)
      this.getDetail()
    }
  },
  methods: {
    getDetail() {
      rootUser({ uid: this.uId }).then(response => {
        console.log('getdetail', response)
        if (response.code === 20000) {
          this.form = response.data
        }
      })
    },
    getEdit() {
      rootUpdate(this.form).then(response => {
        console.log('getedit', response)
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
    }
  }
}
</script>

<style scoped>

</style>
