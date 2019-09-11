<template>
  <div>
    <input
      type="file"
      accept="image/*"
      @change="getData"
    >
    <div>
      <canvas ref="drawCanvas" />
    </div>
  </div>
</template>

<script>
  import { getImageData } from '../lib/utils'
  import { grayscale } from '../lib/filter'
  export default {
    name: 'DrawCanvas',
    methods: {
      drawImage(data) {
        const canvas = this.$refs.drawCanvas
        const context = canvas.getContext('2d')
        const cw = window.innerWidth - 800
        const ch = cw * (9 / 16)
        canvas.width = cw
        canvas.height = ch
        context.drawImage(data.img, 0, 0, cw, ch)
        const pixelData = context.getImageData(0, 0, cw, ch)
        let t0 = window.performance.now()
        grayscale(pixelData.data)
        let t1 = window.performance.now()

        context.putImageData(pixelData, 0, 0)
      },
      async getData(event) {
        const file = event.target.files[0]
        const data = await getImageData(file)
        this.getOriginalData(data)
      },
      getOriginalData(data) {
        const canvas = document.createElement('canvas')
        canvas.width = data.width
        canvas.height = data.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(data.img, 0, 0)
        const pixelData = ctx.getImageData(0, 0, data.width, data.height)
      },

    },

  }
</script>

<style lang="scss">
</style>