<template>
  <div id="app">
    <div ref='header' class="music-header">
      <i class="icon icon-sidebar" v-on:click='openSide()'>&#xe607;</i>
      <div class="search-area"></div>
    </div>
    <div ref='sidebar' class="sidebar">
      
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods:{
    openSide(){
        this.$refs.header.className = 'music-header header_left';
        this.$refs.sidebar.className = 'sidebar sidebar_show';
    }
  }
}
</script>

<style>
div,body,*{
  padding: 0;
  margin: 0;
}
@font-face {
  font-family: 'iconfont';  /* project id 478040 */
  src: url('//at.alicdn.com/t/font_478040_p58jr1hhz01qncdi.eot');
  src: url('//at.alicdn.com/t/font_478040_p58jr1hhz01qncdi.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_478040_p58jr1hhz01qncdi.woff') format('woff'),
  url('//at.alicdn.com/t/font_478040_p58jr1hhz01qncdi.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_478040_p58jr1hhz01qncdi.svg#iconfont') format('svg');
}
.icon{
  font-family: 'iconfont';
  font-style: normal;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;
}

.music-header{
  height: 45px;
  width: 100%;
  background: red;
  transition: all 0.6s;
  position: relative;
  left: 0;
}
.header_left{
  left: 50%;
}
.icon-sidebar{
  height: 45px;
  width: 45px;
  display: block;
  text-align: center;
  line-height: 45px;
  font-size: 20px;
  color: #fff;
}
.sidebar{
  background: url('./assets/img/timg.jpg');
  background-size: cover;
  position: fixed;
  z-index: -1;
  width: 50%;
  height: 100%;
  top: 0;
  left: -50%;
  transition: all 0.3s;
}
.sidebar_show{
  left: 0;
}
</style>
