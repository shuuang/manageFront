<template>
  <div class="app-container">
    <el-table
      :data="clublist"
      style="width: 100%"
    >
      <el-table-column label="社团ID" prop="cid" width="80">
        <template slot-scope="{row}">
          <span>{{ row.cid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="社团名称" prop="cname">
        <template slot-scope="{row}">
          <span>{{ row.cname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="指导教师" prop="teacher" width="120">
        <template slot-scope="{row}">
          <span>{{ row.teacher }}</span>
        </template>
      </el-table-column>
      <el-table-column label="社长" prop="realname" width="160">
        <template slot-scope="{row}">
          <span>{{ row.users.realname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="uid" width="180">
        <template slot-scope="{row}">
          <span>{{ row.createAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="社团状态" width="140">
        <template slot-scope="{row}">
          <el-tag v-show="row.appStatus==0" type="info">审核中</el-tag>
          <el-tag v-show="row.appStatus==1" type="success">已通过</el-tag>
          <el-tag v-show="row.appStatus==2" type="warning">未通过</el-tag>
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
        <template slot-scope="{row,$index}">
          <el-button v-if="row.appStatus==1||row.appStatus==0" plain type="info" size="mini" @click="Dialog(row.cid, 'detail')">
            详情
          </el-button>
          <el-button v-if="row.appStatus==1" size="mini" @click="Dialog(row.cid, 'edit')">
            编辑
          </el-button>
          <el-button v-if="row.appStatus==2||row.appStatus==1" plain size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
          <el-button v-if="row.appStatus==0" plain size="mini" type="success" @click="checkClub(row.cid, 1)">
            允许
          </el-button>
          <el-button v-if="row.appStatus==0" plain size="mini" type="danger" @click="checkClub(row.cid,2)">
            禁止
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%">
<!--      <dialogue ref="flag"></dialogue>-->
      <club-dialogue :flag="flag" :c-id="cId" @close-dialogue="closeDialogue" />
    </el-dialog>
  </div>
</template>

<script>
import { clubList, delClub, checkAppClub } from '@/api/club'
// import dialogue from '@/views/users/dialogue'
import clubDialogue from '@/views/club/clubDialogue'

export default {
  name: 'Club',
  components: {
    // dialogue
    clubDialogue
  },
  props: {
    status: {
      require: true,
      type: [String, Number]
    },
    searchclub: {
      require: false,
      type: Array
    }
  },
  data() {
    return {
      clublist: [],
      dialogFormVisible: false,
      cId: '',
      flag: '',
      title: '',
      checkStatus: '',
      config: {
        title: '',
        type: '',
        infoapi: {
          url: '/club/clubinfo',
          method: 'post',
          data: {}
        },
        updateapi: {
          url: '/club/rootupdateclub',
          method: 'post'
        }
      },
      list: {
        // cid: ['社团ID', 'input'],
        cname: ['社团名称', 'input'],
        teacher: ['指导教师', 'input'],
        uid: ['社长', 'input'],
        createAt: ['创办时间', 'input'],
        introduction: ['简介', 'input'],
        file: ['申请材料', 'input'],
        appImage: ['社团Logo', 'img'],
        duty: ['值班表', 'input']
      }
    }
  },
  created() {
    this.getList()
  },
  watch: {
    searchclub() {
      this.clublist = this.searchclub
    },
    status() {
      this.getList()
    }
  },
  methods: {
    getList() {
      clubList({ appStatus: this.status }).then(response => {
        // const form = response.data
        // console.log(form)
        this.clublist = response.data
      })
    },
    Dialog(cid, flag) {
      this.dialogFormVisible = true
      this.cId = cid
      this.flag = flag
      if (flag === 'detail') {
        this.title = '社团详情'
      }
      if (flag === 'edit') {
        this.title = '社团编辑'
      }
    },
    detail(id) {
      this.config.type = 'detail'
      this.config.title = '社团详情'
      this.config.infoapi.data = { cid: id }
      this.dialogFormVisible = true
      this.$refs.flag.parentGetform()
    },
    edit(id) {
      this.config.type = 'edit'
      this.config.title = '社团编辑'
      this.config.infoapi.data = { cid: id }
      this.$refs.flag.parentGetform()
      this.dialogFormVisible = true
    },
    handleDelete(row, index) {
      delClub({ cid: row.cid }).then(response => {
        console.log(response)
        if (response.code === 20000) {
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          this.clublist.splice(index, 1)
        }
      })
    },
    closeDialogue(payload) {
      // console.log('payload', payload)
      this.dialogFormVisible = false
      if (!payload) {
        this.getList()
      }
    },
    checkClub(id, status) {
      console.log(id, status)
      checkAppClub({ cid: id, appStatus: status }).then(response => {
        this.$notify({
          title: 'Success',
          message: 'check Successfully',
          type: 'success',
          duration: 2000
        })
        this.getList()
        // this.$router.go(0)
      })
    }
  }
}
</script>

<style scoped>

</style>
