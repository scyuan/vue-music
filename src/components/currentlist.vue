<template>
  <transition name="slideUp">
    <div class="currentlist" v-show="show" @touchmove.prevent @scroll.prevent>
      <div class="content">
        <div class="list-wrap">
          <div class="top">
            <span>
              <i class="icon">&#xe6af;</i>正在播放列表
            </span>
            <span @click="hideMe()">关闭</span>
          </div>
          <ul class="wrap-content">
            <li
              class="wrap-item"
              v-for="(item,index) in getList"
              :key="index"
              @click="play(item.id,index)"
            >
              <span class="name">
                <i v-if="index == currIndex" class="icon icon-play">&#xe643;</i>
                {{item.name}}
              </span>
              <!-- <span class="singer">&nbsp;-&nbsp;{{item.singer}}</span> -->
              <i class="icon">&#xe621;</i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    showMe() {
      console.log(111);
      this.show = true;
    },
    hideMe() {
      this.show = false;
    },
    play(id) {
      this.$emit("changesong", id);
    }
  },
  computed: {
    getList() {
      return this.$store.state.currList;
    },
    currIndex() {
      return this.$store.state.currIndex;
    }
  },
  mounted() {
    document.getElementsByClassName("currentlist")[0].addEventListener(
      "touchmove",
      function(e) {
        console.log("1111");
        e.preventDefault();
      },
      false
    );
    document.getElementsByClassName("currentlist")[1].addEventListener(
      "touchmove",
      function(e) {
        console.log("1111");
        e.preventDefault();
      },
      false
    );
  }
};
</script>
<style scoped>
.slideUp-enter,
.slideUp-leave-to {
  transform: translateY(100%);
}
.slideUp-enter-to,
.slideUp-leave {
  transform: translateY(0);
}
.slideUp-enter-active,
.slideUp-leave-active {
  transition: all 0.3s;
}
.currentlist {
  position: fixed;
  z-index: 200;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.icon-play {
  color: red;
}
.content {
  position: relative;
  height: 100%;
}
.list-wrap {
  position: absolute;
  bottom: 0;
  height: 400px;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
}
.singer {
  font-size: 0.346667rem /* 13/37.5 */;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
.wrap-content {
  height: 9.6rem /* 360/37.5 */;
  overflow: hidden;
  overflow-y: scroll;
  padding: 0 0.4rem /* 15/37.5 */;
  padding-bottom: 0.8rem /* 30/37.5 */;
  font-size: 0.4rem /* 15/37.5 */;
}
.top {
  height: 1.066667rem /* 40/37.5 */;
  padding: 0 0.4rem /* 15/37.5 */;
  line-height: 1.066667rem /* 40/37.5 */;
}

.wrap-item > i {
  float: right;
  margin-right: 15px;
  font-size: 14px;
  color: #999;
}
.wrap-item {
  height: 1.066667rem /* 40/37.5 */;
  line-height: 1.04rem /* 39/37.5 */;
  text-align: left;
  border-bottom: 1px solid #dedede;
}
.top span:nth-child(1) {
  float: left;
}
.top span:nth-child(1) i {
  margin-right: 5px;
  font-size: 20px;
  vertical-align: top;
}
.top span:nth-child(2) {
  float: right;
}
</style>