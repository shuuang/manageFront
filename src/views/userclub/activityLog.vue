<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="记录ID">
            <span>{{ props.row.alid }}</span>
          </el-form-item>
          <el-form-item label="活动ID">
            <span>{{ props.row.aid }}</span>
          </el-form-item>
          <el-form-item label="活动记录">
            <span>{{ props.row.alintroduction }}</span>
          </el-form-item>
          <el-form-item label="记录时间">
            <span>{{ props.row.aldate }}</span>
          </el-form-item>
          <el-form-item label="社团ID">
            <span>{{ props.row.cid }}</span>
          </el-form-item>
          <el-form-item label="图片">
            <span>{{ props.row.img }}</span>
          </el-form-item>
          <el-form-item label="视频">
            <span>{{ props.row.video }}</span>
          </el-form-item>
          <el-form-item label="记录评论数">
            <span>{{ props.row.alcounts }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="活动记录ID"
      prop="alid">
    </el-table-column>
    <el-table-column
      label="活动ID"
      prop="aid">
    </el-table-column>
    <el-table-column
      label="记录时间"
      prop="aldate">
    </el-table-column>
    <el-table-column label="Actions" width="150px">
      <template slot-scope="{row}">
        <el-button plain type="danger" size="mini" @click="delLog(row.alid)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { logList, delLog } from '@/api/activityLog'

export default {
  name: "activityLog",
  props: {
    cId: {
      required: true
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getList()
  },
  watch: {
    cId() {
      this.getList()
    }
  },
  methods: {
    getList() {
      logList({ cid: this.cId }).then(response => {
        console.log(response)
        this.tableData = response.data
      })
    },
    delLog(alid) {
      console.log(alid)
      delLog({ cid: this.cId, alid: alid }).then(response => {
        if (response.code === 20000) {
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          this.getList()
        }
      })
    }
  }
}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>
