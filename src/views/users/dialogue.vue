<template>
  <el-dialog :title="config.title" :visible.sync="dialogFormVisible" width="30%">
    <el-form>
      <el-form-item v-for="(item,key) in list" :key="item" :label="item[0]" :label-width="formLabelWidth">
        <span v-if="config.type=='detail'">{{ checkSelect(formArr[key],item[2]) }}</span>
        <el-input v-if="config.type=='edit'&&item[1]=='input'" v-model="formArr[key]">{{ formArr[key] }}</el-input>
        <el-select v-if="config.type=='edit'&&item[1]=='select'" v-model="formArr[key]" placeholder="请选择性别">
<!--          <el-option label="nan" value="0"/>-->
          <el-option v-for="options in item[2]" :label=options.name :value=options.value :key='options.value'/>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" align="right" v-if="config.type=='edit'">
      <el-button size="mini" @click="back">取 消</el-button>
      <el-button size="mini" type="primary" @click="updateForm()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { apiName } from '@/api/api'

export default {
  name: 'Dialogue',
  props: {
    // config: {
    //   require: true,
    //   type: Object
    // },
    // list: {
    //   require: true,
    //   type: Object
    // },
    // dialogFormVisible: {
    //   require: true,
    //   type: Boolean
    //   // default: true
    // }
  },
  data() {
    return {
      formLabelWidth: '120px',
      formArr: {}, // 返回的数据
      dialogFormVisible: this.$parent.dialogFormVisible,
      config: this.$parent.config,
      // config: {
      //   title: '详情',
      //   type: 'detail',
      //   infoapi: {},
      //   updateapi: {}
      // },
      // 设置的
      list: this.$parent.list
      // list: {
      //   cid: ['社团ID', 'input'],
      //   gender: ['性别', 'select', [{ name: '男', value: 0 }, { name: '女', value: 1 }]]
      // }
      // label: { cid: '社团ID', cname: '社团名称' },
      // type: { cid: 'input', cname: 'span' },
      // dialogFormVisible: false
    }
  },
  watch: {
    dialogFormVisible() {
      if (this.dialogueVisible) {
        console.log('this.config')
        this.config = this.$parent.config
        console.log(this.config)
        this.getForm()
      }
    }
  },
  mounted() {
    if (this.dialogFormVisible) {
      console.log(this.dialogFormVisible)
      // this.getDetail()
    }
  },
  methods: {
    checkSelect(formkey, value) {
      if (value) {
        console.log(formkey)
        console.log(value)
        console.log(value.filter(item => item.value === formkey)[0].name)
        // formkey = this.list[formkey][2].filter(item => item.value === formkey)[0].name
        return value.filter(item => item.value === formkey)[0].name
      } else {
        return formkey
      }
    },
    getForm() {
      apiName(this.config.infoapi).then(response => {
        console.log(response.data)
        console.log('getForm', response.data)
        this.formArr = response.data
      })
    },
    updateForm() {
      this.config.updateapi.data = this.formArr
      apiName(this.config.updateapi).then(response => {
        console.log(response.data)
        if (response.code === 20000) {
          this.$notify({
            title: 'Success',
            message: 'Update Successfully',
            type: 'success',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
