import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const PLAY = true,PAUSE = false;

const state = {
	home:{
		recommend_song_index : -1
	},
	gedan:{
		gedan_song_index : -1
	},
	//当前播放歌曲信息
	currSong:{
		url:require('../assets/img/gedan.jpeg'),
		name:'暂无播放歌曲',
		singer:'无'
	},
	//当前状态，play or pause
	currState: PAUSE,
	//当前播放列表
	currList:[
		
	],
	//当前播放下标，默认是0
	currIndex:0
}
const mutations = {
	setRecommendSongIndex(state,newIndex){
		state.home.recommend_song_index = newIndex;
	},
	setGedanSongIndex(state,newIndex){
		state.gedan.gedan_song_index = newIndex;
	},
	setCurrSong(state,newSong){
		state.currSong = newSong;
	},
	setCurrState(state,newState){
		if(newState)
			state.currState = PLAY
		else
			state.currState = PAUSE
	},
	//更新播放课表
	setCurrList(state,newSong){
		state.currList.push(newSong);
	},
	setCurrIndex(state,newIndex){
		state.currIndex = newIndex;
	}

}
export default new Vuex.Store({
	state,mutations
});