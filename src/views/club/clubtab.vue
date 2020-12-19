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
        <club ref="reset" :status="status=1" :searchclub="searchclub"></club>
      </el-tab-pane>
      <el-tab-pane label="审核中">
        <club :status="status=0"></club>
      </el-tab-pane>
      <el-tab-pane label="审核失败">
        <club :status="status=2"></club>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import club from '@/views/club/club'
import { searchClub } from '@/api/club'

export default {
  name: "clubTab",
  components: {
    club
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
