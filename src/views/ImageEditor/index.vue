<script>
  import { fabric } from 'fabric'
  import { getImageUrl } from '../../lib/utils'
  export default {
    name: 'ImageEditor',
    data() {
      return {
        width: 0,
        height: 0,
        fabricCanvas: null,
        editTexts: [],
        currentIndex: 0,
        memes: []
      }
    },
    methods: {
      cleanAll() {
        this.fabricCanvas.clear()
        this.editTexts = []
      },
      loadImg(path) {
        this.cleanAll()
        fabric.Image.fromURL(
          path,
          img => {
            const maxWidth = 600
            const scale = maxWidth / img.width
            this.height = scale * img.height
            this.width = scale * img.width
            this.fabricCanvas.setHeight(this.height)
            this.fabricCanvas.setWidth(this.width)
            const newImg = img.set({
              hoverCursor: 'default',
              selectable: false
            })
            newImg.scaleToHeight(this.height)
            newImg.scaleToWidth(this.width)
            this.fabricCanvas.add(newImg)
            this.addText()
            // 讓圖片一直在最底層 不會影響到字的顯示
            this.fabricCanvas.sendToBack(newImg)
          },
          {
            crossOrigin: 'Anonymous'
          }
        )
      },
      render() {
        this.fabricCanvas.renderAll()
      },
      addText() {
        const editText = new fabric.IText('點擊編輯', {
          top: 10 + this.editTexts.length * 50,
          fill: '#ffffff',
          stroke: '#000000',
          fontSize: 40,
          fontFamily: 'Microsoft JhengHei, PMingLiU, sans-serif'
        })
        this.editTexts.push(editText)
        this.fabricCanvas.add(editText)
        editText.centerH()
      },
      getData(event) {
        const file = event.target.files[0]
        this.loadImg(getImageUrl(file))
      },
      loadCurrentImg() {
        const currentFile = this.memes[this.currentIndex]
        this.loadImg(currentFile.url)
      },
      getRandomIndex() {
        this.currentIndex = Math.floor(Math.random() * 100)
        this.loadCurrentImg()
      },
      getMemesJson() {
        return fetch('https://api.imgflip.com/get_memes').then(response => response.json())
      },
      colorChange(e, index) {
        const target = this.editTexts[index]
        target.set('fill', e.target.value)
        this.render()
      },
      textChange(val, index) {
        const target = this.editTexts[index]
        target.set('text', val)
        this.render()
      },
      downloadImg() {
        const url = this.fabricCanvas.toDataURL({
          format: 'png'
        })
        const link = document.createElement('a')
        link.href = url
        link.download = 'yourname.png'
        link.click()
      }
    },
    async mounted() {
      const result = await this.getMemesJson()
      this.memes = result.data.memes
      const canvas = this.$refs.drawCanvas
      this.fabricCanvas = new fabric.Canvas(canvas)
      this.fabricCanvas.on('object:moving', e => {
        const obj = e.target
        obj.setCoords()
        const { top, left, width, height } = obj.getBoundingRect()
        if (top < 0) {
          obj.top = 0
        }
        if (top + height > this.height) {
          obj.top = this.height - height
        }
        if (left < 0) {
          obj.left = 0
        }
        if (left + width > this.width) {
          obj.left = this.width - width
        }
        this.fabricCanvas.renderAll()
      })
      // window.addEventListener('keydown', event => {
      //   if (event.keyCode == 8 || event.keyCode == 46) {
      //     if (this.fabricCanvas.getActiveObject()) {
      //       this.fabricCanvas.remove(this.fabricCanvas.getActiveObject())
      //     }
      //   }
      // })
      this.loadCurrentImg()
    }
  }
</script>

<template src="./template.html" />
<style lang="scss" src="./style.scss" scoped />