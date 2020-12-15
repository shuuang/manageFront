<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%">
    <el-form>
      <el-form-item v-for="(item,key) in list" :key="item" :label="item" :label-width="formLabelWidth">
        <span v-if="type[key]=='span'">{{ formArr[key] }}</span>
        <el-input v-if="type[key]=='input'" v-model="formArr[key]">{{ formArr[key] }}</el-input>
        <!--        <el-input v-model="item.cname" autocomplete="off"></el-input>-->
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'Dialogue',
  data() {
    return {
      formLabelWidth: '120px',
      formArr: { cid: '1', cname: '社团' },
      title: '',
      list: { cid: '社团ID', cname: '社团名称' },
      type: { cid: 'input', cname: 'span' },
      dialogFormVisible: true
    }
  }
}
</script>

<style scoped>

</style>
