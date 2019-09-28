<template>
  <div>
    <el-menu
      :router="true"
      default-active="/"
    >
      <el-menu-item index="/">
        <span slot="title">影像濾鏡 - js</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'SideNav'
  }
</script>

<style lang="scss">
  .el-menu {
    height: 100%;
  }
</style>