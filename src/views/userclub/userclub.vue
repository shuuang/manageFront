<template>
<div class="app-container">
  <el-table
    :data="userclub"
    style="width: 100%"
  >
    <el-table-column label="社团成员ID" prop="cuid" width="100">
      <template slot-scope="{row}">
        <span>{{ row.cid }}</span>
      </template>
    </el-table-column>
    <el-table-column label="社团" prop="cid">
      <template slot-scope="{row}">
        <span>{{ row.club.cname }}</span>
      </template>
    </el-table-column>
    <el-table-column label="权限" prop="privilege" width="140">
      <template slot-scope="{row}">
        <span v-if="row.privilege==0">社员</span>
        <span v-if="row.privilege==1">部长</span>
        <span v-if="row.privilege==2">社长</span>
      </template>
    </el-table-column>
    <el-table-column label="加入年份" prop="uappyear" width="140">
      <template slot-scope="{row}">
        <span>{{ row.uappyear }}</span>
      </template>
    </el-table-column>
    <el-table-column label="社团状态" width="160">
      <template slot-scope="{row}">
        <el-tag v-show="row.status==0" type="info">审核中</el-tag>
        <el-tag v-show="row.status==1" type="success">已通过</el-tag>
        <el-tag v-show="row.status==2" type="warning">未通过</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="Actions" width="650px">
      <template slot-scope="{row}">
        <el-button plain type="primary" size="mini" @click="Dialog(row.cid, 'clubuser')">
          社团成员
        </el-button>
        <el-button plain type="primary" size="mini" @click="Dialog(row.cid, 'member')">
          人员记录
        </el-button>
        <el-button plain type="info" size="mini" @click="Dialog(row.cid, 'activityapp')">
          报名活动
        </el-button>
        <el-button plain type="info" size="mini" @click="Dialog(row.cid, 'clubappactivity', row.club.cname)">
          申请活动
        </el-button>
        <el-button plain type="info" size="mini" @click="getClubActivityList(row.cid)">
          社团活动
        </el-button>
        <el-button plain type="info" size="mini" @click="Dialog(row.cid, 'activitylog')">
          活动记录
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-drawer
    title="社团成员"
    :visible.sync="table"
    direction="rtl"
    size="60%">
    <el-table :data="gridData">
      <el-table-column property="cuid" label="用户ID" width="70"></el-table-column>
      <el-table-column property="users.realname" label="用户"></el-table-column>
      <el-table-column label="权限" prop="privilege" width="80">
        <template slot-scope="{row}">
          <span v-if="row.privilege==0">社员</span>
          <span v-if="row.privilege==1">部长</span>
          <span v-if="row.privilege==2">社长</span>
        </template>
      </el-table-column>
      <el-table-column label="用户状态" width="140">
        <template slot-scope="{row}">
          <el-tag v-show="row.status==0" type="info">审核中</el-tag>
          <el-tag v-show="row.status==1" type="success">已通过</el-tag>
          <el-tag v-show="row.status==2" type="warning">未通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column property="uappyear" label="加入年份" width="200"></el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="{row}">
<!--          <el-button plain type="info" size="mini" @click="Dialog(row.cid, 'detail')">-->
<!--            详情-->
<!--          </el-button>-->
          <el-button v-show="row.status==0" plain size="mini" type="success" @click="check(row, '1')">
            审核通过
          </el-button>
          <el-button v-show="row.status==0" plain size="mini" type="danger" @click="check(row,  '2')">
            审核不通过
          </el-button>
          <el-button v-show="row.status==1&&row.privilege==0" plain size="mini" type="primary" @click="upPrivilege(row.cuid)">
            提升为部长
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-drawer>
  <el-drawer
    title="人员记录"
    :visible.sync="memberTable"
    direction="rtl"
    size="30%">
    <div style="float: right;margin-right: 10px">
      <el-button size="mini" icon="el-icon-thumb" @click="addRember(cid)">增加记录</el-button>
    </div>
    <el-table :data="memberData">
      <el-table-column property="cmid" label="记录ID" width="110"></el-table-column>
      <el-table-column property="num" label="新增数量"></el-table-column>
      <el-table-column property="year" label="年份" width="200"></el-table-column>
    </el-table>
  </el-drawer>
  <el-drawer
    title="报名活动状态"
    :visible.sync="appActivityTable"
    direction="rtl"
    size="50%">
    <el-table
      :data="appActivity"
      style="width: 100%">
      <el-table-column label="报名ID" prop="aaid" width="70">
        <template slot-scope="{row}">
          <span>{{ row.aaid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动" prop="cname" >
        <template slot-scope="{row}">
          <span>{{ row.activity.aName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报名人" prop="cname">
        <template slot-scope="{row}">
          <span>{{ row.aaName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报名人联系方式" prop="cname" width="180">
        <template slot-scope="{row}">
          <span>{{ row.aaConnect }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文件" prop="cname" width="130">
        <template slot-scope="{row}">
          <el-image
            style="width: 100px; height: 100px"
            :src="row.aafile"
            fit="cover"
          />
        </template>
      </el-table-column>
      <el-table-column label="Actions" width="150px">
        <template slot-scope="{row}">
          <el-button plain size="mini" type="info" @click="cancelSign(row.aaid)">
            取消报名
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-drawer>
  <el-drawer
    title="社团活动"
    :visible.sync="clubActivityTable"
    direction="rtl"
    size="60%">
    <el-table
      :data="clubActivity"
      style="width: 100%">
      <el-table-column label="活动ID" prop="aid" width="70">
        <template slot-scope="{row}">
          <span>{{ row.aid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动名称" prop="aname">
        <template slot-scope="{row}">
          <span>{{ row.aName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动地点" prop="location" width="120">
        <template slot-scope="{row}">
          <span>{{ row.location }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" prop="startDate" width="100">
        <template slot-scope="{row}">
          <span>{{ row.startDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" prop="endDate" width="120">
        <template slot-scope="{row}">
          <span>{{ row.endDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动状态" width="120">
        <template slot-scope="{row}">
          <el-tag v-show="row.astatus==0" type="info">审核中</el-tag>
          <el-tag v-show="row.astatus==1" type="success">已通过</el-tag>
          <el-tag v-show="row.astatus==2" type="warning">未通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" width="300px">
        <template slot-scope="{row}">
          <el-button plain size="mini" type="info" @click="Dialog(row.aid, 'detail')">
            详情
          </el-button>
          <el-button plain size="mini" type="info" @click="Dialog(row.aid, 'edit')">
            编辑
          </el-button>
          <el-button plain size="mini" type="info" @click="delActivity(row.aid, row.cid)">
            删除活动
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-drawer>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="25%">
    <activity-dialogue :flag="flag" :c-id="cId" :a-id="aId" :c-name="cName" @close-dialogue="closeDialogue" />
  </el-dialog>
  <el-dialog title="活动记录" :visible="activityLogDialogue" width="50%" @close="activityLogDialogue=false">
    <activity-log :c-id="cId"></activity-log>
  </el-dialog>
</div>
</template>

<script>
import { userClub, prsClubUserList, upPrivilege, checkUser } from '@/api/clubuser'
import { clubActivityList, delActivity } from '@/api/activity'
import { memberList, addMember } from '@/api/clubMember'
import { appStatusList, delSign } from '@/api/activityapp'
import { addLog } from '@/api/activityLog'
import activityDialogue from '@/views/activity/activityDialogue'
import ActivityLog from '@/views/userclub/activityLog'

export default {
  name: "userclub",
  components: {
    ActivityLog,
    activityDialogue
  },
  data() {
    return {
      userclub: [],
      table: false,
      gridData: [],
      memberTable: false,
      memberData: [],
      appActivityTable: false,
      appActivity: [],
      clubActivityTable: false,
      clubActivity: [],
      dialogFormVisible: false,
      activityLogDialogue: false,
      title: '',
      cid: '',
      cId: '',
      aId: '',
      flag: '',
      cName: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      userClub().then(response => {
        console.log(response)
        this.userclub = response.data
      })
    },
    getClubUser(cid) {
      prsClubUserList({ cid: cid }).then(response => {
        console.log(response)
        this.gridData = response.data
      })
    },
    Dialog(cid, flag, cname) {
      if (flag === 'clubuser') {
        this.table = true
        this.getClubUser(cid)
      }
      if (flag === 'member') {
        this.memberTable = true
        this.getMember(cid)
        this.cId = cid
      }
      if (flag === 'activityapp') {
        this.appActivityTable = true
        this.appStatusList(cid)
        this.cid = cid
      }
      if (flag === 'clubappactivity') {
        this.title = '申请活动'
        this.dialogFormVisible = true
        this.cId = cid
        this.flag = flag
        this.cName = cname
        // console.log(cname)
      }
      if (flag === 'activitylog') {
        this.activityLogDialogue = true
        this.cId = cid
      }
      if (flag === 'detail') {
        this.dialogFormVisible = true
        this.aId = cid
        this.flag = flag
      }
      if (flag === 'edit') {
        this.dialogFormVisible = true
        this.aId = cid
        this.flag = flag
      }
    },
    upPrivilege(id) {
      upPrivilege({ cuid: id }).then(response => {
        this.getList()
      })
    },
    getMember(id) {
      memberList({ cid: id }).then(response => {
        console.log('member')
        console.log(response.data)
        this.memberData = response.data
      })
    },
    check(row, status) {
      checkUser({ uid: row.uid, status: status }).then(response => {
        this.getClubUser(row.cid)
      })
    },
    appStatusList(cid) {
      appStatusList({ cid: cid }).then(response => {
        console.log(response)
        this.appActivity = response.data
      })
    },
    cancelSign(id) {
      console.log(id, this.cid)
      delSign({ aaid: id, cid: this.cid }).then(response => {
        if (response.code === 20000) {
          this.$notify({
            title: 'Success',
            message: 'Cancel Sign Successfully',
            type: 'success',
            duration: 2000
          })
          this.appStatusList(this.cid)
        }
      })
    },
    closeDialogue(payload) {
      // console.log('payload', payload)
      this.dialogFormVisible = false
      if (!payload) {
        this.getList()
        this.clubActivityTable = false
      }
    },
    getClubActivityList(cid) {
      this.clubActivityTable = true
      clubActivityList({ cid: cid }).then(response => {
        console.log(response)
        this.clubActivity = response.data
      })
    },
    delActivity(aid, cid) {
      console.log(aid, cid)
      delActivity({ aid: aid }).then(response => {
        if (response.code === 20000) {
          this.$notify({
            title: 'Success',
            message: 'Cancel Sign Successfully',
            type: 'success',
            duration: 2000
          })
          this.getClubActivityList(cid)
        }
      })
    },
    addLog() {
      addLog().then(response => {
        if (response.code === 20000) {
          this.$notify({
            title: 'Success',
            message: 'Cancel Sign Successfully',
            type: 'success',
            duration: 2000
          })
          // this.getMember(cid)
        }
      })
    },
    addRember() {
      // console.log('增加人员记录')
      // console.log(this.cId)
      addMember({ cid: this.cId }).then(res => {
        console.log(res)
        this.getMember(this.cId)
      })
      // const time = new Date()
      // console.log(time.getFullYear())
    }
  }
}
</script>

<style scoped>

</style>
