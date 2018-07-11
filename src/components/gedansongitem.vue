<template>
	<div class="song-item">
		<p class="index">-{{index+1}}-</p>
		<div class="info" @click='play(song.id)'>
			<p class="name">{{song.name}}</p>
			<p class='singer'>{{getSingers(song.ar)}}</p>
		</div>
		<div class="do">
			<i class="icon do-icon1" v-on:click='moreIcon(index)'>&#xe61b;</i>
			<i class="icon do-icon1 icon-download">&#xe627;</i>
			<i class="icon do-icon1 icon-like">&#xe617;</i>
			<i class="icon do-icon1 icon-comment">&#xe7d2;</i>
		</div>
	</div>
</template>
<script>
	export default{
		data:function(){
			return {
				
			}
		},
		props:{
			song:{
				type:Object,
				required:true
			},
			index:{
				type:Number,
				required:true
			}
		},
		methods:{
			getSingers(arr){
				if(arr.length == 1){
					return arr[0].name;
				}
				return arr.reduce(function(x,y){
					return x.name+'/'+y.name;
				})
			},
			play(id){
				this.$emit('listenplay',id);
			},
			moreIcon(index){
				var oDo = document.getElementsByClassName('do-icon1');
				var currIndex = this.$store.state.gedan.gedan_song_index;
				console.log(currIndex);
				if(index === currIndex)
				{
					this.$store.commit('setGedanSongIndex',-1);
					for(let i=index*4;i<(index*4+4);i++){
						oDo[i].className = oDo[i].className.replace(" show",'');
					}
					return ;
				}
				if(index != currIndex && currIndex != -1){
					for(let i=currIndex*4;i<(currIndex*4+4);i++){
						oDo[i].className = oDo[i].className.replace(" show",'');
					}
					this.$store.commit('setGedanSongIndex',-1);
					return ;
				}
				this.$store.commit('setGedanSongIndex',index);
				console.log('2currIndex:'+this.currIndex);
				for(let i=index*4;i<(index*4+4);i++){
					oDo[i].className = oDo[i].className + ' show';
				}
			}
		},
		mounted:function() {
			
		}
	}
</script>
<style scoped>
.song-item{
	height: 100%;
	display: flex;
}
.index{
	height: 50px;
	width: 50px;
	text-align: center;
	line-height: 50px;
	font-size: 18px;
	font-weight: 900;
	color: #ccc;
}
.info{
	width: 280px;
	color: #333;
	padding: 4.5px 0px 0px 10px;
	border-bottom: 1px solid #f1f1f1;
}
.name{
	overflow: hidden;
	text-overflow: ellipsis;
	white-space:nowrap;
}
.singer{
	font-size: 12px;
	color: #888;
}
.do{
	height: 50px;
	flex: 1;
	padding-right: 10px;
	text-align: right;
	line-height: 50px;
	font-size: 24px;
	color: #888;
	border-bottom: 1px solid #f1f1f1;
	position: relative;
}
.icon-download,.icon-like,.icon-comment{
	position: absolute;
	font-size: 18px;
	transition: all 0.2s;
	opacity: 0;
	transform: translateX(10px);
}
.show{
	opacity: 1;
	transform: translateX(0px);
}
.icon-download{
	right: 45px;
}
.icon-like{
	right: 75px;
	transition-delay: 0.07s;
}
.icon-comment{
	right: 105px;
	transition-delay: 0.14s;
}
</style>