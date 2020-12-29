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
    <el-table-column label="权限" prop="privilege" width="160">
      <template slot-scope="{row}">
        <span v-if="row.privilege==0">社员</span>
        <span v-if="row.privilege==1">部长</span>
        <span v-if="row.privilege==2">社长</span>
      </template>
    </el-table-column>
    <el-table-column label="加入年份" prop="uappyear" width="160">
      <template slot-scope="{row}">
        <span>{{ row.uappyear }}</span>
      </template>
    </el-table-column>
    <el-table-column label="社团状态" width="180">
      <template slot-scope="{row}">
        <el-tag v-show="row.status==0" type="info">审核中</el-tag>
        <el-tag v-show="row.status==1" type="success">已通过</el-tag>
        <el-tag v-show="row.status==2" type="warning">未通过</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="Actions" width="400px">
      <template slot-scope="{row}">
        <el-button plain size="mini" type="info" @click="Dialog(row.cid, 'clubuser')">
          查看社团成员
        </el-button>
        <el-button plain type="info" size="mini" @click="Dialog(row.cid, 'member')">
          人员记录查询
        </el-button>
        <el-button plain type="info" size="mini" @click="Dialog(row.cid, 'activityapp')">
          查询活动报名
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-drawer
    :title="title"
    :visible.sync="table"
    direction="rtl"
    size="60%">
    <el-table :data="gridData">
      <el-table-column property="cuid" label="用户ID" width="110"></el-table-column>
      <el-table-column property="users.realname" label="用户"></el-table-column>
      <el-table-column label="权限" prop="privilege" width="160">
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
    :title="title"
    :visible.sync="memberTable"
    direction="rtl"
    size="25%">
    <el-table :data="memberData">
      <el-table-column property="cmid" label="记录ID" width="110"></el-table-column>
      <el-table-column property="num" label="新增数量"></el-table-column>
      <el-table-column property="year" label="年份" width="200"></el-table-column>
    </el-table>
  </el-drawer>
  <el-drawer
    :title="title"
    :visible.sync="appActivityTable"
    direction="rtl"
    size="32%">
    <el-table
      :data="appActivity"
      style="width: 100%">
      <el-table-column label="报名ID" prop="aaid" width="80">
        <template slot-scope="{row}">
          <span>{{ row.aaid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动" prop="cname" width="80">
        <template slot-scope="{row}">
          <span>{{ row.aid }}</span>
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
  </el-drawer>
</div>
</template>

<script>
import { userClub, prsClubUserList, upPrivilege, checkUser } from '@/api/clubuser'
import { memberList } from '@/api/clubMember'
import { appStatusList } from '@/api/activityapp'

export default {
  name: "userclub",
  data() {
    return {
      userclub: [],
      table: false,
      title: '',
      gridData: [],
      memberTable: false,
      memberData: [],
      appActivityTable: false,
      appActivity: []
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
    Dialog(cid, flag) {
      if (flag === 'clubuser') {
        this.table = true
        this.title = '社团成员'
        this.getClubUser(cid)
      }
      if (flag === 'member') {
        this.memberTable = true
        this.title = '人员变动记录'
        this.getMember(cid)
      }
      if (flag === 'activityapp') {
        this.title = '报名活动状态'
        this.appActivityTable = true
        this.appStatusList(cid)
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
        // console.log(response)
        this.appActivity = response.data
      })
    }
  }
}
</script>

<style scoped>

</style>
