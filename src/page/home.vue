<template>
	<div class="home" ref='home'>
		<div class="lunbo">
			<swiper :options="swiperOption"  ref="mySwiper">  
			      
			    <swiper-slide v-for='img in imgUrls'> 
			        <img v-bind:src="img" width="100%" alt="">
			    </swiper-slide>
			    
			    <div class="swiper-pagination" slot="pagination"></div>  
			</swiper>
		</div>
		<div class="discover-wrap">
			<div class="recommend-gedan">
				<div class="xian">
					<div class="gedan-title">
						<i class="icon icon-gedan">&#xe64d;</i>
						<span>每日推荐歌单</span>
					</div>
				</div>
				<ul class="gedan-content clearfix">
					<li v-for='item in gedanList' >
						<img v-lazy="item.picUrl" v-on:click='gotogedan(item.id)' alt="">
						<p class="gedan-name">{{item.name}}</p>
						<span class="playCount"><i class="icon">&#xe63f;</i>{{parseToWan(item.playCount)}}</span>
					</li>
				</ul>
			</div>
			<div class="recommend-song">
				<div class="xian">
					<div class="gedan-title">
						<i class="icon icon-gedan">&#xe64d;</i>
						<span>每日推荐歌曲</span>
					</div>
				</div>
				<ul class="song-list">
					<li v-for='(item,index) in songList'>
						<songitem v-bind:song='item' v-bind:index='index' v-on:changesong='changesong'></songitem>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import songitem from '../components/songitem.vue'
import {swiper,swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
	export default{
		data:function(){
			return {
				imgUrls:[],
				gedanList:[],
				songList:[],
				swiperOption: {  
	                pagination: '.swiper-pagination',  
	                slidesPerView: 'auto',  
	                centeredSlides: true, 
	                autoplay:3,

	                paginationClickable: true,
	                onSlideChangeEnd: swiper => {  
	                    //这个位置放swiper的回调方法  
	                    this.page = swiper.realIndex+1;  
	                    this.index = swiper.realIndex;  
	                },  
	            }
			}
		},
		components:{
			songitem,swiper,swiperSlide
		},
		computed:{  
	        swiper() {  
	            return this.$refs.mySwiper.swiper;  
	        },
	    }, 
	    methods:{
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
	        }
	    },
		mounted:function(){
			var _this = this;
			//获取轮播图片---暂时还不能自动播放
			this.$http.get("http://localhost:3000/banner").then(response => {
			    
			    var banners = response.data.banners;
			    banners.map(function(ele){
			    	_this.imgUrls.push(ele.pic);
			    	return ele;
			    })
			}, error => {
			    // error callback
			    console.log(error);
			})
			//获取歌单数据
			this.$http.get('http://localhost:3000/personalized').then(res=>{
				//console.log(res.data);
				_this.gedanList = res.data.result.slice(0,6);
				console.log(_this.gedanList);
			},error=>{
				console.log(error);
			})
			//获取歌曲数据
			this.$http.get("http://localhost:3000/personalized/newsong").then(res=>{
				console.log(res.data.result);
				_this.songList = res.data.result;
			},error=>{
				console.log(error)
			})
			
		}
	}
</script>
<style scoped>

.home{
	padding-bottom: 40px;
	padding-top: 72px;
}
.lunbo{
	height: 145px;
	background-color: #ddd;
	text-align: center;
	line-height: 180px;
	color: #999;
}
.lunbo .swiper-container{
	height: 100%;
}
.icon-gedan{
	color: #ee4000;
}
.discover-wrap{
	padding: 10px 0px;
}
.xian{
	height: 1px;
	margin:14px 0px;
	background-color: #333;
	position: relative;
}
.gedan-title{
	position: absolute;
	top: -14px;
	left: 0px;
	padding:0 5px;
	display: inline-block;
	height: 28px;
	background-color: #fff;
	color: #333;
	line-height: 28px;
	font-size: 15px;
}
.gedan-content li{
	position: relative;
	width: 33.33%;
	float: left;
	padding: 5px 0.5px 0px 0.5px;
}
.gedan-content li img{
	width: 100%
}
.gedan-content li p{
	font-size: 12px;
}
.playCount{
	position: absolute;
	background: rgba(0,0,0,0.5);
	color: #fff;
	padding: 2px 6px;
	border-radius: 50px;
	top: 8px;
	right: 3px;
	font-size: 12px;
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
</style>