<template>
  <div id="app">
    <div class="modal" v-show='show'>
      <p>请在移动端运行，抱歉</p>
      <p>谷歌浏览器请打开开发者工具并选择手机模式</p>
    </div>
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
  data(){
    return{
      show:false
    }
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
    },
    check(){
     
      var isPhone = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)? true:false;
      if(isPhone){
        this.show = false;
      }else{
        // 屏幕尺寸过大
        this.show = true;
      }
    }
  },
  components:{
    musicheader,musicbottom,play,currentlist,play
  },
  mounted(){
    var _this = this;
    this.check();
    var SCREENTYPE = 'orientationchange' in window ? 'orientationchange' : 'resize';
    window.addEventListener(SCREENTYPE,function(){
      _this.check();
    });
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
  src: url('//at.alicdn.com/t/font_478040_752efa8h70ifi529.eot');
  src: url('//at.alicdn.com/t/font_478040_752efa8h70ifi529.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_478040_752efa8h70ifi529.woff') format('woff'),
  url('//at.alicdn.com/t/font_478040_752efa8h70ifi529.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_478040_752efa8h70ifi529.svg#iconfont') format('svg');
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

.modal{
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #fff;
  z-index: 9999;
  text-align: center;
  padding-top: 300px;
}
</style>
