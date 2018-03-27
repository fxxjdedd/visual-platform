<template>
  <div class="Jobwanted">
    <div class="Jobwanted__Count">
      <span class="Jobwanted__Count__Unit">共</span>
        {{dataCount}}
      <span class="Jobwanted__Count__Unit">条数据</span>
    </div>
    <div class="Jobwanted__XL">
      <ve-pie 
        :data="XLChartData" 
        :settings="XLChartSettings"
        :legend-visible="false" 
        :title="{text:'学历要求', left:'45%'}"
        >
      </ve-pie>
    </div>
    <div class="Jobwanted__XLandGZ">
      <ve-histogram
        :data="XLandGZChartData"
        :settings="XLandGZChartSettings"
        :legend-visible="false" 
        :title="{text:'学历平均工资', left:'45%'}">
      </ve-histogram>
    </div>
    <div class="Jobwanted__ZYandGZ">
        <ve-bar
          :data="ZYandGZChartData"
          :settings="ZYandGZChartSettings"
          :legend-visible="false" 
          :title="{text:'职业TOP10平均工资', left:'45%'}">
        </ve-bar>
    </div>
    <div class="Jobwanted__Table">
      <el-table
        :data="jobwantedData.slice(0,300)">
        <el-table-column
          label="月薪"
          prop="YX">
        </el-table-column>
        <el-table-column
          label="公职"
          prop="GZ">
        </el-table-column>
        <el-table-column
          label="职业"
          prop="ZY">
        </el-table-column>
        <el-table-column
          label="学历"
          prop="XL">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import apis from '@/api'
import TWEEN from 'tween'
import {sampleSize} from 'lodash/collection'

require('echarts/lib/component/title')
export default {
  data () {
    return {
      // 见习基地数据
      jobwantedData: [],
      // 数据总量的值
      dataCount: 0
    }
  },
  computed: {
    XLData () {
      return this.jobwantedData.reduce((item, next) => {
        if (!next.XL) next.XL = '无要求'
        if (!item[next.XL]) item[next.XL] = 0
        item[next.XL] += 1
        return item
      }, {})
    },
    XLChartData () {
      return {
        columns: ['name', 'count'],
        rows: this.dict2Array(this.XLData)
      }
    },
    XLChartSettings () {
      return {
        dimension: 'name',
        metrics: 'count',
        selectedMode: 'single',
        hoverAnimation: false,
        radius: 100,
        offsetY: 200
      }
    },
    XLandGZData () {
      return this.jobwantedData.reduce((item, next) => {
        if (!next.YX || next.YX === '面议') return item
        if (!next.XL) next.XL = '无要求'
        const salaryRange = next.YX.replace('元', '').split('-')
        const avgSalary = (parseInt(salaryRange[1]) + parseInt(salaryRange[0])) / 2
        if (!item[next.XL]) item[next.XL] = avgSalary

        // item[next.XL] = salaryRange[1] - salaryRange[0]
        // if (next.XL === '大专') console.log(salaryRange)
        // const avgSalary = (salaryRange[1] - salaryRange[0]) / 2
        item[next.XL] = (item[next.XL] + avgSalary) / 2
        return item
      }, {})
    },
    XLandGZChartData () {
      return {
        columns: ['name', 'count'],
        rows: this.dict2Array(this.XLandGZData)
      }
    },
    XLandGZChartSettings () {
      return {}
    },
    ZYandGZData () {
      return this.jobwantedData.reduce((item, next) => {
        if (!next.YX || next.YX === '面议') return item
        const salaryRange = next.YX.replace('元', '').split('-')
        const avgSalary = (parseInt(salaryRange[1]) + parseInt(salaryRange[0])) / 2
        if (!item[next.ZY]) item[next.ZY] = avgSalary

        // item[next.XL] = salaryRange[1] - salaryRange[0]
        // if (next.XL === '大专') console.log(salaryRange)
        // const avgSalary = (salaryRange[1] - salaryRange[0]) / 2
        item[next.ZY] = (item[next.ZY] + avgSalary) / 2
        return item
      }, {})
    },
    ZYandGZChartData () {
      return {
        columns: ['name', 'count'],
        rows: this.dict2Array(this.ZYandGZData).sort((a, b) => b.count - a.count).slice(0, 15)
      }
    },
    ZYandGZChartSettings () {
      return {}
    }
  },
  async created () {
    // 页面加载的时候去加载见习基地数据
    const {data} = await apis.getJobWantedData()
    this.jobwantedData = sampleSize(data.result.data, 1566)
  },

  watch: {
    // 以下代码用于控制数字变换的特效，可以不用看
    'jobwantedData.length' (newValue, oldValue) {
      var vm = this
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }

      new TWEEN.Tween({ tweeningNumber: oldValue })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ tweeningNumber: newValue }, 1000)
        .onUpdate(function () {
          vm.dataCount = this.tweeningNumber.toFixed(0)
        })
        .start()

      animate()
    }
  },
  methods: {
        // dict类型数据转为array
    dict2Array (dict) {
      const rowData = []
      for (const [key, val] of Object.entries(dict)) {
        rowData.push({
          name: key,
          count: val
        })
      }
      return rowData
    }
  }
}
</script>

<style lang="scss" scoped>
.Jobwanted {
  &__Count {
    font-size: 48px;
    &__Unit {
      font-size: 14px;
      vertical-align: baseline;
    }
  }
  &__City {
    text-align: left;
  }
  &__Charts {
    &__Title {
      text-align: left;
      margin-bottom: 0px;
      span {
        font-weight: bold;
        font-size: 24px;

      }
    }
  }
}   

</style>