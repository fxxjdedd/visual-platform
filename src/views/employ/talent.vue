<template>
  <div class="Talent">
    <div class="Talent__Count">
      <span class="Talent__Count__Unit">共</span>
        {{dataCount}}
      <span class="Talent__Count__Unit">条数据</span>
    </div>
    <div class="Talent__DS">
      <ve-histogram
        :data="DSChartData"
        :settings="DSChartSettings"
        :legend-visible="false" 
        :title="{text:'城市职位情况', left:'45%'}">
      </ve-histogram>
    </div>
    <div class="Talent__GS">
      <ve-bar
        :data="GSChartData"
        :settings="GSChartSettings"
        :legend-visible="false" 
        :title="{text:'公司发布职位情况', left:'45%'}"
        :label="{position:'insideLeft'}">
      </ve-bar>
    </div>
    <div class="Jobwanted__Table">
      <el-table
        :data="talentData.slice(0,300)">
        <el-table-column
          label="地市"
          prop="DS">
        </el-table-column>
        <el-table-column
          label="联系电话"
          prop="LXDH">
        </el-table-column>
        <el-table-column
          label="公司"
          prop="DWMC">
        </el-table-column>
        <el-table-column
          label="岗位"
          prop="ZPGW">
        </el-table-column>
        <el-table-column
          label="待遇"
          prop="TGDY">
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
      talentData: [],
      // 数据总量的值
      dataCount: 0
    }
  },
  computed: {
    DSData () {
      return this.talentData.reduce((item, next) => {
        if (!item[next.DS]) item[next.DS] = 0
        item[next.DS] += 1
        return item
      }, {})
    },
    DSChartData () {
      return {
        columns: ['name', 'count'],
        rows: this.dict2Array(this.DSData).sort((a, b) => b.count - a.count)
      }
    },
    DSChartSettings () {
      return {
      }
    },
    GSData () {
      return this.talentData.reduce((item, next) => {
        if (!item[next.DWMC]) item[next.DWMC] = 0
        item[next.DWMC] += 1
        return item
      }, {})
    },
    GSChartData () {
      return {
        columns: ['name', 'count'],
        rows: this.dict2Array(this.GSData).sort((a, b) => b.count - a.count).slice(0, 10)
      }
    },
    GSChartSettings () {
      return {
      }
    }
  },
  async created () {
    // 页面加载的时候去加载见习基地数据
    const {data} = await apis.getTalentData()
    this.talentData = sampleSize(data.result.data, 990)
  },
  watch: {
    // 以下代码用于控制数字变换的特效，可以不用看
    'talentData.length' (newValue, oldValue) {
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
.Talent {
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