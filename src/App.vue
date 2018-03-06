<template>
  <div id="app">
    <musicheader></musicheader>
    <router-view v-on:listenplay='play'></router-view>
    <musicbottom v-on:open='open' v-on:changesong="changesong"></musicbottom>
    <play ref='play'></play>
   <!--  <currentlist></currentlist>  -->
  </div>
</template>

<script>
import musicheader from './components/musicheader.vue'
import musicbottom from './components/musicbottom.vue'
import play from './page/play.vue'
import currentlist from './components/currentlist.vue'
export default {
  name: 'app',
  methods:{
    
  },
  methods:{
    play(id){
      this.$refs.play.showMe(id);
    },
    open(){
      this.$refs.play.showMe();
    },
    changesong(id){
      this.$refs.play.playWitch(id);
    }
  },
  components:{
    musicheader,musicbottom,play,currentlist,play
  }
}
</script>

<style>
.fade-enter,.fade-leave-to{
  opacity: 0;
}
.fade-enter-to,.fade-leave{
  opacity: 1;
}
.fade-enter-active,.fade-leave-active{
  transition: all linear 0s;
}
div,body,*,ul,p,li{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
}
@font-face {
  font-family: 'iconfont';  /* project id 478040 */
  src: url('//at.alicdn.com/t/font_478040_tzmg9dcuq2rzfr.eot');
  src: url('//at.alicdn.com/t/font_478040_tzmg9dcuq2rzfr.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_478040_tzmg9dcuq2rzfr.woff') format('woff'),
  url('//at.alicdn.com/t/font_478040_tzmg9dcuq2rzfr.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_478040_tzmg9dcuq2rzfr.svg#iconfont') format('svg');
}
.clearfix:after{
  content: ".";
  height: 0;
  clear: both;
  display: block;
  visibility: hidden;
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


</style>
