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
        @click="Dialog('build')"
      >
        发布活动
      </el-button>
    </div>
    <el-tabs v-model="mstatus" type="border-card">
      <el-tab-pane label="活动" name="1">
        <acitivity ref="activity" :status="status=mstatus" :searchclub="searchclub"></acitivity>
      </el-tab-pane>
      <el-tab-pane label="审核中" name="0">
        <acitivity ref="checking" :status="status=mstatus"></acitivity>
      </el-tab-pane>
      <el-tab-pane label="审核失败" name="2">
        <acitivity ref="fail" :status="status=mstatus"></acitivity>
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
import { searchActivity } from '@/api/activity'
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
      flag: '',
      mstatus: '1'
    }
  },
  watch: {
    mstatus() {
      switch (this.mstatus) {
        case '1':
          this.$refs.activity.getList()
          break
        case '2':
          this.$refs.fail.getList()
          break
        case '0':
          this.$refs.checking.getList()
          break
      }
    }
  },
  methods: {
    handleSearch() {
      searchActivity({ aName: this.search }).then(response => {
        // console.log(response)
        this.searchclub = response.data
      })
    },
    handleReset(search) {
      this.$refs.activity.getList()
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
        this.$refs.activity.getList()
      }
    }
    // refresh(payload) {
    //   console.log('payload', payload)
    //   this.dialogFormVisible = false
    //   if (!payload) {
    //     this.$refs.reset.getList()
    //   }
    // }
  }
}
</script>

<style scoped>

</style>
