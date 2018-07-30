<template>
	<div class="bottom">
		<div class="wrap">
			<img class="song-img" v-bind:src="getUrl" alt="" @click='open'>
			<div class="currSong">
				<div class="info">
					<p class="name">{{getName}}</p>
					<p class="singer">{{getSinger}}</p>
				</div>
				<div class="do">
					<!-- <i class="icon icon-prev" @click='prev()'>&#xe610;</i> -->
					<i class="icon icon-play" v-html='getIcon' @click='changeState()'></i>
					<!-- <i class="icon" @click='next()'>&#xe611;</i> -->
					<i class="icon icon-list" @click='getCurrentList()'>&#xe72f;</i>
				</div>
			</div>
		</div>
		<currentlist ref='currentlist' v-on:changesong='changesong'></currentlist>
	</div>
</template>
<script>
import currentlist from './currentlist.vue'
	export default{
		data:function(){
			return {
				imgUrl:this.$store.state.currSong.url,
				name:this.$store.state.currSong.name,
				singer:this.$store.state.currSong.singer
			}
		},
		computed:{
			getUrl(){
				return this.$store.state.currSong.url;
			},
			getName(){
				return this.$store.state.currSong.name;
			},
			getSinger(){
				return this.$store.state.currSong.singer
			},
			getIcon(){
				if(this.$store.state.currState)
					return '&#xe613;'
				else
					return "&#xe668;"
			}
		},
		methods:{
			prev(){
				var list = this.$store.state.currList;
				var index = this.$store.state.currIndex;
				if(index == 0)
					index = list.length-1;
				else
					index--;
				this.$emit("changesong",list[index].id);

			},
			next(){
				var list = this.$store.state.currList;
				var index = this.$store.state.currIndex;
				if(index == list.length - 1)
					index = 0;
				else
					index++;
				this.$emit("changesong",list[index].id);
			},
			changesong(id){
				this.$emit('changesong',id)
			},
			getCurrentList(){
				this.$refs.currentlist.showMe();
			},
			open(){
				console.log('open');
				this.$emit('open','no data');
			},
			changeState(){
				if(this.$store.state.currState){
					//当前是播放状态，点击则暂停
					this.$store.commit('setCurrState',false);
				}
				else{
					//反之播放
					this.$store.commit('setCurrState',true);
				}
			}
		},
		components:{
			currentlist
		}

	}
</script>
<style scoped>
.bottom{
	height: 48px;
	width: 95%;
	border-radius: 10px;
	background: linear-gradient(45deg,rgb(255,100,100),rgb(255,0,0),rgb(255,100,100));
	position: fixed;
	bottom: 10px;
	left: 50%;
	transform: translateX(-50%);
	padding: 0px 10px 0px 65px;
	z-index: 22;
}
.wrap{
	position: relative;
}
.song-img{
	width: 44px;
	height: 44px;
	position: absolute;
	top: 2px;
	left: -55px;
	border-radius: 22px;
	border:2px solid #ee4000;
}
.currSongInfo,.wrap,.info,.do{
	height: 100%;
	color: #fff;
}
.info{
	width: 40%;
	float: left;
	padding-top: 3px;
}
.name{
	font-size: 14px
}
.singer{
	font-size: 12px;
}
.do{
	width: 60%;
	float: right;
	font-size: 24px;
	line-height: 48px;
	text-align: right;
}
.do i{
	padding: 0 2px;
	vertical-align: middle;
	padding-left: 12px;
}
.icon-play{
	font-size:30px;
}
</style>