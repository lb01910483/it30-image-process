<script>
  import * as handTrack from 'handtrackjs'
  export default {
    name: 'HandTrack',
    data() {
      return {
        x: 0,
        y: 0,
        isLoading: false
      }
    },
    methods: {
      loadVideo() {
        const video = this.$refs.video
        if (navigator.mediaDevices.getUserMedia) {
          return navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(stream => {
              video.srcObject = stream
              return video
            })
            .catch(function(err) {
              console.log('err', err)
            })
        }
      },
      runDetection() {
        const model = this.model
        const video = this.video
        const canvas = this.videoCanvas
        const context = canvas.getContext('2d')
        model.detect(video).then(predictions => {
          model.renderPredictions(predictions, canvas, context, video)
          if (predictions.length) {
            const [x, y, width, height] = predictions[0].bbox
            this.dispatchEvent(x + width / 2, y + height / 2)
          }
          requestAnimationFrame(this.runDetection)
        })
      },
      circle(x, y) {
        const context = this.fgCanvas.getContext('2d')
        context.beginPath()
        context.arc(x, y, 1, 0, 2 * Math.PI, true)
        context.fill()
      },
      dispatchEvent(x, y) {
        const event = new Event('mousemove')
        event.offsetX = x
        event.offsetY = y
        this.$refs.fgCanvas.dispatchEvent(event)
      },
      initialFgCanvas() {
        const canvas = this.$refs.fgCanvas
        const context = canvas.getContext('2d')
        this.setCanvasScale(canvas, context)
        context.fillStyle = 'silver'
        context.fillRect(0, 0, 450, 380)
        context.globalCompositeOperation = 'destination-out'
      },
      initialBgCanvas() {
        const canvas = this.$refs.bgCanvas
        const context = canvas.getContext('2d')
        this.setCanvasScale(canvas, context)
        context.font = '30px Microsoft JhengHei, PMingLiU, sans-serif'
        context.fillText('恭喜獲得信義區豪宅', 100, 180)
      },
      setCanvasScale(canvas, context, canvasWidth = 450, canvasHeight = 380) {
        const width = canvasWidth || canvas.width || canvas.clientWidth
        const height = canvasHeight || canvas.height || canvas.clientHeight
        const deviceRatio = window.devicePixelRatio || 1
        const bsRatio =
          context.webkitBackingStorePixelRatio ||
          context.mozBackingStorePixelRatio ||
          context.msBackingStorePixelRatio ||
          context.oBackingStorePixelRatio ||
          context.backingStorePixelRatio ||
          1
        const ratio = deviceRatio / bsRatio

        // Adjust canvas if ratio =/= 1
        if (deviceRatio !== bsRatio) {
          canvas.width = Math.round(width * ratio)
          canvas.height = Math.round(height * ratio)
          canvas.style.width = width + 'px'
          canvas.style.height = height + 'px'
          context.scale(ratio, ratio)
        }
      },
      handleMousemove(event) {
        const canvas = this.$refs.fgCanvas
        const context = canvas.getContext('2d')
        const x = event.offsetX
        const y = event.offsetY
        context.beginPath()
        context.arc(x, y, 20, 0, Math.PI * 2)
        context.fill()
      }
    },
    async mounted() {
      this.videoCanvas = this.$refs.videoCanvas
      this.fgCanvas = this.$refs.fgCanvas

      this.isLoading = true
      this.model = await handTrack.load({
        flipHorizontal: true, // flip e.g for video
        maxNumBoxes: 1, // maximum number of boxes to detect
        iouThreshold: 0.5, // ioU threshold for non-max suppression
        scoreThreshold: 0.6 // confidence threshold for predictions.
      })
      this.isLoading = false
      this.initialFgCanvas()
      this.initialBgCanvas()
      this.video = this.$refs.video
      handTrack.startVideo(this.video).then(status => {
        console.log('video started')
        if (status) {
          this.runDetection()
        } else {
          console.log('err')
        }
      })
    }
  }
</script>

<template src="./template.html" />
<style lang="scss" src="./style.scss" scoped />
