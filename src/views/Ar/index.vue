<script>
  export default {
    name: 'Ar',
    computed: {
      url() {
        return `url(${process.env.assetsPath}assets/scene.gltf)`
      }
    }
  }
</script>

<template src="./template.html" />
<style lang="scss" src="./style.scss" scoped />