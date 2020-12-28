<template>
  <div class="app-container">
    <el-table
      :data="activityapplist"
      style="width: 100%"
    >
      <el-table-column label="活动ID" prop="aid" width="80">
        <template slot-scope="{row}">
          <span>{{ row.aid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动名称" prop="cname">
        <template slot-scope="{row}">
          <span>{{ row.aName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创办社团" prop="cid" width="120">
        <template slot-scope="{row}">
          <span>{{ row.cid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" prop="startDate" width="180">
        <template slot-scope="{row}">
          <span>{{ row.startDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" prop="endDate" width="180">
        <template slot-scope="{row}">
          <span>{{ row.endDate }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="活动状态" width="140">-->
<!--        <template slot-scope="{row}">-->
<!--          <el-tag v-show="row.astatus==0" type="info">审核中</el-tag>-->
<!--          <el-tag v-show="row.astatus==1" type="success">已通过</el-tag>-->
<!--          <el-tag v-show="row.astatus==2" type="warning">未通过</el-tag>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="Actions" width="360px">
        <template slot-scope="{row}">
          <el-button plain v-if="checkPermission(['admin'])" type="info" size="mini" @click="appClub(row.aid)">
            查看报名社团
          </el-button>
          <el-button plain v-if="checkPermission(['editor'])" type="info" size="mini" @click="appActivity(row.aid)">
            报名
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%">
      <el-table
        :data="appclub"
        style="width: 100%">
        <el-table-column label="报名ID" prop="aaid" width="80">
          <template slot-scope="{row}">
            <span>{{ row.aaid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="社团" prop="cname" width="80">
          <template slot-scope="{row}">
            <span>{{ row.club.cname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="报名人" prop="cname" width="180">
          <template slot-scope="{row}">
            <span>{{ row.aaName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="报名人联系方式" prop="cname" width="180">
          <template slot-scope="{row}">
            <span>{{ row.aaConnect }}</span>
          </template>
        </el-table-column>
        <el-table-column label="文件" prop="cname" width="80">
          <template slot-scope="{row}">
            <span>{{ row.aafile }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { publishActivity } from '@/api/activity'
import { listForActivity } from '@/api/activityapp'
import checkPermission from "@/utils/permission";

export default {
  name: "publishActivity",
  data() {
    return {
      dialogFormVisible: false,
      activityapplist: [],
      appclub: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    checkPermission,
    getList() {
      publishActivity().then(response => {
        console.log('list', response)
        this.activityapplist = response.data
      })
    },
    appClub(aid) {
      this.title = '活动报名社团'
      this.dialogFormVisible = true
      console.log('press')
      listForActivity({ aid: aid }).then(response => {
        this.appclub = response.data
        console.log(this.appclub)
      })
    }
  }
}
</script>

<style scoped>
</style>
