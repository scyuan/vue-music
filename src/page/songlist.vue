<template>
<transition name='slide'>
	<div class="songlist">
		<div class="img-wrap">
			<div class="gedan-img" ref='gedanimg'></div>
		</div>
		
		<div class="gedan-info">
			<img v-bind:src="gedanimg" alt="" class="gedan_avator">
			<div class="wenzi">
				<p>{{name}}</p>
				<p>from &nbsp;{{creator_name}}<span class="avator" ref='avator'></span></p>
			</div>
			<div class="do">
				<div class="do-item"><i class="icon">&#xe6e0;</i><p>{{recommendCount}}</p></div>
				<div class="do-item"><i class="icon">&#xe7d2;</i><p>{{commentCount}}</p></div>
				<div class="do-item"><i class="icon">&#xe618;</i><p>{{shareCount}}</p></div>
				<div class="do-item"><i class="icon">&#xe627;</i><p>下载</p></div>
			</div>
		</div>
		<div class="header" id='header'>
			<div class="back" v-on:click='back()'>
				<i class="icon">&#xe622;</i>
			</div>
			<p class="title">歌单</p>
			<div class="back">
				
			</div>
		</div>
		<div style="height:250px;"></div>
		<ul class="body" ref="body">
			<li v-for='(item,index) in songList'>
				<gedansongitem v-bind:song='item' v-bind:index='index' v-on:listenplay='play'></gedansongitem>
			</li>
		</ul>
	</div>
</transition>
</template>
<script>
import gedansongitem from '../components/gedansongitem'
	export default{
		data:function(){
			return {
				gedanId:this.$route.query.gedanId,
				gedanimg:'',
				creator_name:'',
				name:'',
				recommendCount:0,
				commentCount:0,
				shareCount:0,
				songList:[],
			}
		},
		components:{
			gedansongitem
		},
		methods:{
			back:function(){
				window.history.back();
			},
			play(id){
				//console.log(id);
				this.$emit('listenplay',id);
			}
		},
		mounted:function(){
			console.log(this.gedanId);
			var header = document.getElementById('header');
			document.addEventListener('scroll',function(){
				
				if(window.pageYOffset >= 204){
					if(header.className.indexOf('white')===-1){
						header.className = header.className + ' white';
					}
				}else{
					header.className = header.className.replace(' white','');
				}
			})
			var _this = this;
			this.$http.get("http://localhost:3000/playlist/detail?id="+_this.gedanId)
			.then(res=>{
				console.log(res.data.result);
				_this.name = res.data.result.name;
				_this.gedanimg = res.data.result.coverImgUrl;
				_this.creator_name = res.data.result.creator.nickname;
				_this.$refs.gedanimg.style.backgroundImage='url('+res.data.result.coverImgUrl+')'
				_this.$refs.avator.style.backgroundImage='url('+res.data.result.creator.avatarUrl+')'
				_this.recommendCount = res.data.result.subscribedCount;
				_this.commentCount = res.data.result.commentCount;
				_this.shareCount = res.data.result.shareCount;
				_this.songList = res.data.result.tracks.map(function(e){
					return e;
				});
				console.log(_this.songList);
			},error=>{
				console.log(error);
			})
		}
	}
</script>
<style scoped>
.slide-enter,.slide-leave-to{
	transform: translateX(100%);
}
.slide-enter-to,.slide-leave{
	transform: translateX(0);
}
.slide-enter-active,.slide-leave-active{
	transition: all 0.3s;
}
.songlist{
	position: relative;
	z-index: 20;
	background: #fff;
	min-height: 900px;
}
.img-wrap{
	overflow: hidden;
}
.gedan-img{
	height: 100%;
	background-repeat: no-repeat;
	background-size: 100% auto;
	background-position: center;
	filter: blur(30px);
}
.gedan-info,.img-wrap{
	position: fixed;
	top: 0;
	width: 100%;
	height: 250px;
}
.gedan-info{
	background-color: rgba(0,0,0,0.2);
	padding: 50px 15px 5px 15px;
	z-index: 20;
}
.header{
	height: 46px;
	position: fixed;
	top: 0;
	width: 100%;
	color: #fff;
	z-index: 22;
	transition: all 0.2s;
}
.back{
	width: 46px;
}
.back,.title{
	height: 46px;
	text-align: center;
	line-height: 46px;
	float: left;
}
.title{
	width: calc(100% - 92px);
}
.gedan_avator{
	width: 120px;
	height: 120px;
}
.wenzi{
	height: 120px;
	width: calc(100% - 125px);
	display: inline-block;
	vertical-align: top;
	padding-left: 15px;
	padding-top: 10px;
	color: #fff;
}
.avator{
	height: 20px;
	width: 20px;
	display: inline-block;
	vertical-align: top;
	border-radius: 10px;
	overflow: hidden;
	background-repeat: no-repeat;
	background-size: 100% auto;
	background-position: center;
	margin-left: 6px;
}
.wenzi p:nth-child(2){
	margin-top: 10px;
	font-size: 14px;
}
.do{
	height: 70px;
	display: flex;
	padding-top: 10px;
}
.do .do-item{
	flex: 1;
	color: #fff;
	text-align: center;
}
.do .do-item > i{
	font-size: 28px;
}
.do .do-item > p{
	font-size: 14px;
}
.body{
	position: relative;
	z-index: 21;
	background: #fff;
	padding-bottom: 50px;
}
.white{
	background-color: #ee4000;
	color: #fff;
}
</style>