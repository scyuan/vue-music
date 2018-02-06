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
					<i class="icon icon-prev">&#xe610;</i>
					<i class="icon icon-play" v-html='getIcon' @click='changeState()'></i>
					<i class="icon">&#xe611;</i>
					<i class="icon icon-list">&#xe72f;</i>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
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

	}
</script>
<style scoped>
.bottom{
	height: 40px;
	width: 100%;
	background: #ee4000;
	position: fixed;
	bottom: 0;
	left: 0;
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
	top: -10px;
	left: -55px;
	border-radius: 20px;
	border:2px solid #ee4000;
}
.currSongInfo,.wrap,.info,.do{
	height: 100%;
	color: #fff;
}
.info{
	width: 40%;
	float: left;
	padding-top: 1.5px;
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
	line-height: 40px;
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