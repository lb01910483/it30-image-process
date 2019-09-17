<script>
  import * as filter from '../../lib/filter'
  import * as echarts from 'echarts'
  export default {
    name: 'ImageInfo',
    props: {
      width: {
        type: Number,
        required: true
      },
      height: {
        type: Number,
        required: true
      },
      rgbaInfo: {
        type: Array,
        required: true
      }
    },
    methods: {
      calcuateHistogram(pixelData) {
        const result = filter.calculateBrightness(pixelData.data)
        this.echart.setOption({
          xAxis: {
            min: -5,
            max: 260,
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            }
          },
          yAxis: {
            show: false,
            max: function (value) {
              return value.max
            }
          },
          grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 10
          },
          series: [{
            type: 'bar',
            data: result,
            large: true
          }]
        }, true, true)
      }
    },
    mounted() {
      this.echart = echarts.init(this.$refs.echart, {})
      this.$root.$on('imgChange', this.calcuateHistogram)
    }

  }
</script>

<template src="./template.html" />
<style lang="scss" src="./style.scss" scoped />