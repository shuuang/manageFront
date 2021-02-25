<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="search"
        size="small"
        placeholder="search"
        style="width: 75%;margin-right: 15px"
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
        @click="Dialog('add')"
      >
        添加
      </el-button>
    </div>
    <el-tabs v-model="elrefesh" type="border-card">
      <el-tab-pane type="button" label="社团" name="1">
        <club ref="club" :status="status=elrefesh" :searchclub="searchclub" />
      </el-tab-pane>
      <el-tab-pane label="审核中" name="0">
        <club ref="audit" :status="status=elrefesh" />
      </el-tab-pane>
      <el-tab-pane label="审核失败" name="2">
        <club ref="refuse" :status="status=elrefesh" />
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

import Waves from '@/components/directive/waves'
// import dialogue from '@/views/users/dialogue'
import { searchClub } from '@/api/club'
import clubDialogue from '@/views/club/clubDialogue'

export default {
  name: 'ClubTab',
  components: {
    club,
    // dialogue
    clubDialogue
  },
  directives: { Waves },
  data() {
    return {
      title: '',
      flag: '',
      cId: 0,
      status: '',
      search: '',
      searchclub: [],
      elrefesh: '1',
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
  watch: {
    elrefresh() {
      switch (this.elrefesh) {
        case '1':
          this.$refs.club.getList()
          break
        case '2':
          this.$refs.refuse.getList()
          break
        case '0':
          this.$refs.audit.getList()
          break
      }
    }
  },
  methods: {
    handleSearch() {
      searchClub({ cname: this.search }).then(response => {
        console.log('search', response)
        this.searchclub = response.data
      })
    },
    handleReset(search) {
      this.$refs.club.getList()
      this.search = ''
      // searchClub({ cname: this.search }).then(response => {
      //   console.log('search', response)
      //   this.searchclub = response.data
      // })
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
      // console.log('payload', payload)
      this.dialogFormVisible = false
      if (!payload) {
        this.$refs.club.getList()
      }
    }
  }
}
</script>

<style scoped>

</style>
