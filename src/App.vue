<template>
  <div id="app">
    <transition name="fade">
      <SideNav
        v-show="showNav"
        class="nav"
      ></SideNav>
    </transition>
    <div
      class="menuTrigger"
      @click="showNav = !showNav"
    >
      <i :class="['fas', showNav ? 'fa-times': 'fa-bars']"></i>
    </div>
    <router-view />
  </div>
</template>

<script>
  import SideNav from './components/SideNav'
  export default {
    name: 'App',
    components: {
      SideNav
    },
    data() {
      return {
        showNav: false
      }
    }
  }
</script>

<style lang="scss">
  body,
  html {
    max-height: 100vh;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .nav {
    width: 250px;
    height: 100vh;
    position: fixed;
    top: 60px;
    left: 0;
    z-index: 10;
  }
  .menuTrigger {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 25px;
    border: 1px solid #eee;
    background: #f5f5f5;
    color: #ddd;
    padding: 3px 5px;
    border-radius: 3px;
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    margin: 3px;
    z-index: 10;
    cursor: pointer;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>