<template>
	<div class="song-item">
		<div class="info" v-on:click='play(song.id)'>
			<p class="name">{{song.name}}</p>
			<p class='singer'>{{song.song.artists[0].name}}</p>
		</div>
		<div class="do">
			<i class="icon do-icon" v-on:click='moreIcon(index)'>&#xe61b;</i>
			<i class="icon do-icon icon-download">&#xe627;</i>
			<i class="icon do-icon icon-like">&#xe617;</i>
			<i class="icon do-icon icon-comment">&#xe7d2;</i>
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
			play(id){
				this.$emit('changesong',id);
			},
			moreIcon(index){
				var oDo = document.getElementsByClassName('do-icon');
				var currIndex = this.$store.state.home.recommend_song_index;

				if(index === currIndex)
				{
					this.$store.commit('setRecommendSongIndex',-1);
					for(let i=index*4;i<(index*4+4);i++){
						oDo[i].className = oDo[i].className.replace(" show",'');
					}
					return ;
				}
				if(index != currIndex && currIndex != -1){
					for(let i=currIndex*4;i<(currIndex*4+4);i++){
						oDo[i].className = oDo[i].className.replace(" show",'');
					}
					this.$store.commit('setRecommendSongIndex',-1);
					return ;
				}
				this.$store.commit('setRecommendSongIndex',index);
				console.log('2currIndex:'+this.currIndex);
				for(let i=index*4;i<(index*4+4);i++){
					oDo[i].className = oDo[i].className + ' show';
				}
			}
		},
		mounted:function() {
			// body...
			/*document.onclick=function(e){
				console.log(e);

			}*/
			
		}
	}
</script>
<style scoped>
.song-item{
	height: 100%;
	display: flex;
}
.info{
	width: 280px;
	color: #333;
	padding: 4.5px 0px 0px 10px;
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