<template>
	<div class="mv" v-show='show'>
		<div @click='playMV(index)' class="mv-wrap" v-for='(item,index) in list' v-bind:style="{backgroundImage:'url('+item.cover+')'}">
			<span class="playcount"><i class="icon">&#xe615;</i>{{parseToWan(item.playCount)}}</span>
			<p class="desc">{{item.name}}</p>
		</div>
		
		<transition name='slide'>
		<div class="video" v-show='video_show'>
			<div class="video-div">
				<div class="mengbann" @click.stop='hoverMv()'></div>
				<div>
					<video id="media" width="100%" height="auto" autoplay @timeupdate='timeupdate()'
						@canplaythrough='canplay()'
						@stalled='stalled()'
						@error='error()'
						@eventTester='eventTester()'
						@loadstart='loadstart()'
						@progress='progress()'
						@suspend='suspend()'
						@abort='abort()'> 
				  		<source v-bind:src="src_mp4">
	  				</video>
	  				<transition name='c-show'>
	  					<div class="control" v-show='control_show'>
	  						<div class="control-wrap">
	  							<i class="icon back-icon" @click='back()'>&#xe628;</i>
	  							<i class="icon play-icon" @click.stop='playOrPause()' v-html='play'></i>
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
			
			<div class="video-title">
				<i class="icon video-mv">&#xe62d;</i>
				<span class="video-name">{{video_name}}</span>
				<i class="icon video-info" @click='lookvideoinfo()' v-html='video_info_icon'></i>
			</div>
			<p class="video-artistName">歌手：{{artist_name}}</p>
			<p class="publish-info"><span>发行：{{publish_time}}</span><span>播放：{{parseToWan(playcount)}}</span></p>
			<p class="video-tag"><span>MV</span></p>
			<p class="video-desc" v-show='video_info_show'>{{video_desc}}</p>
			<div class="video-dos">
				<div><i class="icon">&#xe7c0;</i><span>{{zan}}</span></div>
				<div><i class="icon">&#xe648;</i><span>{{add}}</span></div>
				<div><i class="icon">&#xe62f;</i><span>{{com}}</span></div>
				<div><i class="icon">&#xe630;</i><span>{{down}}</span></div>
				
			</div>

			<!-- 相关推荐 -->
			<div class="video-xiangguan">
				<h6 class="xiangguan-title">相关推荐</h6>
				<div class="xiangguan-wrap">
					<div class="xiangguan" v-for='item in mvs'>
						<div class="xiangguan-cover" v-bind:style='{backgroundImage:"url("+item.cover+")"}'></div>
						<div class="xiangguan-wenzi">
							<p>{{item.briefDesc}}</p>
							<p><span>{{msToDuration(item.duration)}}</span>，<span>{{item.artistName}}</span></p>
							<div class="b1"></div>
						</div>
					</div>
				</div>
			</div>

			<!-- 精彩评论 -->
			<div class="video-comment">
				<h6 class="xiangguan-title">精彩评论</h6>
				<div v-for='item in hot_comments'>
					<div class="comment-box1 clearfix" v-if='item.beReplied.length==0'>
						<div class="comment-title">
							<img class="comment-avator" v-bind:src="item.user.avatarUrl" alt="">
							<div class="comment-user">
								<p>{{item.user.nickname}}</p>
								<span>{{msToDate(item.time)}}</span>
							</div>
							<span class="comment-like">{{item.likedCount}}<i class="icon">&#xe7c0;</i></span>
						</div>
						<div class="comment-wenzi1">
							<p>{{item.content}}</p>
						</div>
					</div>
					<div class="comment-box2" v-if='item.beReplied.length!=0'>
						
					</div>
				</div>
			</div>

			<!-- 最新评论 -->
			<div class="video-comment">
				<h6 class="xiangguan-title">最新评论</h6>
				<div v-for='item in comments'>

					<div class="comment-box1 clearfix" v-if='item.beReplied.length==0'>
						<div class="comment-title">
							<img class="comment-avator" v-bind:src="item.user.avatarUrl" alt="">
							<div class="comment-user">
								<p>{{item.user.nickname}}</p>
								<span>{{msToDate(item.time)}}</span>
							</div>
							<span class="comment-like">{{item.likedCount}}<i class="icon">&#xe7c0;</i></span>
						</div>
						<div class="comment-wenzi1">
							<p>{{item.content}}</p>
						</div>
					</div>

					<div class="comment-box2 clearfix" v-if='item.beReplied.length!=0'>
						<div class="comment-title">
							<img class="comment-avator" v-bind:src="item.user.avatarUrl" alt="">
							<div class="comment-user">
								<p>{{item.user.nickname}}</p>
								<span>{{msToDate(item.time)}}</span>
							</div>
							<span class="comment-like">{{item.likedCount}}<i class="icon">&#xe7c0;</i></span>
						</div>
						<div class="comment-wenzi2">
							<p class="reply">回复@<span>{{item.beReplied[0].user.nickname}}</span>:{{item.content}}</p>
							<div class="comment-replied">
								<p><span>@{{item.beReplied[0].user.nickname}}</span>：{{item.beReplied[0].content}}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</transition>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				list:[],
				src_mp4:'',
				control_show:false,
				duration:99999999,
				media:0,
				play:"&#xe62a;",
				isPlay:true,
				show:true,
				video_info_icon:'&#xe6aa;',
				video_info_show:false,
				mvs:[],
				hot_comments:[],
				comments:[],
				video_desc:'',
				publish_time:'',
				playcount:0,
				artist_name:'',
				video_name:'',
				video_show:false,
				add:0,
				zan:0,
				down:0,
				com:0,
			}
		},
		methods:{
			loadstart(){
				console.log('开始请求数据');
			},
			progress(){
				console.log('正在请求数据');
			},
			suspend(){
				console.log('延迟下载');
			},
			abort(){
				console.log('客户端主动终止下载（不是因为错误引起）');
			},
			error(){
				console.log('请求数据时遇到错误');
			},
			stalled(){
				console.log('网速失速');
			},
			msToDuration(ms){
				var minutes = Math.floor(ms/1000/60);
				var seconds = Math.floor((ms/1000)%60);
				if(minutes<10){
					minutes = "0" + minutes
				}
				if(seconds<10){
					seconds = "0" + seconds;
				}
				return minutes+':'+seconds;
			},
			back(){
				document.getElementsByClassName("video")[0].scrollTop = 0;
				this.video_show = false;
				this.media.pause();
			},
			parseToWan(int){
	        	if(int>10000){
	        		return Math.floor(int/10000)+'万';
	        	}else{
	        		return int;
	        	}
	        },
	        playMV(index){
	        	var _this = this;
	        	this.video_show = true;
	        	
	        	setTimeout(function(){
	        		_this.getMV(_this.list[index].id);
	        		_this.getSimilarVideo(_this.list[index].id);
					_this.getComments(_this.list[index].id);
	        	},300);
	        	
	        	
	        },
	        lookvideoinfo(){
	        	if(!this.video_info_show){
	        		//当前没显示详情
	        		this.video_info_show = true;
	        		this.video_info_icon = '&#xe6b1;'
	        	}else{
	        		this.video_info_show = false;
	        		this.video_info_icon = '&#xe6aa;'
	        	}
	        },
	        hoverMv(){
	        	
	        	var _this = this;
        		this.control_show = true;
        		$('#a').addClass('height2');
        		$('#b').addClass('height2');
        		setTimeout(function(){
					_this.control_show = false;
        			$('#a').removeClass('height2');
        			$('#b').removeClass('height2');
        		},2000);
	        	
	        },
	        // 可以播放，获取mv长度
	        canplay(){
	        	var media = document.getElementById('media');
	        	this.media = media;
	        	this.duration = media.duration;
	        	this.isPlay = true;
				console.log(media.duration);
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
	        },
	        msToDate(ms){
	        	var unixTimestamp = new Date(ms);

	        	var curr = new Date();
	        	if(unixTimestamp.getDate() === curr.getDate()){
	        		return this.formatteDate(unixTimestamp.getHours()+1) + ':' + this.formatteDate(unixTimestamp.getMinutes()+1);
	        	}
	        	if(unixTimestamp.getFullYear()===curr.getFullYear()){
	        		return (unixTimestamp.getMonth()+1)+'月'+unixTimestamp.getDate()+'日';
	        	} else{
	        		return unixTimestamp.getFullYear()+(unixTimestamp.getMonth()+1)+'月'+unixTimestamp.getDate()+'日';
	        	}
	        },
	        formatteDate(int){
	        	if(int<10){
	        		return '0' + int;
	        	}
	        	return int;
	        },
	        //获取先关推荐video
	        getSimilarVideo(id){
	        	this.$http.get("http://120.79.167.62:3000/simi/mv?mvid="+id).then(res=>{
	        		console.log(res.data.mvs)
	        		this.mvs = res.data.mvs;
	        	},error=>{
	        		console.log(error)
	        	})
	        },
	        //获取评论
	        getComments(id){
	        	this.$http.get('http://120.79.167.62:3000/comment/mv?id='+id).then(res=>{
	        		this.hot_comments = res.data.hotComments;
	        		this.comments = res.data.comments;
	        		console.log(res);
	        	})
	        },
	        selectUrl(obj){
	        	if(obj['1080']!=undefined){
	        		return obj['1080'];
	        	}else if(obj['720']!=undefined){
	        		return obj['720']
	        	}else if(obj['480']!=undefined){
	        		return obj['480']
	        	}
	        	return obj['240']
	        },
	        //获取mv数据
	        getMV(id){
	        	this.$http.get('http://120.79.167.62:3000/mv?mvid='+id).then(res=>{
	        		this.src_mp4 = "http://120.79.167.62:3000/mv/url?url="+this.selectUrl(res.data.data.brs);
					
					var media = document.getElementById('media');
	        	
					console.log(media.load());

	        		this.video_name = res.data.data.name;
	        		this.publish_time = res.data.data.publishTime;
	        		this.playcount = res.data.data.playCount;
	        		this.video_desc = res.data.data.desc;
	        		this.artist_name = res.data.data.artistName;

	        		this.zan = res.data.data.likeCount;
	        		this.add = res.data.data.subCount;
	        		this.com = res.data.data.commentCount;
	        		this.down = res.data.data.shareCount;
	        	})
	        }

		},
		created(){
			this.$http.get('http://120.79.167.62:3000/top/mv?limit=10').then(res=>{
				this.list = res.data.data;
				console.log(this.list)
			},error=>{
				console.log(error);
			})
		},
		mounted(){
			

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
.slide-enter,.slide-leave-to{
	transform: translateX(100%);
}
.slide-enter-to,.slide-show-leave{
	transform: translateX(0);
}
.slide-enter-active,.slide-leave-active{
	transition: all .3s;
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
	overflow: scroll;
}
.video-div{
	width: 100%;
	height: 220px;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
}
.video-div video{
	height: 100%;
	width: auto;
}
.video-div>div{
	background-color: #000;
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
}
.control{
	height: 100%;
	background: rgba(0,0,0,0.4);
	width: 100%;
	position: absolute;
	bottom: 0;
	z-index: 999;
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
.video-title{
	height: 42px;
	line-height: 42px;
	padding: 0 5px;
	margin-top: 220px;
}
.video-info{
	float: right;
	margin-right: 10px;
}
.video-mv{
	color: #f01414;
	font-size: 20px;
	vertical-align: bottom;
}
.video-name{
	font-size: 16px;
	color: #000;
}
.video-artistName,.publish-info,.video-tag{
	line-height: 24px;
	color: #4876FF;
	font-size: 13px;
	padding: 0 5px;
}
.publish-info{
	color: #bbb;
	line-height: 26px;
}
.publish-info span:nth-child(1){
	margin-right: 20px;
}
.video-tag span{
	color: #000;
	border: 1px solid #bbb;
	padding:1px 4px;
	border-radius: 8px;
	font-size: 12px;
}
.video-desc{
	padding: 5px;
	color: #333;
	font-size: 12px;
	line-height: 22px;
	letter-spacing: 0.5px;
}
.video-dos{
	height: 65px;
	display: flex;
	align-items: center;
}
.video-dos div{
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	color: #000;
}
.video-dos>div>i{
	font-size: 20px;
}
.video-dos>div>span{
	font-size: 12px;
}
.xiangguan-wrap{
	padding: 0px 5px;
}
.xiangguan-title{
	padding:0px 5px;
	font-weight: normal;
	background: #f1f1f1;
	line-height: 22px;
}
.xiangguan{
	height: 70px;
	padding: 3px 0px;
}
.xiangguan-cover{
	height: 100%;
	width: 110px;
	background-size: 100% 100%;
	position: relative;
	float: left;
}
.xiangguan-wenzi{
	float: left;
	width: calc(100% - 110px);
	padding-left: 5px;
	height: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	position: relative;
}
.b1{
	width: 100%;
	height: 1px;
	background-color: #f1f1f1;
	left: 0;
	bottom: -3px;
	position: absolute;
}
.xiangguan-wenzi p:nth-child(1){
	font-size: 15px;
	color: #000;
}
.xiangguan-wenzi p:nth-child(2){
	font-size: 12px;
	color: #888;
	line-height: 22px;
}
.comment-title{
	height: 32px;
}
.comment-avator{
	width: 32px;
	height: 32px;
	border-radius: 16px;
	float: left;
}
.comment-box1,.comment-box2{
	padding-left: 10px;
	padding-top: 5px;
}
.comment-user{
	height: 32px;
	width: 250px;
	float: left;
	padding-left: 10px;
	position: relative;
}
.comment-user>p:nth-child(1){
	font-size: 12px;
	color: #000;
}
.comment-user span:nth-child(2){
	display: inline-block;
	font-size: 12px;
	position: absolute;
	left: 8px;
	bottom: 0;
	color: #888;
	transform: scale(0.85);
}
.comment-like{
	float: right;
	padding-right: 10px;
	font-size: 12px;
}
.comment-like i{
	vertical-align: top;
	margin-left: 3px;
}
.comment-wenzi1,.comment-wenzi2{
	padding-left: 42px;
	padding-right: 10px;
}
.comment-wenzi1 p{
	border-bottom: 1px solid #f1f1f1;
	font-size: 12px;
	color: #000;
	padding: 15px 0;
	letter-spacing: 0.5px;
	line-height: 19px;
}
.reply{
	font-size: 12px;
	color: #000;
	line-height: 26px;
}
.reply>span:nth-child(1){
	color: #4876FF;
}
.comment-replied{
	padding-bottom: 15px;
	border-bottom: 1px solid #f1f1f1;
	font-size: 12px;
}
.comment-replied p span{
	color: #4876FF;
}
.comment-replied p{
	padding: 10px;
	color: #777;
	letter-spacing: 0.5px;
	line-height: 19px;
	border: 1px solid #ddd;
}
.video-div>div.mengbann{
	background:transparent;position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 99;
	background: transparent !important;
}
</style>