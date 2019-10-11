<script>
  import * as handTrack from 'handtrackjs'
  import { fabric } from 'fabric'
  export default {
    name: 'HandTrack',
    data() {
      return {
        x: 0,
        y: 0
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
        const canvas = this.bgCanvas
        const context = canvas.getContext('2d')

        model.detect(video).then(predictions => {
          model.renderPredictions(predictions, canvas, context, video)
          if (predictions.length) {
            const [x, y, width, height] = predictions[0].bbox
            this.x = x
            this.y = y
            this.circle(x - width / 2, y + height / 2)
          }
          requestAnimationFrame(this.runDetection)
        })
      },
      circle(x, y) {
        const context = this.fgCanvas.getContext('2d')
        context.beginPath()
        context.arc(x, y, 1, 0, 2 * Math.PI, true)
        context.fill()
      }
    },
    async mounted() {
      this.video = this.$refs.video
      this.bgCanvas = this.$refs.bgCanvas
      this.fgCanvas = this.$refs.fgCanvas
      // this.fabricCanvas = new fabric.Canvas(this.canvas)
      this.model = await handTrack.load({
        flipHorizontal: true, // flip e.g for video
        maxNumBoxes: 1, // maximum number of boxes to detect
        iouThreshold: 0.5, // ioU threshold for non-max suppression
        scoreThreshold: 0.6 // confidence threshold for predictions.
      })
      this.circle(45, 34)
      this.circle(69, 34)
      this.circle(45, 564)
      handTrack.startVideo(this.video).then(status => {
        console.log('video started', status)
        // this.fabricCanvas.isDrawingMode = true
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