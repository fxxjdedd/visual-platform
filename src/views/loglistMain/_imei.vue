<template>
  <div class="Detail">
    <div class="Detail__Goback">
      <el-button plain @click="clickHandler">
        <i class="el-icon-arrow-left"></i>
      </el-button>
      <el-time-select
        placeholder="起始时间"
        v-model="startTime"
        :picker-options="{
          start: '00:00',
          step: '01:00',
          end: '23:59'
        }"
        @change="startTimeChange">
      </el-time-select>
      <el-time-select
        placeholder="结束时间"
        v-model="endTime"
        :picker-options="{
          start: '00:00',
          step: '01:00',
          end: '23:59',
          minTime: startTime
        }"
        @change="endTimeChange">
      </el-time-select>
      <el-button plain @click="refreshHandler" :loading="loading">
        刷新 
      </el-button>
    </div>
    
    <el-table
      :data="imeiLogs">
      <el-table-column
        label="上传时间"
        header-align="center">
        <template slot-scope="scope">
          {{convertTimeStamp(scope.row.common.time)}}
        </template>
      </el-table-column>
      <el-table-column 
        prop="device_id" 
        label="device_id"
        header-align="center"> 
      </el-table-column> 
      <el-table-column
<<<<<<< HEAD
        label="general" 
=======
        label="general"
>>>>>>> futengda
        min-width="750"
        header-align="center">
        <template slot-scope="scope">
          {{JSON.stringify(scope.row)}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {convertTimeStamp, getCurrentDay} from '@/utils'
export default {
  props: ['userImei'],
  data () {
    return {
      startTime: '00:00',
      endTime: '23:59'
    }
  },
  created () {
    if (!this.appId) this.$router.go(-1)
    this.getImeiLogs({
      userImei: this.userImei,
      startTs: this.generateTs(this.endTime),
      intervalTs: this.generateTs(this.endTime) - this.generateTs(this.startTime)
    })
  },
  computed: {
    ...mapGetters('loglist', [
      'imeiLogs',
      'appId',
      'loading'
    ])
  },
  methods: {
    ...mapActions('loglist', [
      'getImeiLogs'
    ]),
    clickHandler () {
      this.$router.go(-1)
    },
    refreshHandler () {
      this.getImeiLogs({
        userImei: this.userImei,
        startTs: this.generateTs(this.endTime),
        intervalTs: this.generateTs(this.endTime) - this.generateTs(this.startTime)
      })
    },
    convertTimeStamp,
    generateTs (time) {
      return new Date(getCurrentDay() + ' ' + time + ':00').getTime()
    },
    startTimeChange (time) {
      const endTs = this.generateTs(this.endTime)
      const intervalTs = endTs - this.generateTs(time)
      this.getImeiLogs({
        userImei: this.userImei,
        startTs: endTs,
        intervalTs
      })
    },
    endTimeChange (time) {
      const endTs = this.generateTs(time)
      const intervalTs = endTs - this.generateTs(this.startTime)
      this.getImeiLogs({
        userImei: this.userImei,
        startTs: endTs,
        intervalTs
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.Detail {
  &__Goback {
    text-align: left;
    .el-button {
      padding: 12px;
    }
  }
}
</style>
