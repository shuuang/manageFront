<template>
  <div class="usersDialogue">
    <el-form v-if="flag==='repwd'">
      <el-form-item label="设置新密码" label-width="100px">
        <el-input v-model="password" autocomplete="off" />
      </el-form-item>
    </el-form>
    <el-form v-else :model="form" size="mini">
      <el-form-item v-if="flag=='detail'" label="用户" :label-width="formLabelWidth">
        <span v-if="form.role==0">非社联成员</span>
        <span v-else>社联成员</span>
      </el-form-item>
      <el-form-item v-else label="用户" :label-width="formLabelWidth">
        <el-select v-model="form.role" placeholder="请选择权限">
          <el-option label="非社联成员" value="0" />
          <el-option label="社联成员" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="学号" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.stuNumber }}</span>
        <el-input v-else v-model="form.stuNumber" autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.realname }}</span>
        <el-input v-else v-model="form.realname" autocomplete="off" />
      </el-form-item>
      <el-form-item v-if="flag=='detail'" label="性别" :label-width="formLabelWidth">
        <span v-if="form.gender=='0'">男</span>
        <span v-else>女</span>
      </el-form-item>
      <el-form-item v-else label="性别" :label-width="formLabelWidth">
        <el-select v-model="form.gender" placeholder="请选择性别">
          <el-option label="男" value="0" />
          <el-option label="女" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="行政班级" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.class }}</span>
        <el-input v-else v-model="form.class" autocomplete="off" />
      </el-form-item>
      <el-form-item label="电子邮箱" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.email }}</span>
        <el-input v-else v-model="form.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.phone }}</span>
        <el-input v-else v-model="form.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="微信" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.wechat }}</span>
        <el-input v-else v-model="form.wechat" autocomplete="off" />
      </el-form-item>
      <el-form-item label="QQ" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.qq }}</span>
        <el-input v-else v-model="form.qq" autocomplete="off" />
      </el-form-item>
      <el-form-item label="出生日期" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.birthday }}</span>
        <el-input v-else v-model="form.birthday" autocomplete="off" />
      </el-form-item>
      <el-form-item label="住址" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.home }}</span>
        <el-input v-else v-model="form.home" autocomplete="off" />
      </el-form-item>
      <el-form-item label="民族" :label-width="formLabelWidth">
        <span v-if="flag==='detail'">{{ form.nation }}</span>
        <el-input v-else v-model="form.nation" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" align="right">
      <el-button size="mini" @click="back">取 消</el-button>
      <el-button size="mini" v-if="flag==='repwd'" type="primary" @click="rePwd()">确 定</el-button>
      <el-button size="mini" v-else type="primary" @click="getEdit()">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { rootUser, rootUpdate, addRoot, rootrePwd } from '@/api/myuser'

export default {
  name: 'UsersDialogue',
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
      password: '',
      formLabelWidth: '80px'
    }
  },
  watch: {
    uId() {
      this.form.uid = this.uId
      this.getDetail()
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
          response.data.role = response.data.role.toString()
          this.form = response.data
        }
      })
    },
    getEdit() {
      addRoot({ uid: this.uId, role: this.form.role }).then(response => {
        this.$notify({
          title: 'Success',
          message: 'role update Successfully',
          type: 'success',
          duration: 2000
        })
      })
      rootUpdate(this.form).then(response => {
        console.log('getedit', response)
        console.log(this.form)
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
    rePwd() {
      rootrePwd({ uid: this.uId, password: this.password }).then(response => {
        if (response.code === 20000) {
          this.$notify({
            title: 'Success',
            message: 'change password Successfully',
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
