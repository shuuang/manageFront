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
      <el-button
        v-waves
        class="filter-item"
        size="small"
        type="primary"
        icon="el-icon-search"
        @click="Dialog('edit')"
      >
        添加
      </el-button>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="社团">
        <club ref="reset" :status="status=1" :searchclub="searchclub"></club>
      </el-tab-pane>
      <el-tab-pane label="审核中">
        <club :status="status=0"></club>
      </el-tab-pane>
      <el-tab-pane label="审核失败">
        <club :status="status=2"></club>
      </el-tab-pane>
    </el-tabs>
<!--    <dialogue ref="flag"></dialogue>-->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%">
      <!--      <dialogue ref="flag"></dialogue>-->
      <club-dialogue :flag="flag" :c-id="cId" @close-dialogue="closeDialogue" />
    </el-dialog>
  </div>
</template>

<script>
import club from '@/views/club/club'
// import dialogue from '@/views/users/dialogue'
import { searchClub } from '@/api/club'
import clubDialogue from '@/views/club/clubDialogue'

export default {
  name: "clubTab",
  components: {
    club,
    // dialogue
    clubDialogue
  },
  data() {
    return {
      status: '',
      search: '',
      searchclub: [],
      dialogFormVisible: false,
      config: {
        title: '添加社团',
        type: '',
        infoapi: {},
        updateapi: {
          url: '/club/rootaddclub',
          method: 'post'
        }
      },
      list: {
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
  methods: {
    handleSearch() {
      searchClub({ cname: this.search }).then(response => {
        console.log(response)
        this.searchclub = response.data
      })
    },
    handleReset(search) {
      this.$refs.reset.getList()
      this.search = ''
    },
    add() {
      // this.config.type = 'edit'
      this.dialogFormVisible = true
    },
    Dialog(flag) {
      this.dialogFormVisible = true
      this.flag = flag
      this.title = '添加社团'
    },
    closeDialogue(payload) {
      console.log('payload', payload)
      this.dialogFormVisible = false
      if (!payload) {
        this.getList()
      }
    }
  }
}
</script>

<style scoped>

</style>
