<script>
  import { applyFilters } from '../../lib/utils'
  import ImageSlider from '../../components/ImageSlider'
  import { mapGetters, mapState } from 'vuex'
  export default {
    name: 'Video',
    components: {
      ImageSlider
    },
    data() {
      return {
        isPlay: false,
        width: 0,
        height: 0,
        fps: 0,
        lastCallTime: 0
      }
    },
    computed: {
      ...mapState({
        sliderValue: state => state.sliderValue
      }),
      videoStyle() {
        return {
          width: `${this.width}px`,
          height: `${this.height}px`
        }
      }
    },
    methods: {
      drawCanvas() {
        const current = performance.now()
        const fps = 1000 / (current - this.lastCallTime)
        this.fps = fps
        this.lastCallTime = performance.now()
        const canvas = this.$refs.drawCanvas
        const video = this.$refs.video
        const context = canvas.getContext('2d')
        this.isPlay = true
        canvas.width = this.width
        canvas.height = this.height
        context.drawImage(video, 0, 0, this.width, this.height)
        const pixelData = context.getImageData(0, 0, this.width, this.height)
        const result = applyFilters(pixelData, this.sliderValue)
        context.putImageData(result, 0, 0)
        requestAnimationFrame(this.drawCanvas)
      }
    },
    mounted() {
      let cw = window.innerWidth - 800
      cw = cw < 800 ? 800 : cw
      const ch = cw * (9 / 16)
      this.width = cw
      this.height = ch
    }
  }
</script>

<template src="./template.html" />
<style lang="scss" src="./style.scss" scoped />