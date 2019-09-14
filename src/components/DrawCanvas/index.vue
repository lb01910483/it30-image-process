<script>
  import { getImageData } from '../../lib/utils'
  import * as filter from '../../lib/filter'
  import ImageInfo from '../ImageInfo'
  import ImageSlider from '../ImageSlider'
  import { mapGetters } from 'vuex'
  export default {
    name: 'DrawCanvas',
    components: {
      ImageInfo,
      ImageSlider
    },
    data() {
      return {
        rgbaInfo: [],
        imgWidth: 0,
        imgHeight: 0
      }
    },
    computed: {
      ...mapGetters(['editImageData'])
    },
    methods: {
      drawImage(imageContent) {
        const canvas = this.$refs.drawCanvas
        const context = canvas.getContext('2d')
        let cw = window.innerWidth - 800
        cw = cw < 800 ? 800 : cw
        const ch = cw * (9 / 16)
        canvas.width = cw
        canvas.height = ch
        context.drawImage(imageContent, 0, 0, cw, ch)
        const pixelData = context.getImageData(0, 0, cw, ch)
        this.$store.commit('CHANGE_STATE_VALUE', { key: 'originalEditData', val: pixelData })
      },
      async getData(event) {
        const file = event.target.files[0]
        const data = await getImageData(file)
        this.drawImage(data.img)
        this.imgWidth = data.width
        this.imgHeight = data.height
        // this.getOriginalData(data)
      },
      getImageInfo(x, y) {
        const canvas = this.$refs.drawCanvas
        const context = canvas.getContext('2d')
        return context.getImageData(x, y, 1, 1).data
      },
      handleMouseMove(event) {
        const { offsetX, offsetY } = event
        this.rgbaInfo = Array.from(this.getImageInfo(offsetX, offsetY))
      },
      updateImage(pixelData) {
        const canvas = this.$refs.drawCanvas
        const context = canvas.getContext('2d')
        context.putImageData(pixelData, 0, 0)
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
    watch: {
      editImageData(pixelData) {
        this.updateImage(pixelData)
        this.$root.$emit('imgChange', pixelData)
      }
    }

  }
</script>

<template src="./template.html" />
<style lang="scss" src="./style.scss" scoped />