<template>
  <div class="Jobfair">
    <div class="Jobfair__Count">
      <span class="Jobfair__Count__Unit">共</span>
        {{dataCount}}
      <span class="Jobfair__Count__Unit">条数据</span>
    </div>
    <div class="Jobfair__City">
      <el-select v-model="curCity" 
        filterable 
        placeholder="请选择" 
        size="small" 
        height="300"
        @change="onChange">
        <el-option
          v-for="city in cities"
          :key="city"
          :label="city"
          :value="city">
        </el-option>
      </el-select>
    </div>
    <div class="Jobfair__Charts">
      <p class="Jobfair__Charts__Title">
        <span>{{curCity}}</span> 发布有效招聘信息的单位共有 <span>{{curCityCount}}</span> 家
      </p>
    </div>
    <div class="Jobfair__Table">
      <el-table
        :data="cityData">
        <el-table-column
          label="地址"
          prop="CS">
        </el-table-column>
        <el-table-column
          label="时间"
          prop="RQ">
        </el-table-column>
        <el-table-column
          label="单位"
          prop="DW">
        </el-table-column>
        <el-table-column
          label="详情"
          prop="MC">
        </el-table-column>
        <el-table-column
          label="联系方式"
          prop="DH">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import apis from '@/api'
import TWEEN from 'tween'

require('echarts/lib/component/title')
export default {
  data () {
    return {
      // 见习基地数据
      jobfairData: [],
      // 数据总量的值
      dataCount: 0,
      // 城市下拉列表
      // 当前选择城市
      curCity: '微山县',
      // 年度变化趋势数据&设置
      yearData: {},
      yearSettings: {}
    }
  },
  computed: {
    cities () {
      const positions = this.jobfairData.map(d => {
        const position = /(.*?[市|区|县])/g.exec(d.CS) ? /(.*?[市|区|县])/g.exec(d.CS)[1] : ''
        return position
      })
      const set = new Set(positions)
      return Array.from(set)
    },
    // 当前城市数据量
    curCityCount () {
      return this.jobfairData.filter(d => {
        return d.CS.includes(this.curCity)
      }).length
    },
    // 当前城市的数据
    cityData () {
      return this.jobfairData.filter(d => {
        return d.CS.includes(this.curCity)
      })
    }
  },
  async created () {
    // 页面加载的时候去加载见习基地数据
    const {data} = await apis.getJobfairData()
    this.jobfairData = data.result.data
    // 初始化页面数据
    this.generateYearData()
  },
  watch: {
    // 以下代码用于控制数字变换的特效，可以不用看
    'jobfairData.length' (newValue, oldValue) {
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
    },
    // 根据当前选择城市生成相应 年度趋势变化 数据
    generateYearData () {
      const countData = this.cityData.reduce((countMap, d) => {
        countMap[d.RQ] = ++countMap[d.RQ] || 1
        return countMap
      }, {})
      this.yearData = {
        columns: ['name', 'count'],
        rows: this.dict2Array(countData)
      }
      this.yearSettings = {
        metrics: ['count'],
        dimension: ['name']
      }
    },
    // 下拉列表选择后的响应事件
    onChange () {
      this.generateYearData()
    }
  }
}
</script>

<style lang="scss" scoped>
.Jobfair {
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