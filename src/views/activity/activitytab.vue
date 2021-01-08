<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="search"
        size="small"
        placeholder="search"
        style="width: 82%;margin-right: 15px"
        class="filter-item"
        @keyup.enter.native="handleSearch(search)"
      />
      <el-button
        class="filter-item"
        size="small"
        type="primary"
        icon="el-icon-search"
        @click="handleSearch(search)"
      >
        搜索
      </el-button>
      <el-button
        class="filter-item"
        size="small"
        type="primary"
        icon="el-icon-search"
        @click="handleReset(search)"
      >
        重置
      </el-button>
      <el-button
        class="filter-item"
        size="small"
        type="primary"
        icon="el-icon-search"
        @click="Dialog('edit')"
      >
        发布活动
      </el-button>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="活动">
        <acitivity ref="reset" :status="status=1" :searchclub="searchclub"></acitivity>
      </el-tab-pane>
      <el-tab-pane label="审核中">
        <acitivity :status="status=0"></acitivity>
      </el-tab-pane>
      <el-tab-pane label="审核失败">
        <acitivity :status="status=2"></acitivity>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%">
      <!--      <dialogue ref="flag"></dialogue>-->
      <adialogue :flag="flag" :a-id="aId" @close-dialogue="closeDialogue" />
    </el-dialog>
  </div>
</template>

<script>
import acitivity from '@/views/activity/activity'
import { searchClub } from '@/api/club'
import adialogue from '@/views/activity/activityDialogue'

export default {
  name: "activityTab",
  components: {
    acitivity,
    adialogue
  },
  data() {
    return {
      status: '',
      search: '',
      aId: '',
      dialogFormVisible: false,
      searchclub: [],
      title: '',
      flag: ''
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
    Dialog(flag) {
      this.dialogFormVisible = true
      this.flag = flag
      this.title = '发布活动'
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
