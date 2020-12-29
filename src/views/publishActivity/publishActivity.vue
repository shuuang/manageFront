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
          <el-button plain v-if="checkPermission(['editor'])" type="info" size="mini" @click="Dialog(row.aid, 'sign')">
            报名
          </el-button>
          <el-button plain v-if="checkPermission(['editor'])" size="mini" @click="Dialog(row.aid, 'status')">
            状态
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="34%">
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
    <el-dialog :title="title" :visible.sync="signStatus" width="30%">
      <el-form label-width="80px" :model="appactivity">
        <el-form-item label="社团">
          <el-input v-model="appactivity.cid"></el-input>
        </el-form-item>
        <el-form-item label="报名人">
          <el-input v-model="appactivity.aaName"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="appactivity.aaConnect"></el-input>
        </el-form-item>
        <el-form-item label="文件">
          <el-input v-model="appactivity.aafile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="right">
        <el-button size="mini" @click="back()">取 消</el-button>
        <el-button size="mini" type="primary" @click="appActivity()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { publishActivity } from '@/api/activity'
import { listForActivity, signActivity } from '@/api/activityapp'
import checkPermission from "@/utils/permission";

export default {
  name: "publishActivity",
  data() {
    return {
      dialogFormVisible: false,
      signStatus: false,
      activityapplist: [],
      appclub: [],
      appactivity: {
        cid: '',
        aaName: '',
        aaConnect: '',
        aafile: '',
        aid: ''
      }
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
      // console.log('press')
      listForActivity({ aid: aid }).then(response => {
        this.appclub = response.data
        console.log(this.appclub)
      })
    },
    Dialog(aid, tag) {
      if (tag === 'sign') {
        this.title = '活动报名'
        this.signStatus = true
        this.appactivity.aid = aid
      }
      if (tag === 'status') {
        this.title = '报名状态'
        this.dialogFormVisible = true
        this.appactivity.aid = aid
      }
      console.log(aid)
    },
    appActivity() {
      console.log(this.appactivity)
      signActivity(this.appactivity).then(response => {
        // console.log(response)
        if (response.code === 20000) {
          this.$notify({
            title: 'Success',
            message: 'Sign Successfully',
            type: 'success',
            duration: 2000
          })
          this.signStatus = false
        }
      })
    },
    back() {
      this.dialogFormVisible = false
      this.signStatus = false
    }
  }
}
</script>

<style scoped>
</style>
