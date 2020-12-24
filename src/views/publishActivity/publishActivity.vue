<template>
  <div class="app-container">
    <el-table
      :data="activityapplist"
      style="width: 100%"
    >
      <el-table-column width="30px">
        <template>
          <el-button type="text"><i class="el-icon-arrow-right"></i></el-button>
        </template>
      </el-table-column>
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
      <el-table-column label="活动状态" width="140">
        <template slot-scope="{row}">
          <el-tag v-show="row.astatus==0" type="info">审核中</el-tag>
          <el-tag v-show="row.astatus==1" type="success">已通过</el-tag>
          <el-tag v-show="row.astatus==2" type="warning">未通过</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { publishActivity } from '@/api/activity'

export default {
  name: "publishActivity",
  data() {
    return {
      activityapplist: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      publishActivity().then(response => {
        console.log('list', response)
        this.activityapplist = response.data
      })
    }
  }
}
</script>

<style scoped>

</style>
