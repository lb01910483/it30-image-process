<script>
  import img1 from '../../../assets/Ill-Just-Wait-Here.jpg'
  import { fabric } from 'fabric'
  export default {
    name: 'ImageEditor',
    data() {
      return {
        width: 0,
        height: 0,
        fabricCanvas: null,
        editTexts: []
      }
    },
    methods: {
      loadImg() {
        fabric.Image.fromURL(img1, img => {
          const maxWidth = 600
          const scale = maxWidth / img.width
          this.height = scale * img.height
          this.width = scale * img.width
          this.fabricCanvas.setHeight(this.height)
          this.fabricCanvas.setWidth(this.width)
          const oImg = img.set({
            left: 0,
            width: this.width,
            height: this.height,
            hoverCursor: 'default',
            selectable: false
          })
          this.fabricCanvas.add(oImg) // 記得還是要加進 canvas 才會顯示出來呦
          this.fabricCanvas.sendToBack(oImg)
        })
      },
      render() {
        this.fabricCanvas.renderAll()
      },
      addText() {
        const editText = new fabric.IText('點擊編輯', {
          fill: '#ffffff',
          stroke: '#000000',
          fontSize: 40,
          fontFamily: 'Microsoft JhengHei, PMingLiU, sans-serif'
        })

        this.editTexts.push(editText)
        this.fabricCanvas.add(editText)
      }
    },
    mounted() {
      const canvas = this.$refs.drawCanvas
      this.fabricCanvas = new fabric.Canvas(canvas)
      this.fabricCanvas.on('object:moving', e => {
        let obj = e.target
        let boundingRect = obj.getBoundingRect(true)
        // console.log('boundingRect', boundingRect)
        // if (boundingRect.left < 0 || boundingRect.left + boundingRect.width > this.width || boundingRect.top < 0) {
        //   obj.top = obj._stateProperties.top
        //   obj.left = obj._stateProperties.left
        //   obj.setCoords()
        //   obj.saveState()
        // }
        obj.setCoords()
        console.log('moving')
        // top-left  corner
        if (boundingRect.top < 0 || boundingRect.left < 0) {
          obj.top = Math.max(obj.top, obj.top - boundingRect.top)
          obj.left = Math.max(obj.left, obj.left - boundingRect.left)
        }
        // bot-right corner
        if (
          boundingRect.top + boundingRect.height > obj.canvas.height ||
          boundingRect.left + boundingRect.width > obj.canvas.width
        ) {
          obj.top = Math.min(obj.top, obj.canvas.height - boundingRect.height + obj.top - boundingRect.top)
          obj.left = Math.min(obj.left, obj.canvas.width - boundingRect.width + obj.left - boundingRect.left)
        }
      })
      this.loadImg()
      this.addText()
    }
  }
</script>

<template src="./template.html" />
<style lang="scss" src="./style.scss" scoped />