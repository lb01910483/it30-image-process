<script>
  export default {
    name: 'ImageInfo',
    props: {
      width: {
        type: Number,
        required: true
      },
      height: {
        type: Number,
        required: true
      },
      rgbaInfo: {
        type: Array,
        required: true
      }
    }

  }
</script>

<template src="./template.html" />
<style lang="scss" src="./style.scss" scoped />