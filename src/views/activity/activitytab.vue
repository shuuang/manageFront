<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="search"
        size="small"
        placeholder="search"
        style="width: 90%;margin-right: 15px"
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
    <el-tabs type="border-card">
      <el-tab-pane label="社团">
        <acitivity ref="reset" :status="status=1" :searchclub="searchclub"></acitivity>
      </el-tab-pane>
      <el-tab-pane label="审核中">
        <acitivity :status="status=0"></acitivity>
      </el-tab-pane>
      <el-tab-pane label="审核失败">
        <acitivity :status="status=2"></acitivity>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import acitivity from '@/views/activity/activity'
import { searchClub } from '@/api/club'

export default {
  name: "activityTab",
  components: {
    acitivity
  },
  data() {
    return {
      status: '',
      search: '',
      searchclub: []
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
    }
  }
}
</script>

<style scoped>

</style>
