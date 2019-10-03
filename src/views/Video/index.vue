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
        enableOffscreen: false,
        showCanvas: true,
        tmpFps: 0,
        tmpCount: 0
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
        // this.tmpFps += fps
        // this.tmpCount += 1
        // if (this.tmpCount === 100) {
        //   console.log('avg', this.tmpFps / this.tmpCount)
        // }
        this.lastCallTime = performance.now()
        this.isPlay = true
        if (this.enableOffscreen) {
          this.capture
            .grabFrame()
            .then(imageBitmap => {
              worker.postMessage(
                {
                  imageBitmap,
                  sliderValue: this.sliderValue,
                  type: 'process'
                },
                [imageBitmap]
              )
            })
            .catch(err => {
              // 目前發現不會每次都成功，似乎跟原本影片 fps 沒有達到有關係
              // console.log('play video error', err)
            })
        } else {
          const canvas = this.$refs.drawCanvas
          const video = this.$refs.video
          const context = canvas.getContext('2d')
          context.drawImage(video, 0, 0, this.width, this.height)
          const pixelData = context.getImageData(0, 0, this.width, this.height)
          const result = applyFilters(pixelData, this.sliderValue)
          context.putImageData(result, 0, 0)
          this.barrage.draw()
        }

        requestAnimationFrame(this.drawCanvas)
      },
      addBarrage() {
        if (!this.barrageInput) return
        if (this.enableOffscreen) {
          worker.postMessage({
            data: { text: this.barrageInput },
            type: 'barrage'
          })
        } else {
          this.barrage.addBarrage({ text: this.barrageInput })
        }
        this.barrageInput = ''
      },
      slowMainThread() {
        this.fibResult = 0
        if (this.enableWorker) {
          worker.postMessage({ type: 'fib', fibCount: 40 })
        } else {
          this.fibResult = fib(40)
        }
      },
      init() {
        let cw = window.innerWidth - 800
        cw = cw < 800 ? 800 : cw
        const ch = cw * (9 / 16)
        this.width = cw
        this.height = ch
        const canvas = this.$refs.drawCanvas
        canvas.width = this.width
        canvas.height = this.height
        if (this.enableOffscreen) {
          const offscreen = canvas.transferControlToOffscreen()
          worker.postMessage({ offscreen, type: 'init', width: this.width, height: this.height }, [offscreen])
        } else {
          const context = canvas.getContext('2d')
          this.barrage = new Barrage({ ctx: context, width: this.width, height: this.height })
        }
      }
    },
    watch: {
      enableOffscreen() {
        this.showCanvas = false
        this.$nextTick(() => {
          this.showCanvas = true
          this.$nextTick(() => {
            this.init()
            this.drawCanvas()
          })
        })
      }
    },
    mounted() {
      this.init()
      const video = this.$refs.video
      video
        .play()
        .then(() => {
          console.log('play video start')
          const stream = video.captureStream()
          const track = stream.getVideoTracks()[0]
          this.capture = new ImageCapture(track)
          this.drawCanvas()
        })
        .catch(err => {
          console.log('play video error', err)
        })
      worker.onmessage = e => {
        this.fibResult = e.data
      }
      worker.onerror = ev => {
        console.log('error', ev)
      }
    }
  }
</script>

<template src="./template.html" />
<style lang="scss" src="./style.scss" scoped />