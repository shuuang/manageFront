<template>
  <div class="app-container">
    <el-table
      :data="activitylist"
      style="width: 100%"
    >
      <el-table-column label="活动ID" prop="cid" width="80">
        <template slot-scope="{row}">
          <span>{{ row.aid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动名称" prop="cname">
        <template slot-scope="{row}">
          <span>{{ row.aName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创办社团" prop="teacher" width="120">
        <template slot-scope="{row}">
          <span>{{ row.cid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" prop="uid" width="180">
        <template slot-scope="{row}">
          <span>{{ row.startDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" prop="uid" width="180">
        <template slot-scope="{row}">
          <span>{{ row.endDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动状态" width="140">
        <template slot-scope="{row}">
          <el-tag v-show="row.astatus==0" type="info">审核中</el-tag>
          <el-tag v-show="row.astatus==1" type="success">已通过</el-tag>
          <el-tag v-show="row.astatus==2" type="warning">未通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" width="360px">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.astatus==1||row.astatus==0" plain type="info" size="mini" @click="detail(row.aid)">
            详情
          </el-button>
          <el-button v-if="row.astatus==1" size="mini" @click="edit(row.aid)">
            编辑
          </el-button>
          <el-button v-if="row.astatus==2||row.astatus==1" plain size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
          <el-button v-if="row.astatus==0" plain size="mini" type="success" @click="checkClub(row.aid, 1)">
            允许
          </el-button>
          <el-button v-if="row.astatus==0" plain size="mini" type="danger" @click="checkClub(row.aid,2)">
            禁止
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { rootActivityList, delActivity,checkActivity } from '@/api/activity'

export default {
  name: 'Activity',
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
      activitylist: []
    }
  },
  created() {
    this.getList()
  },
  watch: {
    searchclub() {
      this.clublist = this.searchclub
    }
  },
  methods: {
    getList() {
      rootActivityList({ astatus: this.status }).then(response => {
        const form = response.data
        console.log(form)
        this.activitylist = response.data
      })
    },
    handleDelete(row, index) {
      delActivity({ aid: row.aid }).then(response => {
        console.log(response)
        if (response.code === 20000) {
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          this.activitylist.splice(index, 1)
        }
      })
    },
    checkClub(id, status) {
      console.log(id, status)
      checkActivity({ aid: id, astatus: status }).then(response => {
        this.$notify({
          title: 'Success',
          message: 'check Successfully',
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
