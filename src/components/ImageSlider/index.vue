<script>
  import Slider from '../Slider'
  import { mapState } from 'vuex'
  export default {
    name: 'ImageSlider',
    components: {
      Slider
    },
    computed: {
      ...mapState({
        brightness: state => state.sliderValue.brightness,
        contrast: state => state.sliderValue.contrast,
        saturation: state => state.sliderValue.saturation,
        vibrance: state => state.sliderValue.vibrance,
        shadow: state => state.sliderValue.shadow,
        hightLight: state => state.sliderValue.hightLight,
        sharpen: state => state.sliderValue.sharpen
      })
    },
    methods: {
      sliderChange(val, key) {
        this.$store.commit('CHANGE_SLIDER_VALUE', { key, val })
      }
    }
  }
</script>

<template src="./template.html" />
<style lang="scss" src="./style.scss" scoped />