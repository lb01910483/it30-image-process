<template>
  <div>
    <el-menu
      :router="true"
      default-active="/video"
    >
      <el-menu-item index="/">
        <span slot="title">影像濾鏡 - js</span>
      </el-menu-item>
      <el-menu-item index="/cssFilter">
        <span slot="title">影像濾鏡 - css</span>
      </el-menu-item>
      <el-menu-item index="/video">
        <span slot="title">影片播放</span>
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