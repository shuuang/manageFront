<template>
  <el-dialog :title="config.title" :visible.sync="dialogFormVisible" width="30%">
    <el-form>
      <el-form-item v-for="(item,key) in list" :key="item" :label="item[0]" :label-width="formLabelWidth">
        <span v-if="config.type=='detail'">{{ formArr[key] }}</span>
        <el-input v-if="config.type=='edit'&&item[1]=='input'" v-model="formArr[key]">{{ formArr[key] }}</el-input>
        <el-select v-if="config.type=='edit'&&item[1]=='select'" v-model="formArr[key]" placeholder="请选择性别">
<!--          <el-option label="nan" value="0"/>-->
          <el-option v-for="options in item[2]" :label=options.name :value=options.value :key='options.value'/>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" align="right" v-if="config.type=='edit'">
      <el-button size="mini" @click="back">取 消</el-button>
      <el-button size="mini" type="primary" @click="getEdit()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'Dialogue',
  data() {
    return {
      formLabelWidth: '120px',
      formArr: { cid: '1', gender: 0 }, // 返回的数据
      config: {
        title: '详情',
        type: 'detail'
      },
      // 设置的
      list: {
        cid: ['社团ID', 'input'],
        gender: ['性别', 'select', [{ name: '男', value: 0 }, { name: '女', value: 1 }]]
      },
      // label: { cid: '社团ID', cname: '社团名称' },
      // type: { cid: 'input', cname: 'span' },
      dialogFormVisible: true
    }
  }
}
</script>

<style scoped>

</style>
