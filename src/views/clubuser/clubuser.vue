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
      <el-table-column label="用户ID" prop="uid">
        <template slot-scope="{row}">
          <span>{{ row.uid }}</span>
<!--          <span>{{ getUserName(row, $index) }}</span>-->
        </template>
      </el-table-column>
      <el-table-column label="社团ID" prop="cid" width="120">
        <template slot-scope="{row}">
          <span>{{ row.cid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="社团权限" prop="privilege" width="80">
        <template slot-scope="{row}">
          <span>{{ row.privilege }}</span>
        </template>
      </el-table-column>
      <el-table-column label="社团成员状态" prop="uid" width="180">
        <template slot-scope="{row}">
          <span>{{ row.status }}</span>
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
      <el-table-column label="Actions" width="300px">
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
import { allClubUser } from '@/api/clubuser'
import { rootUser } from '@/api/myuser'

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
        // response.data.forEach(item => {
        //   this.getUserName(item.uid)
        // })
        this.clubuserlist = response.data
      })
    },
    getUserName(row, index) {
      // console.log(index)
      rootUser({ uid: row.uid }).then(res => {
        this.name.push(res.data.realname)
        console.log(this.name[0])
      })
      console.log(this.name[0])
      return this.name[0]
    },
    setPre() {
    }
  }
}
</script>

<style scoped>

</style>
