import { ActionTree } from 'vuex'
import { AudioPlayerState, PlayerState, UserMode } from '@/store/player/types'
import { RootState } from '@/store/types'
import { Song } from '@/interfaces'

export const actions: ActionTree<PlayerState, RootState> = {
  setVolume({ commit }, volume: number): any {
    commit('changeVolume', volume)
  },
  loadSong({ commit }, song: Song): any {
    commit('songLoaded', song)
  },
  clearSong({ commit }): any {
    commit('clearSong')
  },
  changePlayerState({ commit }, newState: AudioPlayerState): any {
    commit('changePlayerState', newState)
  },
  updateElapsedTime({ commit }, currentTime: number): any {
    commit('updateElapsedTime', currentTime)
  },
  setDuration({ commit }, duration: number): any {
    commit('setDuration', duration)
  },
  setLoop({ commit }, isLoop: boolean): any {
    commit('setLoop', isLoop)
  },
  addSong({ commit }, metaSong: { userMode: UserMode, song: Song }): any {
    const { userMode, song } = metaSong

    if (userMode === 'queue') {
      commit('addSongToQueue', song)
    } else if (userMode === 'playlist') {
      commit('addSongToPlaylist', song)
    }
  },
  addShuffleList({ commit }, songList: Array<Song>): any {
    commit('addShuffleList', songList)
  },
  playNextSong({ commit }): any {
    commit('playNextSong')
  },
  playPreviousSong({ commit }): any {
    commit('playPreviousSong')
  }
}
