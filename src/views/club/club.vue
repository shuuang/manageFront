<template>
<div class="app-container">
  <el-table
    :data="clublist"
    style="width: 100%">
    <el-table-column label="社团ID" prop="cid" width="80">
      <template slot-scope="{row}">
        <span>{{ row.cid }}</span>
      </template>
    </el-table-column>
    <el-table-column label="社团名称" prop="cname" >
      <template slot-scope="{row}">
        <span>{{ row.cname }}</span>
      </template>
    </el-table-column>
    <el-table-column label="指导教师" prop="teacher" width="120">
      <template slot-scope="{row}">
        <span>{{ row.teacher }}</span>
      </template>
    </el-table-column>
    <el-table-column label="社长" prop="uid" width="80">
      <template slot-scope="{row}">
        <span>{{ row.uid }}</span>
      </template>
    </el-table-column>
    <el-table-column label="创建时间" prop="uid" width="180">
      <template slot-scope="{row}">
        <span>{{ row.createAt }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Actions" width="420px">
      <template slot-scope="{row,$index}">
        <el-button plain type="info" size="mini" @click="Dialog(row.uid, flag='detail')">
          详情
        </el-button>
        <el-button size="mini" @click="Dialog(row.uid, flag='edit')">
          编辑
        </el-button>
        <el-button plain size="mini" type="danger" @click="handleDelete(row,$index)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%">
    <users-dialogue :flag="flag" :uId="cId" @close-dialogue="closeDialogue"></users-dialogue>
  </el-dialog>
</div>
</template>

<script>
import { clubList, delClub } from '@/api/club'

export default {
  name: "club",
  data() {
    return {
      clublist: [],
      dialogFormVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      clubList({ appStatus: '1' }).then(response => {
        if (response.code === 20000) {
          // console.log(response)
          this.clublist = response.data
        }
      })
    },
    Dialog(uid, flag) {
      this.dialogFormVisible = true
      this.uId = uid
      this.flag = flag
      if (flag === 'detail') {
        this.title = '社团详情'
      }
      if (flag === 'edit') {
        this.title = '社团编辑'
      }
    },
    handleDelete(row, index) {
      delClub({ cid: row.cid }).then(response => {
        console.log(response)
        if (response.code === 20000) {
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          this.clublist.splice(index, 1)
        }
      })
    },
    closeDialogue(payload) {
      console.log('payload', payload)
      this.dialogFormVisible = false
      if (!payload) {
        this.getList()
      }
    }
  }
}
</script>

<style scoped>

</style>
