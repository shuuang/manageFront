<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
<!--      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">-->
<!--        Add-->
<!--      </el-button>-->
<!--      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">-->
<!--        Export-->
<!--      </el-button>-->
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      show-header
      fit
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="uid" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.uid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学号" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.stuNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="{row}">
          <span>{{ row.realname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="90px">
        <template slot-scope="{row}">
          <span>{{ row.gender }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="200px">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" width="200px">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="QQ" width="180px">-->
<!--        <template slot-scope="{row}">-->
<!--          <span>{{ row.qq }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="微信" width="180px">-->
<!--        <template slot-scope="{row}">-->
<!--          <span>{{ row.wechat }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="行政班级" width="180px">
        <template slot-scope="{row}">
          <span>{{ row.class }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="出生日期" width="130px">-->
<!--        <template slot-scope="{row}">-->
<!--          <span>{{ row.birthday | parseTime('{y}-{m}-{d}') }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="民族" width="200px">
        <template slot-scope="{row}">
          <span>{{ row.nation }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="寝室" width="150px">-->
<!--        <template slot-scope="{row}">-->
<!--          <span>{{ row.home }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="realname" min-width="150px">-->
<!--        <template slot-scope="{row}">-->
<!--          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>-->
<!--          <el-tag>{{ row.type | typeFilter }}</el-tag>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="Readings" width="95">-->
<!--        <template slot-scope="{row}">-->
<!--          <span v-if="row.pageviews" class="link-type" @click="handleFetchPv(row.pageviews)">{{ row.pageviews }}</span>-->
<!--          <span v-else>0</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column v-if="showReviewer" label="Reviewer" width="110px">-->
<!--        <template slot-scope="{row}">-->
<!--          <span style="color:red;">{{ row.reviewer }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="Imp" width="80px">-->
<!--        <template slot-scope="{row}">-->
<!--          <svg-icon v-for="n in + row.importance" :key="n" icon-class="star" class="meta-item__icon" />-->
<!--        </template>-->
<!--      </el-table-column>-->

<!--      <el-table-column label="Status" class-name="status-col" width="100">-->
<!--        <template slot-scope="{row}">-->
<!--          <el-tag :type="row.status | statusFilter">-->
<!--            {{ row.status }}-->
<!--          </el-tag>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="Actions" width="420px" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button plain type="info" size="mini" @click="Dialog(row.uid, flag='detail')">
            详情
          </el-button>
          <el-button size="mini" @click="Dialog(row.uid, flag='edit')">
            编辑
          </el-button>
<!--          <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">-->
<!--            Publish-->
<!--          </el-button>-->
<!--          <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">-->
<!--            Draft-->
<!--          </el-button>-->
          <el-button plain size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="title" :visible.sync="dialogFormVisible">
      <users-dialogue :flag="flag" :uId="uId" @close-dialogue="closeDialogue"></users-dialogue>
    </el-dialog>
<!--    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />-->
  </div>
</template>

<script>
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import { usersList, delUser } from '@/api/myuser'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import usersDialogue from '@/views/components/usersDialogue'
// import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  // components: { Pagination },
  components: {
    usersDialogue
  },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      uId: '',
      flag: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      usersList().then(response => {
        console.log(response)
        this.list = response.data
        this.listLoading = false
        // this.total = response.data.total
        //
        // // Just to simulate the time of the request
        // setTimeout(() => {

        // }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // createData() {
    //   this.$refs['dataForm'].validate((valid) => {
    //     if (valid) {
    //       this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
    //       this.temp.author = 'vue-element-admin'
    //       createArticle(this.temp).then(() => {
    //         this.list.unshift(this.temp)
    //         this.dialogFormVisible = false
    //         this.$notify({
    //           title: 'Success',
    //           message: 'Created Successfully',
    //           type: 'success',
    //           duration: 2000
    //         })
    //       })
    //     }
    //   })
    // },
    // handleDetail(uid) {
    //   this.uId = uid
    //   this.dialogFormVisible = true
    // },
    Dialog(uid, flag) {
      this.dialogFormVisible = true
      this.uId = uid
      console.log(this.flag)
      this.flag = flag
    },
    // updateData() {
    //   this.$refs['dataForm'].validate((valid) => {
    //     if (valid) {
    //       const tempData = Object.assign({}, this.temp)
    //       tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
    //       updateArticle(tempData).then(() => {
    //         const index = this.list.findIndex(v => v.id === this.temp.id)
    //         this.list.splice(index, 1, this.temp)
    //         this.dialogFormVisible = false
    //         this.$notify({
    //           title: 'Success',
    //           message: 'Update Successfully',
    //           type: 'success',
    //           duration: 2000
    //         })
    //       })
    //     }
    //   })
    // },
    handleDelete(row, index) {
      delUser({ uid: row.uid }).then(response => {
        console.log(response)
        if (response.code === 20000) {
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          this.list.splice(index, 1)
        }
      })
    },
    // handleFetchPv(pv) {
    //   fetchPv(pv).then(response => {
    //     this.pvData = response.data.pvData
    //     this.dialogPvVisible = true
    //   })
    // },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    closeDialogue(payload) {
      console.log('payload', payload)
      this.dialogFormVisible = false
    }
  }
}
</script>
