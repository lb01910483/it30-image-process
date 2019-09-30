<script>
  import { applyFilters, fib } from '../../lib/utils'
  import ImageSlider from '../../components/ImageSlider'
  import { mapGetters, mapState } from 'vuex'
  import Barrage from '../../lib/barrage'
  const worker = new Worker('../../lib/canvas.worker.js', { type: 'module' })
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
        lastCallTime: 0,
        barrage: null,
        barrageInput: '',
        fibResult: 0,
        enableWorker: false
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
        context.drawImage(video, 0, 0, this.width, this.height)
        const pixelData = context.getImageData(0, 0, this.width, this.height)
        const result = applyFilters(pixelData, this.sliderValue)
        context.putImageData(result, 0, 0)
        //
        // const canvas = document.createElement('canvas')
        // canvas.width = this.width
        // canvas.height = this.height
        // const ctx = canvas.getContext('2d')
        // ctx.drawImage(video, 0, 0)
        // const pixelData = ctx.getImageData(0, 0, this.width, this.height)
        // worker.postMessage({ 'imageData': pixelData, sliderValue: this.sliderValue })
        // this.barrage.draw()
        requestAnimationFrame(this.drawCanvas)
      },
      addBarrage() {
        this.barrage.addBarrage({ text: this.barrageInput })
        this.barrageInput = ''
      },
      slowMainThread() {
        this.fibResult = 0
        if (this.enableWorker) {
          worker.postMessage({ type: 'fib', fibCount: 40 })
        } else {
          this.fibResult = fib(40)
        }
      }
    },
    mounted() {
      let cw = window.innerWidth - 800
      cw = cw < 800 ? 800 : cw
      const ch = cw * (9 / 16)
      this.width = cw
      this.height = ch
      const video = this.$refs.video
      const canvas = this.$refs.drawCanvas
      canvas.width = this.width
      canvas.height = this.height
      const context = canvas.getContext('2d')
      this.barrage = new Barrage(canvas)
      video.play().then(() => {
        console.log('play video start')
      }).catch((err) => {
        console.log('play video error', err)
      })
      // worker.onmessage = (e) => {
      //   const image = e.data
      //   if (image) {
      //     const current = performance.now()
      //     const fps = 1000 / (current - this.lastCallTime)
      //     this.fps = fps
      //     this.lastCallTime = performance.now()
      //     context.putImageData(image, 0, 0)
      //   }
      // }
      worker.onmessage = (e) => {
        this.fibResult = e.data
      }
      worker.onerror = ((ev) => {
        console.log('error', ev)
      })
    }
  }
</script>

<template src="./template.html" />
<style lang="scss" src="./style.scss" scoped />