<template>
	<keep-alive>
	<div class="home" id='home' @touchmove='scroll'>
		<div class="gedan-loading" ref='gedan_loading'  v-show='gedan_loading_show'>
			<scale-loader :color="color"></scale-loader>
		</div>
		<div class="lunbo">
			
			<swiper :options="swiperOption"  ref="mySwiper">  
			      
			    <swiper-slide v-for='img in imgUrls'> 
			        <img :data-src="img" class="swiper-lazy" alt="">
			        <div class="swiper-lazy-preloader"></div>
			    </swiper-slide>
			    
			    <div class="swiper-pagination" slot="pagination"></div>  
			</swiper>
		</div>
		
		<div class="menu">
			<div>
				<i class="icon">&#xe68c;</i>
				<p>发现音乐</p>
			</div>
			<div>
				<i class="icon">&#xe631;</i>
				<p>排行榜</p>
			</div>
			<div>
				<i class="icon">&#xe632;</i>
				<p>MV</p>
			</div>
		</div>

		<div class="discover-wrap">
			<div class="recommend-gedan">
				
				<div class="gedan-title">
					<span class="icon">每日推荐歌单</span>
				</div>
				
				<ul class="gedan-content clearfix" ref='gedan_content'>
					
					<li v-for='(item,index) in gedanList' >
						<img v-lazy="item.picUrl" v-on:load='imgload(index,item.picUrl)' v-on:click='gotogedan(item.id)' alt="">
						<p class="gedan-name">{{item.name}}</p>
						<span class="playCount"><i class="icon">&#xe63f;</i>{{parseToWan(item.playCount)}}</span>
					</li>
				</ul>
			</div>
			<div class="recommend-song">
				
				<div class="gedan-title">
					<span class="icon">每日推荐歌曲</span>
				</div>
				
				<ul class="song-list">
					<li v-for='(item,index) in songList'>
						<songitem v-bind:song='item' v-bind:index='index' v-on:changesong='changesong'></songitem>
					</li>
				</ul>
			</div>
		</div>
	</div>
</keep-alive>
</template>

<script>
import songitem from '../components/songitem.vue'
import {swiper,swiperSlide} from 'vue-awesome-swiper'
import {Socket} from 'vue-loading-spinner'
import 'swiper/dist/css/swiper.css'
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
	export default{
		data:function(){
			return {
				color:'#f01414',
				gedan_loading_show:true,
				imgUrls:[],
				gedanList:[],
				songList:[],
				swiperOption: {  
	              lazy: {
				    loadPrevNext: true,
				  },
				  loop:true,
		          autoplay:{
		          	stopOnLastSlide:false,
		          	delay:3000,
		          	disableOnInteraction:false
		          },
		          // // 最左最右禁止滑动
		          resistanceRatio : 0,
		          
	            }
			}
		},
		components:{
			songitem,swiper,swiperSlide,Socket,ScaleLoader
		},
		computed:{  
	        swiper() {  
	            return this.$refs.mySwiper.swiper;  
	        },
	    }, 
	    methods:{
	    	scroll:function(){
	    		console.log(document.getElementById('app').scrollTop);
	    	},
	    	parseToWan(int){
	        	if(int>10000){
	        		return Math.floor(int/10000)+'万';
	        	}else{
	        		return int;
	        	}
	        },
	        gotogedan(id){
	        	this.$router.push({path:'/songlist',query:{gedanId:id}});
	        },
	        changesong(id){
	        	this.$emit('listenplay',id);
	        },
	        imgload(index,url){
	        	var img = new Image();
	        	img.src = url;
	        	if(img.complete&&index==5){
	        		console.log(url+'加载完成');
	        		this.gedan_loading_show = false;
	        	}
	        	
	        }
	    },
		mounted:function(){
			var _this = this;

			// var width = screen.width;
	  //   	this.$refs.gedan_loading.style.height = (width/3 + 34) * 2 + 'px';
	  //   	this.$refs.gedan_content.style.height = (width/3 + 34) * 2 + 'px';

			// // 监听窗口变化事件
			// var SCREENTYPE = 'orientationchange' in window ? 'orientationchange' : 'resize';
		 //    window.addEventListener(SCREENTYPE,function(){
		 //      	var width = screen.width;
	  //   		_this.$refs.gedan_loading.style.height = (width/3 + 34) * 2 + 'px';
	  //   		_this.$refs.gedan_content.style.height = (width/3 + 34) * 2 + 'px';
		 //    });
			

			
			//获取轮播图片---暂时还不能自动播放
			this.$http.get("http://120.79.167.62:3000/banner").then(response => {
			    
			    var banners = response.data.banners;
			    banners.map(function(ele){
			    	_this.imgUrls.push(ele.picUrl);
			    	return ele;
			    })
			}, error => {
			    // error callback
			    console.log(error);
			})
			//获取歌单数据
			this.$http.get('http://120.79.167.62:3000/personalized').then(res=>{
				//console.log(res.data);
				_this.gedanList = res.data.result.slice(0,6);
				console.log(_this.gedanList);
				
			},error=>{
				console.log(error);
			})
			//获取歌曲数据
			this.$http.get("http://120.79.167.62:3000/personalized/newsong").then(res=>{
				console.log(res.data.result);
				_this.songList = res.data.result;
	
			},error=>{
				console.log(error)
			})
			
			
		}
	}
</script>
<style scoped>
.gedan-loading{
	position: fixed;
	left: 0;
	left: 0;
	right: 0;
	top: 0;
	bottom: 48px;
	z-index: 100;
	background: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
}
.home{
	padding-bottom: 40px;
}
.lunbo{
	
	text-align: center;
	color: #999;
	position: relative;
}
.lunbo p{
	position: absolute;
	left: 0;
	right: 0;
	margin: 0 auto;
	top: 50%;
	transform: translateY(-50%);
}
.lunbo .swiper-container{
	height: 100%;
}
.icon-gedan{
	color: #ee4000;
}
.discover-wrap{
	padding:0px;
}
.xian{
	height: 1px;
	margin:14px 0px;
	background-color: #333;
	position: relative;
}
.gedan-title{
	color: #000;
	font-size: 15px;
	font-weight: bold;
	margin: 6px 0;
}
.gedan-content{
	position: relative;
}
.gedan-content li{
	position: relative;
	width: 33.33%;
	float: left;
	padding:0px 1px;
}
.gedan-content li img{
	width: 100%;
	height: auto;
	vertical-align: middle;
	border-radius: 4px;
}
.gedan-content li p{
	font-size: 12px;
	word-break: break-all;
}
.playCount{
	position: absolute;
	background: rgba(0,0,0,0.5);
	color: #fff;
	padding: 2px 6px;
	border-radius: 50px;
	top: 3px;
	right: 3px;
	font-size: 12px;
}
.playCount i{
	margin-right: 3px;
}
.song-list li{
	height: 50px;
	padding: 0 10px;
}
.song-item{
	height: 100%;
	border-bottom: 1px solid #f1f1f1;
}
.gedan-name{
	height: 35px;
}
.loading-lunbo{
	line-height: 130px;
	background: #ddd;
}
.swiper-slide img{
	width: 100%;
	height: auto;
}
.swiper-slide{
	height: 10rem;
    background-color: #c2c2c2;
    width: 375px;
}
.menu{
	height: 80px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	border-bottom: 1px solid #f1f1f1;
}
.menu>div{
	text-align: center;
}
.menu i{
	width: 34px;
	height: 34px;
	border-radius: 17px;
	display: inline-block;
	background: linear-gradient(-45deg,rgba(255,0,0,1),rgba(255,0,0,0.6));
	line-height: 34px;
	color: #fff;
}
.menu p{
	font-size: 12px;
	margin-top: 5px;
}
.gedan-title::before{
	content: '';
	display: inline-block;
	width: 10px;
	height: 100%;
}
.gedan-title span{
	display: inline-block;
	position: relative;
}
.gedan-title span::before{
	content: '';
	display: inline-block;
	width: 3px;
	height: 100%;
	position: absolute;
	left: -10px;
	top: 0;
	background: rgb(255,0,0);
}
.gedan-title span::after{
	content: '\e78b';

	font-weight: normal;
}
.recommend-gedan{
	border-bottom: 1px solid #f1f1f1;
}
</style>