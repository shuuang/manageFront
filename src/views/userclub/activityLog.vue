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
          <el-form-item label="记录评论数">
            <span>{{ props.row.alcounts }}</span>
          </el-form-item>
          <el-form-item label="图片">
            <img width="100px" height="100px" style="margin: 0px 2px" v-for="item in props.row.img.img" :src="'http://localhost:3000/' + item"/>
          </el-form-item>
          <el-form-item label="视频">
<!--            <span>{{ props.row.video }}</span>-->
            <video width="100%" height="100%" v-for="item in props.row.video.video" :src="'http://localhost:3000/' + item"/>
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
        response.data.filter(item => {
          item.img = JSON.parse(item.img)
          item.video = JSON.parse(item.video)
        })
        // console.log(response.data)
        // this.img = response.data.img.img
        // this.video = response.data.video.video
        this.tableData = response.data
        console.log(this.tableData)
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
