<template>
	<div class="currentlist">
		<div class="content">
			<div class="list-wrap">
				
			</div>
		</div>
	</div>
</template>
<script>

	export default{

	}
</script>
<style scoped>
.currentlist{
	position: fixed;
	z-index: 200;
	width: 100%;
	height: 100%;
	top: 0;
}
.content{
	position: relative;
	height: 100%;
}
.list-wrap{
	position: absolute;
	bottom: 0;
	height: 300px;
	width: 100%;
	background: #fff;
}
</style>