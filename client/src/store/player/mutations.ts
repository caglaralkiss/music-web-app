import { MutationTree } from 'vuex'
import { PlayerState } from '@/store/player/types'
import { Song } from '@/interfaces'

export const mutations: MutationTree<PlayerState> = {
  changeVolume(state, payload: number) {
    state.volume = payload
  },
  songLoaded(state, payload: Song) {
    state.song = payload
  },
  clearSong(state) {
    state.song = undefined
  },
  changePlayerState(state, payload: 'idle' | 'playing' | 'paused') {
    state.playerState = payload
  },
  updateElapsedTime(state, currentTime: number) {
    state.elapsedTime = currentTime
  },
  setDuration(state, duration: number) {
    state.duration = duration
  },
  setLoop(state, isLoop: boolean) {
    state.isLoop = isLoop
  },
  addSongToQueue(state, song: Song) {
    state.queue = [song, ...state.queue]
  },
  addShuffleList(state, songList: Song[]) {
    state.queue = [...songList, ...state.queue]
  },
  playNextSong(state: PlayerState) {
    const { userMode } = state

    switch (userMode) {
      case 'queue':
        const song = state.queue.pop()
        if (song) {
          state.previous = [...state.previous, song]
          state.song = song
        }
        break
      default:
        break
    }
  },
  playPreviousSong(state) {
    const prevSong = state.previous.pop()
    if (prevSong) {
      state.song = prevSong
    }
  }
}
