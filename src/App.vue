<template>
  <div id="app">
    <div class="modal" v-show="show">
      <p>请在移动端运行，抱歉</p>
      <p>谷歌浏览器请打开开发者工具并选择手机模式</p>
    </div>
    <router-view v-on:listenplay="play"></router-view>
    <musicbottom v-on:open="open" v-on:changesong="changesong"></musicbottom>
    <play ref="play"></play>
  </div>
</template>

<script>
import musicheader from "./components/musicheader.vue";
import musicbottom from "./components/musicbottom.vue";
import play from "./page/play.vue";
import currentlist from "./components/currentlist.vue";
import Rem from "./util/Rem";
export default {
  name: "app",
  data() {
    return {
      show: false,
      placeholder: "🔍搜索歌名、歌手、专辑",
      placeholder1: ""
    };
  },
  methods: {
    focusin() {
      this.$refs.search_input.style.left = "13%";
      var _this = this;
      setTimeout(() => {
        this.placeholder = "🔍";
        this.placeholder1 = "搜索歌名、歌手、专辑";
      }, 300);
    },
    focusout() {
      this.placeholder1 = "";
      this.$refs.search_input.style.left = "33%";
      this.placeholder = "🔍搜索歌名、歌手、专辑";
    },
    play(id) {
      this.$refs.play.showMe(id);
    },
    open() {
      this.$refs.play.showMe();
    },
    changesong(id) {
      this.$refs.play.playWitch(id);
    },
    check() {
      var isPhone = /Android|webOS|iPhone|iPod|BlackBerry/i.test(
        navigator.userAgent
      )
        ? true
        : false;
      if (isPhone) {
        this.show = false;
      } else {
        // 屏幕尺寸过大
        this.show = true;
      }
    }
  },
  components: {
    musicheader,
    musicbottom,
    play,
    currentlist,
    play
  },
  mounted() {
    var _this = this;
    this.check();
    var SCREENTYPE =
      "orientationchange" in window ? "orientationchange" : "resize";
    window.addEventListener(SCREENTYPE, function() {
      _this.check();
    });
    this.$nextTick(() => {
      new Rem();
    });
  }
};
</script>

<style>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: all linear 0s;
}
div,
body,
*,
ul,
p,
li {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
}
@font-face {
  font-family: "iconfont"; /* project id 478040 */
  src: url("//at.alicdn.com/t/font_478040_iec5nx6wftn.eot");
  src: url("//at.alicdn.com/t/font_478040_iec5nx6wftn.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_478040_iec5nx6wftn.woff") format("woff"),
    url("//at.alicdn.com/t/font_478040_iec5nx6wftn.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_478040_iec5nx6wftn.svg#iconfont") format("svg");
}
.clearfix:after {
  content: ".";
  height: 0;
  clear: both;
  display: block;
  visibility: hidden;
}
.icon {
  font-family: "iconfont";
  font-style: normal;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: scroll;
}

.modal {
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
.search {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.search input {
  width: 80%;
  text-align: left;
  height: 100%;
  height: 36px;
  border-radius: 100px;
  outline: 0;
  border: 0;
  box-sizing: border-box;
  padding: 0 7%;
  background: rgba(255, 255, 255, 0.7);
}
.search label {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 33%;
  transition: all 0.3s;
  color: #888;
  font-size: 12px;
}
</style>
