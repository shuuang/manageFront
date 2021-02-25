<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    genderRatio: {
      type: Array
    },
    male: {
      type: [String, Number],
      default: '5'
    },
    female: {
      type: [String, Number],
      default: '5'
    },
    num: {
      type: [String, Number],
      default: '10'
    }
  },
  data() {
    return {
      chart: null
      // num: '10',
      // female: '5',
      // male: '5'
    }
  },
  watch: {
    // genderRatio: {
    //   // deep: true,
    //   handler(val) {
    //     this.initChart(val)
    //   }
    // }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  // created() {
  //   // console.log(this.genderRatio)
  //   this.num = this.genderRatio[0] + this.genderRatio[1]
  //   this.male = this.genderRatio[0]
  //   this.female = this.genderRatio[1]
  // },
  methods: {
    initChart() {
      // console.log(this.female,this.male)
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['female', 'male']
        },
        series: [
          {
            name: '用户男女比例',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [
              { value: 11, name: 'female' },
              { value: 8, name: 'male' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2000
          }
        ]
      })
    }
  }
}
</script>
