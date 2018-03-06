<template>
	<div class="mv">
		<div @click='playMV(index)' class="mv-wrap" v-for='(item,index) in list' v-bind:style="{backgroundImage:'url('+item.cover+')'}">
			<span class="playcount"><i class="icon">&#xe615;</i>{{parseToWan(item.playCount)}}</span>
			<p class="desc">{{item.name}}</p>
		</div>
		
		<div class="video">
			<div class="video-div" @click='hoverMv()'>
				<video id="media" width="100%" height="auto" autoplay @timeupdate='timeupdate()' @canplay='canplay()'> 
			  		<source v-bind:src="src_mp4">
  				</video>
  				<transition name='c-show'>
  					<div class="control" v-show='control_show'>
  						<div class="control-wrap">
  							<i class="icon back-icon">&#xe628;</i>
  							<i class="icon play-icon" @click='playOrPause()' v-html='play'></i>
  						</div>
  					</div>
  				</transition>	
				<div class="mv_progress_bar" id='a'></div>
  				<div class="mv_played_progress" id='b' ref='played'></div>
  				<transition name='c-show'>
  					<div class="dian" ref='dian' v-show="control_show"></div>
  				</transition>
			</div>
			
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				list:[],
				src_mp4:'http://localhost:3000/mv/url?url=http://v4.music.126.net/20180307033956/08c0a523e3874e3c67133b94a7d509c4/web/cloudmusic/ICEwICQwIGAgICAxMGEyMA==/mv/5779389/b6bb32917b2e0ef12e9a849997d8dfac.mp4',
				control_show:false,
				duration:99999999,
				media:0,
				play:"&#xe62a;",
				isPlay:true

			}
		},
		methods:{
			parseToWan(int){
	        	if(int>10000){
	        		return Math.floor(int/10000)+'万';
	        	}else{
	        		return int;
	        	}
	        },
	        playMV(index){

	        },
	        hoverMv(){
	        	
	        	if(this.control_show){
	        		this.control_show = false;
	        		$('#a').removeClass('height2');
	        		$('#b').removeClass('height2');
	        	}else{
	        		this.control_show = true;
	        		$('#a').addClass('height2');
	        		$('#b').addClass('height2');
	        	}
	        },
	        // 可以播放，获取mv长度
	        canplay(){
	        	var media = document.getElementById('media');
	        	this.media = media;
	        	this.duration = media.duration;
	        	this.isPlay = true;
				//console.log(media.duration);
	        },
	        timeupdate(){
	        	var currTime = this.media.currentTime;
	        
	        	var rate = currTime/this.duration;

	        	var width = screen.width;

	        	this.$refs.played.style.width = width * rate + 'px';
	        	this.$refs.dian.style.left = width * rate - 4 + 'px';
	        	
	        },
	        playOrPause(){
	        	if(this.isPlay){
	        		this.isPlay = false;
	        		this.play = '&#xe62c;'
	        		this.media.pause();
	        	}else{
	        		this.isPlay = true;
	        		this.play = '&#xe62a;';
	        		this.media.play();
	        	}
	        }
		},
		mounted(){
			this.$http.get('http://localhost:3000/top/mv?limit=10').then(res=>{
				this.list = res.data.data;
				console.log(this.list)
			},error=>{
				console.log(error);
			})
			
		}
	}
</script>
<style scoped>
.c-show-enter,.c-show-leave-to{
	opacity: 0;
}
.c-show-enter-to,.c-show-leave{
	opacity: 1;
}
.c-show-enter-active,.c-show-leave-active{
	transition: all .3s;
}
.mv{
	padding-bottom: 40px;
	padding-top: 72px;
}
.mv-wrap{
	height: 180px;
	margin-bottom: 4px;
	background-image: url(../assets/img/timg.jpg);
	background-position: center top;
	background-size: 100% auto;
	position: relative;
}
.desc,.playcount{
	position: absolute;
	color: #fff;
}
.desc{
	bottom: 10px;
	left: 10px;
}
.playcount{
	
	padding: 2px 4px;
	background: rgba(0,0,0,0.2);
	border-radius: 50px;
	top: 10px;
	right: 10px;
	
	font-size: 14px;
}
.playcount i{
	font-size: 24px;
	vertical-align: middle;
}
.video{
	position: fixed;
	z-index: 1000;
	height: 100%;
	width:100%;
	top: 0;
	background-color: #fff;
}
.video-div{
	background-color: #000;
	height: 220px;
	width: 100%;
	display: flex;
	align-items: center;
	position: relative;
}
.control{
	height: 100%;
	background: rgba(0,0,0,0.4);
	width: 100%;
	position: absolute;
	bottom: 0;
}
.control-wrap{
	height: 100%;
	position: relative;
}
.mv_progress_bar{
	height: 1px;
	background-color: #ccc;
	width: 100%;
	position: absolute;
	bottom: 0;
	left: 0;
	z-index: 2;
	transition: all 0.3s;
}
.mv_played_progress{
	height: 1px;
	background-color: #f01414;
	position: absolute;
	bottom: 0;
	left: 0;
	z-index: 3;
	width: 0px;
	transition:  all 0.3s;
}
.back-icon{
	color: #fff;
	font-size: 22px;
	position: absolute;
	left: 10px;
	top: 10px;
}
.play-icon{
	color: #fff;
	font-size: 32px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
}
.height2{
	height: 2px;
}
.dian{
	height: 8px;
	width: 8px;
	border-radius: 4px;
	background-color: #f01414;
	position: absolute;
	bottom: -3px;
	left: 0;
	z-index: 4;
}
</style>