<template>
  <div class="app-container">
    <el-table
      :data="activitylist"
      style="width: 100%"
    >
      <el-table-column label="活动ID" prop="cid" width="80">
        <template slot-scope="{row}">
          <span>{{ row.aid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动名称" prop="cname">
        <template slot-scope="{row}">
          <span>{{ row.aName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创办社团" prop="teacher" width="120">
        <template slot-scope="{row}">
          <span>{{ row.cid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" prop="uid" width="180">
        <template slot-scope="{row}">
          <span>{{ row.startDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" prop="uid" width="180">
        <template slot-scope="{row}">
          <span>{{ row.endDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" width="420px">
        <template slot-scope="{row,$index}">
          <el-button plain type="info" size="mini" @click="Dialog(row.cid, flag='detail')">
            详情
          </el-button>
          <el-button size="mini" @click="Dialog(row.cid, flag='edit')">
            编辑
          </el-button>
          <el-button plain size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { rootActivityList, delActivity } from '@/api/activity'

export default {
  name: 'Activity',
  data() {
    return {
      activitylist: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      rootActivityList().then(response => {
        const form = response.data
        console.log(form)
        this.activitylist = response.data
      })
    },
    handleDelete(row, index) {
      delActivity({ aid: row.aid }).then(response => {
        console.log(response)
        if (response.code === 20000) {
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          this.activitylist.splice(index, 1)
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
