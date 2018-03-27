<template>
  <div class="Campbase">
    <div class="Campbase__Count">
      <span class="Campbase__Count__Unit">共</span>
        {{dataCount}}
      <span class="Campbase__Count__Unit">条数据</span>
    </div>
    <div class="Campbase__City">
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
    <div class="Campbase__Charts">
      <p class="Campbase__Charts__Title">
        <span>{{curCity}}</span> 发布有效招聘信息的单位共有 <span>{{curCityCount}}</span> 家
      </p>
      <div class="Campbase__Charts__Container">
        <!-- <h4>行政区占比</h4> -->
        <div>
          <ve-pie 
            :data="distributeData" 
            :settings="distributeSettings" 
            :legend-visible="false" 
            :title="{text:'行政区占比', left:'45%'}"
          ></ve-pie>
        </div>
      </div>
      <div class="Campbase__Charts__Container">
        <!-- <h4>年度变化</h4> -->
        <div>
          <ve-line 
            :data="yearData" 
            :settings="yearSettings" 
            :legend-visible="false" 
            :title="{text:'年度变化', left:'45%'}"
          ></ve-line>
        </div>
      </div>
    </div>
    <div class="Campbase__Table">
      <el-table
        :data="campbaseData">
        <el-table-column
          label="地址"
          prop="JXJDJTDZ">
        </el-table-column>
        <el-table-column
          label="发起人"
          prop="JXJDLXR">
        </el-table-column>
        <el-table-column
          label="公司"
          prop="JXJDMC">
        </el-table-column>
        <el-table-column
          label="注册单位"
          prop="PZDW">
        </el-table-column>
        <el-table-column
          label="发布时间"
          prop="PZND">
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
      campbaseData: [],
      // 数据总量的值
      dataCount: 0,
      // 城市下拉列表
      cities: ['济南市', '青岛市', '淄博市', '枣庄市', '东营市', '烟台市', '潍坊市', '济宁市', '泰安市', '威海市', '日照市', '莱芜市', '临沂市', '德州市', '聊城市', '滨州市', '菏泽市'],
      // 当前选择城市
      curCity: '济南市',
      // 行政区域分布数据&设置
      distributeData: {},
      distributeSettings: {},
      // 年度变化趋势数据&设置
      yearData: {},
      yearSettings: {}
    }
  },
  computed: {
    // 当前城市数据量
    curCityCount () {
      return this.campbaseData.filter(d => {
        return d.JXJDJTDZ.includes(this.curCity)
      }).length
    },
    // 当前城市的数据
    cityData () {
      return this.campbaseData.filter(d => {
        return d.JXJDJTDZ.includes(this.curCity)
      })
    }
  },
  async created () {
    // 页面加载的时候去加载见习基地数据
    const {data} = await apis.getCampBaseData()
    this.campbaseData = data.result.data
    // 初始化页面数据
    this.generateDistributeData()
    this.generateYearData()
  },
  watch: {
    // 以下代码用于控制数字变换的特效，可以不用看
    'campbaseData.length' (newValue, oldValue) {
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
        countMap[d.PZND] = ++countMap[d.PZND] || 1
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
    // 根据当前选择城市生成相应 行政区域分布 数据
    generateDistributeData () {
      // 处理
      const countData = this.cityData.map(d => {
        d.name = /.*?[市|县](.*?区)/g.exec(d.JXJDJTDZ) ? /.*?[市|县](.*?区)/g.exec(d.JXJDJTDZ)[1] : ''
        return d
      }).reduce((countMap, d) => {
        countMap[d.name] = ++countMap[d.name] || 1
        return countMap
      }, {})

      this.distributeData = {
        columns: ['name', 'count'],
        rows: this.dict2Array(countData).filter(d => d.count > 5 && d.name)
      }
      this.distributeSettings = {
        roseType: 'radius'
      }
    },
    // 下拉列表选择后的响应事件
    onChange () {
      this.generateDistributeData()
      this.generateYearData()
    }
  }
}
</script>

<style lang="scss" scoped>
.Campbase {
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