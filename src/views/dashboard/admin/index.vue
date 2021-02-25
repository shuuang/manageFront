<template>
  <div class="dashboard-editor-container">
<!--    <github-corner class="github-corner" />-->

<!--    <panel-group @handleSetLineChartData="handleSetLineChartData" />-->
    <panel-group />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
<!--      <el-col :xs="24" :sm="24" :lg="8">-->
<!--        <div class="chart-wrapper">-->
<!--          <raddar-chart />-->
<!--        </div>-->
<!--      </el-col>-->
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
<!--          <pie-chart :gender-ratio="genderRatio"/>-->
          <pie-chart :male="male" :female="female" :num="num"/>
        </div>
      </el-col>
<!--      <el-col :xs="48" :sm="48" :lg="16">-->
<!--        <div class="chart-wrapper">-->
<!--          <bar-chart />-->
<!--        </div>-->
<!--      </el-col>-->
    </el-row>
  </div>
</template>

<script>
// import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
// import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
// import BarChart from './components/BarChart'
import { eGender } from '@/api/myuser'
import { eClub } from '@/api/club'

// const lineChartData = {
//   expectedData: [100, 120, 161, 134, 105, 160, 165],
//   actualData: [120, 82, 91, 154, 162, 140, 145]
// }

export default {
  name: 'DashboardAdmin',
  components: {
    // GithubCorner,
    PanelGroup,
    LineChart,
    // RaddarChart,
    PieChart
    // BarChart
  },
  data() {
    return {
      lineChartData: {
        xAxis: [],
        yAxis: []
      },
      genderRatio: [],
      male: '',
      female: '',
      num: ''
    }
  },
  created() {
    this.getGender()
    this.getList()
  },
  methods: {
    // handleSetLineChartData(type) {
    //   this.lineChartData = lineChartData[type]
    // },
    getGender() {
      eGender().then(res => {
        // this.genderRatio.push(res.data[0].maleList.length)
        // this.genderRatio.push(res.data[1].femaleList.length)
        // console.log(this.genderRatio)
        this.male = res.data[0].maleList.length
        this.female = res.data[1].femaleList.length
        this.num = this.male + this.female
      })
    },
    getList() {
      eClub({ appStatus: 1 }).then(response => {
        this.lineChartData.xAxis = response.xAxis
        this.lineChartData.yAxis = response.yAxis
        // const list = response.data.filter(item => {
        //   item.createAt = new Date(item.createAt).getFullYear()
        //   return item
        // })
        // const xAxis = []
        // list.forEach(item => {
        //   xAxis.push(item.createAt)
        // })
        // const xAxisSet = Array.from(new Set(xAxis))
        // this.lineChartData.xAxis = xAxisSet
        // console.log(response)
        // const xnum = 0
        // for (let i = 0; i < xAxisSet.length; i++) {
        //   // console.log(xAxisSet[i])
        //   for (let j = 0; j < list.length; i++) {
        //     // console.log(xAxisSet[i])
        //     console.log(list[j])
        //   }
        // }
        // console.log(new Set(xAxis))
        // const str = ['2021-2-18', '2021/2/18']
        // const strs = new Date(str[1]).getFullYear()
        // console.log(strs)
        // this.clublist = response.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
