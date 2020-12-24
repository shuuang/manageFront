<template>
  <div class="app-container">
    <el-table
      :data="clubuserlist"
      style="width: 100%"
    >
      <el-table-column label="社团成员ID" prop="cuid" width="100">
        <template slot-scope="{row}">
          <span>{{ row.cuid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户" prop="uid">
        <template slot-scope="{row}">
          <span>{{ row.uid }}</span>
<!--          <span>{{ getUserName(row, $index) }}</span>-->
        </template>
      </el-table-column>
      <el-table-column label="社团" prop="cid" width="120">
        <template slot-scope="{row}">
          <span>{{ row.cid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职位" prop="privilege" width="180">
        <template slot-scope="{row}">
          <span v-if="row.privilege==0">社员</span>
          <span v-if="row.privilege==1">部长</span>
          <span v-if="row.privilege==2">社长</span>
        </template>
      </el-table-column>
      <el-table-column label="加入年份" prop="uid" width="180">
        <template slot-scope="{row}">
          <span>{{ row.uappyear }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="Actions" width="360px">-->
<!--        <template slot-scope="{row,$index}">-->
<!--          <el-button v-if="row.appStatus==1||row.appStatus==0" plain type="info" size="mini" @click="detail(row.cid)">-->
<!--            详情-->
<!--          </el-button>-->
<!--          <el-button v-if="row.appStatus==1" size="mini" @click="edit(row.cid)">-->
<!--            编辑-->
<!--          </el-button>-->
<!--          <el-button v-if="row.appStatus==2||row.appStatus==1" plain size="mini" type="danger" @click="handleDelete(row,$index)">-->
<!--            删除-->
<!--          </el-button>-->
<!--          <el-button v-if="row.appStatus==0" plain size="mini" type="success" @click="checkClub(row.cid, checkStatus=1)">-->
<!--            允许-->
<!--          </el-button>-->
<!--          <el-button v-if="row.appStatus==0" plain size="mini" type="danger" @click="checkClub(row.cid,checkStatus=2)">-->
<!--            禁止-->
<!--          </el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="操作" width="300px">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="setPre(row.cuid)">
            设为社长
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { allClubUser, setPre } from '@/api/clubuser'

export default {
  name: 'Club',
  data() {
    return {
      clubuserlist: [],
      name: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      // console.log(await this.getUserName(17))
      allClubUser().then(response => {
        // const form = response.data
        response.data.forEach(item => {
          item.uid = item.users.realname
          item.cid = item.club.cname
        })
        // console.log(response.data)
        // response.data.uid = response.data
        // this.clubuserlist.uid = response.data.users.realname
        this.clubuserlist = response.data
      })
    },
    setPre(id) {
      setPre({ cuid: id }).then(response => {
        this.$notify({
          title: 'Success',
          message: 'Set Successfully',
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    }
  }
}
</script>

<style scoped>

</style>
