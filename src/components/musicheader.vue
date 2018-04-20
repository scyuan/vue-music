<template>
	<div class="header">
		<div class="title">
			<i class="icon icon-music">&#xe620;</i><span>{{title}}</span>
		</div>
		<div class="menu-bar">
			<div class="menu-item menu-item-select" v-on:click='gopage(0)'>发现音乐</div>
			<div class="menu-item" v-on:click='gopage(1)'>排行榜</div>
			<div class="menu-item" v-on:click='gopage(2)'>MV</div>
		</div>
	</div>
	
</template>
<script>
	export default{
		data:function(){
			return {
				title:'Cloud Music'
			}
		},
		methods:{
			gopage:function(index){
				
				this.$router.push({path:this.getPath(index)});

				var menu = document.getElementsByClassName('menu-item');
				for(let i = 0;i<menu.length;i++){
					menu[i].className = 'menu-item';
				}
				menu[index].className = 'menu-item menu-item-select';
			},
			getPath(index){
				switch(index){
					case 0:
						return "/";
					case 1:
						return "/topmusic";
					case 2:
						return "/mv";
				}
			}
		}
	}
</script>
<style scoped>
.header{
	position: fixed;
	width: 100%;
	top: 0;
	z-index: 10;
}
.title,.menu-item{
	text-align: center;
}
.title,.menu-item{
	line-height: 36px;
}
.icon-music{
	font-size: 15px;
	margin-right: 5px;
}
.title,.menu-bar{
	height: 36px;
	background-color: #ee4000;
	color: #fff;
}
.menu-item{
	float: left;
	width: 33.33%;
	font-size: 14px;
	color: #eee;
}
.menu-item-select{
	color: #fff;
	font-weight: bold;
	border-top: 2px solid #fff;
	line-height: 34px;
}
</style>