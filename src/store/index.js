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
		url:'../assets/img/gedan.jpeg',
		name:'暂无播放歌曲',
		singer:'无'
	},
	//当前状态，play or pause
	currState: PAUSE
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
	}
}
export default new Vuex.Store({
	state,mutations
});