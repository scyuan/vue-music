<template>
  <transition name="slide">
    <div class="play" v-show="show">
      <div class="aaa">
        <audio
          id="audio"
          v-bind:src="songUrl"
          autoplay
          @canplaythrough="canPlay()"
          @timeupdate="update()"
          @ended="end()"
        ></audio>
        <div class="bg-img"></div>
        <div class="wrap-content" @touchmove.prevent @scroll.prevent>
          <div class="header">
            <div class="back" @click="hideMe()">
              <i class="icon">&#xe622;</i>
            </div>
            <div class="title">
              <p class="name">{{name}}</p>
              <p class="singer">{{singer}}</p>
            </div>
            <div class="back"></div>
          </div>
          <div class="content" @click="showgeci()" ref="content">
            <!-- 歌曲背景 -->
            <div class="bg-div" v-show="!geci">
              <div class="bg-div-wrap">
                <div class="stick">
                  <div>
                    <img id="stick" src="../assets/img/stick_bg.png" alt />
                  </div>
                </div>
                <div class="changpian">
                  <img v-bind:src="bg" alt />
                </div>
              </div>
            </div>
            <!-- 歌曲歌词 -->
            <div class="geci-div" v-show="geci">
              <div id="lrc" @touchmove.prevent @scroll.prevent>
                <p v-for="(item,index) in song_lrc" :key="index">{{item.lrc}}</p>
              </div>
            </div>
          </div>
          <div class="do-area">
            <div class="do-wrap">
              <div class="progress">
                <span class="start_time">{{start_time}}</span>
                <div class="line">
                  <div class="line-played"></div>
                </div>
                <span class="end_time">{{end_time}}</span>
              </div>
              <div class="playpause">
                <i class="icon" v-on:click="changeCycleType()">&#xe64b;</i>
                <i class="icon" v-on:click="prev()">&#xe610;</i>
                <i class="icon" v-html="state" v-on:click="playOrPause()"></i>
                <i class="icon" v-on:click="next()">&#xe611;</i>
                <i class="icon" v-on:click="getCurrentList()">&#xe72f;</i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="state">{{freshState}}</div>
      <currentlist ref="currentlist" v-on:changesong="playWitch"></currentlist>
    </div>
  </transition>
</template>
<script>
import currentlist from "../components/currentlist.vue";
import $ from "jquery";
export default {
  data: function() {
    return {
      id: 0,
      geci: false,
      show: false,
      play: "&#xe668;",
      pause: "&#xe613",
      state: "",
      name: "",
      bg: require("../assets/img/placeholder_disk_play_song.png"),
      singer: "",
      time: 0,
      start_time: "00:00",
      end_time: "",
      songUrl: "",
      song_lrc: [],
      geci_map: 0
    };
  },
  components: {
    currentlist
  },
  computed: {
    freshState() {
      var newState = this.$store.state.currState;
      if (document.getElementById("audio") == undefined) {
        return newState;
      }
      //在播放
      if (newState) {
        document.getElementById("audio").play();
        this.state = this.pause;
        document.getElementById("stick").className = "";
        document.getElementsByClassName(
          "changpian"
        )[0].style.animationPlayState = "running";
      } else {
        document.getElementById("audio").pause();
        this.state = this.play;
        document.getElementById("stick").className = "pause";
        document.getElementsByClassName(
          "changpian"
        )[0].style.animationPlayState = "paused";
      }
      return newState;
    }
  },
  methods: {
    //初始化歌词界面
    initGeci() {
      //获取歌词
      this.getGeci();
      $("#lrc").animate({ scrollTop: 0 }, 300);
      $("#lrc")
        .children()
        .removeClass("white");
    },
    // 上一首
    prev() {
      var list = this.$store.state.currList;
      var index = this.$store.state.currIndex;
      if (index == 0) index = list.length - 1;
      else index--;
      this.playWitch(list[index].id);

      this.initGeci();
    },
    // 下一首
    next() {
      var list = this.$store.state.currList;
      var index = this.$store.state.currIndex;
      if (index == list.length - 1) index = 0;
      else index++;
      this.playWitch(list[index].id);

      this.initGeci();
    },
    // 获取当前播放列表
    getCurrentList() {
      this.$refs.currentlist.showMe();
    },
    /*
			  打开播放页（也就是当前play.vue组件），
			  1.当传入歌曲ID时：表示第一次打开当前页面，所以此时需要加载歌曲
			  2.当没有传入歌曲ID时：表示播放页面从后台显示，这时不需要加载歌曲
			 */
    showMe(id) {
      if (id === undefined) {
        this.show = true;
        return;
      }
      this.show = true;
      this.id = id;
      // 获取歌曲信息
      this.getSong();
    },
    // 更换歌曲，不需要调用this.show=true;
    playWitch(id) {
      this.id = id;
      this.getSong();
    },
    // 退出当前页面
    hideMe() {
      this.show = false;
    },
    // 监听当前播放歌曲播放结束，将状态置为暂停
    end() {
      this.state = this.play;
      this.$store.commit("setCurrState", false);
      document.getElementById("stick").className = "pause";
      document.getElementsByClassName("changpian")[0].style.animationPlayState =
        "paused";
      this.next();
    },
    // 播放，监听歌曲时间更新
    update() {
      var time = document.getElementById("audio").currentTime;
      //更新已播放时间
      this.start_time = this.secondeToTime(time);
      //更新进度
      var rate = (time * 1000) / this.time;

      document.getElementsByClassName("line-played")[0].style.width =
        rate * 236 + "px";
      if (this.song_lrc.length != 0) {
        var obj = this.geci_map.get(this.start_time);
        if (obj != undefined) {
          // console.log(obj);

          if (obj.index > 5)
            $("#lrc").animate({ scrollTop: 32 * (obj.index - 5) }, 300);
          $("#lrc")
            .children()
            .removeClass("white")
            .eq(obj.index)
            .addClass("white");
        }
      }
    },
    canPlay() {
      this.state = this.pause;
      this.$store.commit("setCurrState", true);
      document.getElementById("stick").className = "";
      document.getElementsByClassName("changpian")[0].style.animationPlayState =
        "running";
    },
    // 播放或者暂停
    playOrPause() {
      if (this.state === this.play) {
        document.getElementById("audio").play();
        this.state = this.pause;
        this.$store.commit("setCurrState", true);
        document.getElementById("stick").className = "";
        document.getElementsByClassName(
          "changpian"
        )[0].style.animationPlayState = "running";
      } else {
        document.getElementById("audio").pause();
        this.state = this.play;
        this.$store.commit("setCurrState", false);
        document.getElementById("stick").className = "pause";
        document.getElementsByClassName(
          "changpian"
        )[0].style.animationPlayState = "paused";
      }
    },
    // 将秒转为MM:SS形式
    secondeToTime(seconde) {
      var minutes = Math.floor(seconde / 60);
      var s = Math.floor(seconde % 60);
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (s < 10) {
        s = "0" + s;
      }
      return minutes + ":" + s;
    },
    imgLoad(img, callback) {
      var timer = setInterval(function() {
        if (img.complete) {
          callback();
          clearInterval(timer);
        }
      }, 10);
    },
    // 通过歌曲ID获取歌曲信息，并根据url加载歌曲
    getSong() {
      // 将状态置位暂停
      this.state = this.play;
      this.$store.commit("setCurrState", false);
      document.getElementById("stick").className = "pause";
      document.getElementsByClassName("changpian")[0].style.animationPlayState =
        "paused";
      //获取歌曲
      this.$http
        .get("http://120.79.167.62:3000/song/detail?ids=" + this.id)
        .then(
          res => {
            this.name = res.data.songs[0].name;
            this.bg = res.data.songs[0].al.picUrl;
            //
            if (res.data.songs[0].ar.length == 1) {
              this.singer = res.data.songs[0].ar[0].name;
            } else {
              this.singer = res.data.songs[0].ar.reduce(function(x, y) {
                return x.name + "/" + y.name;
              });
            }

            this.time = res.data.songs[0].dt;
            this.end_time = this.secondeToTime(res.data.songs[0].dt / 1000);

            this.$store.commit("setCurrSong", {
              url: res.data.songs[0].al.picUrl,
              name: res.data.songs[0].name,
              singer: res.data.songs[0].ar[0].name
            });

            //获取歌曲url,加载歌曲
            this.$http
              .get(
                "http://120.79.167.62:3000/song/url?id=" + res.data.songs[0].id
              )
              .then(
                res => {
                  //console.log(res.data.data[0].url);
                  this.songUrl = res.data.data[0].url;
                  this.state = this.pause;
                  this.$store.commit("setCurrState", true);

                  //添加到正在播放列表，如果已经存在，则不添加
                  var exist = false;
                  var list = this.$store.state.currList;
                  for (let i = 0; i < list.length; i++) {
                    if (list[i].id == this.id) {
                      exist = true;
                      this.$store.commit("setCurrIndex", i);
                      break;
                    }
                  }
                  //不存在
                  if (!exist) {
                    this.$store.commit("setCurrList", {
                      id: this.id,
                      name: this.name,
                      singer: this.singer
                    });
                    this.$store.commit("setCurrIndex", list.length - 1);
                  }

                  //播放状态
                  this.state = this.pause;
                  this.$store.commit("setCurrState", true);
                  document.getElementById("stick").className = "";
                  document.getElementsByClassName(
                    "changpian"
                  )[0].style.animationPlayState = "running";

                  var img = new Image();
                  img.src = this.bg;
                  var _this = this;
                  this.imgLoad(img, function() {
                    document.getElementsByClassName(
                      "bg-img"
                    )[0].style.backgroundImage = "url(" + _this.bg + ")";
                  });
                  this.getGeci();
                },
                error => {
                  console.log(error);
                }
              );
          },
          error => {
            console.log(error);
          }
        );
    },

    getGeci() {
      this.$http.get("http://120.79.167.62:3000/lyric?id=" + this.id).then(
        res => {
          if (res.data.nolyric) {
            return;
          }
          var lrc = res.data.lrc.lyric;

          var lrcs = lrc.split("\n");

          this.geci_map = new Map();
          this.song_lrc = [];
          console.log(lrcs);
          for (let i = 0, j = 0; i < lrcs.length; i++) {
            var temp_time = lrcs[i]
              .split("]")[0]
              .split("[")[1]
              .split(".")[0];

            var temp_lrc = lrcs[i].split("]")[1];

            if (temp_lrc != "") {
              var temp = {
                time: temp_time,
                lrc: temp_lrc
              };
              this.song_lrc.push(temp);
              this.geci_map.set(temp_time, { index: j, lrc: temp_lrc });
              j++;
            }
          }
        },
        error => {
          console.log(error);
        }
      );
    },

    showgeci() {
      // console.log('打开歌词');
      if (this.geci) {
        this.geci = false;
      } else {
        this.geci = true;

        if (this.song_lrc.length != 0) {
          return;
        }
        this.getGeci();
      }
    }
  },

  mounted: function() {
    //默认是暂停，因为要先加载歌曲
    this.state = this.play;
  }
};
</script>
<style scoped>
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
.slide-leave,
.slide-enter-to {
  transform: translateX(0);
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.play {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
  top: 0;
  overflow: hidden;
}
.aaa {
  overflow: hidden;
  height: 100%;
}
.bg-img {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/placeholder_disk_play_song.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 95%;
  transform: scale(1.2);
  filter: blur(20px);
}
.wrap-content {
  position: relative;

  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
}
.header {
  height: 1.28rem /* 48/37.5 */;
  color: #fff;
}
.back {
  width: 1.28rem /* 48/37.5 */;
  line-height: 1.28rem /* 48/37.5 */;
  text-align: center;
  font-size: 0.48rem /* 18/37.5 */;
}
.back,
.title {
  float: left;
  height: 1.28rem /* 48/37.5 */;
}
.state {
  position: absolute;
  top: 1000000px;
}
.title {
  width: calc(100% - 96px);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.title .name {
  font-size: 0.48rem /* 18/37.5 */;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
}
.title .singer {
  font-size: 0.32rem /* 12/37.5 */;
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 49px;
  bottom: 160px;
}
.bg-div,
.geci-div {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.geci-div {
  color: #c1c1c1;
  font-size: 14px;
  padding: 40px 0px;
}
.geci-div div {
  height: 100%;
  text-align: center;
  overflow: hidden;
  overflow-y: scroll;
}
.geci-div p {
  line-height: 32px;
}
.geci-div .white {
  color: #fff;
}
.bg-div-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 90px;
  height: 100%;
  width: 100%;
}
.stick {
  position: absolute;
  height: 170px;
  width: 300px;
  top: 0;
  overflow: hidden;
}
.stick div {
  position: relative;
  width: 100%;
  height: 100%;
}
.stick img {
  position: absolute;
  top: -20px;
  left: 130px;
  height: 100%;
  width: auto;
  z-index: 10;
  transition: all 0.3s;
  transform-origin: 20px 21px;
}
.pause {
  transform: rotate(-20deg);
}
.changpian {
  width: 300px;
  height: 300px;
  border-radius: 150px;
  overflow: hidden;
  background-image: url(../assets/img/placeholder_disk_play_song.png);
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: round linear infinite 40s;
}
.changpian img {
  width: 220px;
  height: 220px;
  border-radius: 110px;
}
@keyframes round {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.do-area {
  height: 160px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
.do-wrap {
  width: 300px;
  height: 100%;
  margin: 0 auto;
  padding: 20px 0px 10px 0px;
}
.progress {
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.line {
  width: 236px;
  height: 1px;
  background: #fff;
  position: relative;
}
.line-played {
  height: 1px;
  background: red;
  top: 0;
  left: 0;
}
.start_time {
  padding-right: 6px;
}
.end_time {
  padding-left: 5px;
}
.start_time,
.end_time {
  display: inline-block;
  width: 32px;
  color: #fff;
  font-size: 12px;
  float: left;
}
.playpause {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.playpause i {
  flex: 1;
  color: #fff;
  text-align: center;
  font-size: 26px;
}
.playpause i:nth-child(1) {
  font-size: 30px;
}
.playpause i:nth-child(3) {
  font-size: 38px;
}
</style>