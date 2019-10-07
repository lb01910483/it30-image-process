<script>
  import img1 from '../../../assets/Ill-Just-Wait-Here.jpg'
  import { fabric } from 'fabric'
  export default {
    name: 'ImageEditor',
    data() {
      return {
        width: 0,
        height: 0
      }
    },
    mounted() {
      let cw = window.innerWidth - 800
      cw = cw < 800 ? 800 : cw
      const ch = cw * (9 / 16)
      this.width = cw
      this.height = ch
      const canvas = this.$refs.drawCanvas
      canvas.width = this.width
      canvas.height = this.height
      console.log('fabric', fabric)
      const fabricCanvas = new fabric.Canvas(canvas)
      fabric.Image.fromURL(img1, img => {
        console.log('img', img)
        const oImg = img.set({
          left: 0
          // top: 100
          // angle: 15,
          // width: 500,
          // height: 500
        })
        fabricCanvas.add(oImg) // 記得還是要加進 canvas 才會顯示出來呦
      })
      const editText = new fabric.IText('雙擊我編輯', {
        // top: 400,
        // left: 400
      })
      fabricCanvas.add(editText)
      editText.text = '騙你的'
      console.log('editText', editText)
    }
  }
</script>

<template src="./template.html" />
<style lang="scss" src="./style.scss" scoped />