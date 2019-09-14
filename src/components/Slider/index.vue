<script>
  export default {
    name: 'Slider',
    props: {
      title: {
        type: String,
        default: ''
      },
      max: {
        type: Number,
        default: 100
      },
      min: {
        type: Number,
        default: 0
      },
      value: {
        type: Number,
        default: 0
      }
    },
    methods: {
      handleChange(value) {
        this.$emit('sliderChange', value)
      }
    }
  }
</script>

<template src="./template.html" />
<style lang="scss" src="./style.scss" scoped />