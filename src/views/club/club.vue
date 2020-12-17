<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="search"
        size="small"
        placeholder="search"
        style="width: 80%;margin-right: 15px"
        class="filter-item"
        @keyup.enter.native="handleSearch(search)"
      />
      <el-button
        v-waves
        class="filter-item"
        size="small"
        type="primary"
        icon="el-icon-search"
        @click="handleSearch(search)"
      >
        搜索
      </el-button>
      <el-button
        v-waves
        class="filter-item"
        size="small"
        type="primary"
        icon="el-icon-search"
        @click="handleReset(search)"
      >
        重置
      </el-button>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        社团状态<i class="el-icon-arrow-down el-icon--right" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>已通过</el-dropdown-item>
        <el-dropdown-item>待审核</el-dropdown-item>
        <el-dropdown-item>未通过</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
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
      <el-table-column label="社长" prop="uid" width="80">
        <template slot-scope="{row}">
          <span>{{ row.uid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="uid" width="180">
        <template slot-scope="{row}">
          <span>{{ row.createAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="社团状态" width="180">
        <template slot-scope="{row}">
          <el-tag v-show="row.appStatus==0" type="info">审核中</el-tag>
          <el-tag v-show="row.appStatus==1" type="success">已通过</el-tag>
          <el-tag v-show="row.appStatus==2" type="warning">未通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" width="420px">
        <template slot-scope="{row,$index}">
          <el-button plain type="info" size="mini" @click="detail()">
            详情
          </el-button>
          <el-button size="mini" @click="edit()">
            编辑
          </el-button>
          <el-button plain size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
<!--      <el-table-column label="Actions" width="420px">-->
<!--        <template slot-scope="{row,$index}">-->
<!--          <el-button plain type="info" size="mini" @click="Dialog(row.cid, flag='detail')">-->
<!--            详情-->
<!--          </el-button>-->
<!--          <el-button size="mini" @click="Dialog(row.cid, flag='edit')">-->
<!--            编辑-->
<!--          </el-button>-->
<!--          <el-button plain size="mini" type="danger" @click="handleDelete(row,$index)">-->
<!--            删除-->
<!--          </el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
<!--    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%">-->
      <club-dialogue :dialogFormVisible="dialogFormVisible" :config="config" :list="list"></club-dialogue>
<!--    </el-dialog>-->
  </div>
</template>

<script>
import { clubList, delClub, searchClub } from '@/api/club'
import clubDialogue from '@/views/users/dialogue'

export default {
  name: 'Club',
  components: {
    clubDialogue
  },
  data() {
    return {
      clublist: [],
      dialogFormVisible: false,
      cId: '',
      flag: '',
      title: '',
      search: '',
      config: {
        title: '详情',
        type: 'detail',
        infoapi: {
          url: '/club/clubinfo',
          method: 'post',
          data: { cid: 12 }
        },
        updateapi: {}
      },
      list: {
        cid: ['社团ID', 'input'],
        cname: ['社团名称', 'input']
      }
    }
  },
  created() {
    this.getList(1)
  },
  methods: {
    getList(appStatus) {
      clubList({ appStatus: appStatus }).then(response => {
        const form = response.data
        console.log(form)
        this.clublist = response.data
      })
    },
    // Dialog(cid, flag) {
    //   this.dialogFormVisible = true
    //   this.cId = cid
    //   this.flag = flag
    //   if (flag === 'detail') {
    //     this.title = '社团详情'
    //   }
    //   if (flag === 'edit') {
    //     this.title = '社团编辑'
    //   }
    // },
    detail() {
      console.log('detail')
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
      console.log('payload', payload)
      this.dialogFormVisible = false
      if (!payload) {
        this.getList()
      }
    },
    handleSearch() {
      searchClub({ cname: this.search }).then(response => {
        console.log(response)
        this.clublist = response.data
      })
    },
    handleReset(search) {
      this.getList(1)
      this.search = ''
    }
  }
}
</script>

<style scoped>

</style>
