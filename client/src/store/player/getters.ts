import { GetterTree } from 'vuex'
import { PlayerState, UserMode } from '@/store/player/types'
import { RootState } from '@/store/types'
import { Song } from '@/interfaces'
import { formatAudioTime } from '@/utils/audio'

export const getters: GetterTree<PlayerState, RootState> = {
  volume(state): number {
    return state.volume
  },
  song(state): Song {
    return state.song!
  },
  playerState(state): 'idle' | 'paused' | 'playing' {
    return state.playerState
  },
  elapsedTime(state): string {
    return formatAudioTime(state.elapsedTime)
  },
  duration(state): string {
    return formatAudioTime(state.duration)
  },
  userMode(state): UserMode {
    return state.userMode
  },
  isLoop(state): boolean {
    return state.isLoop
  }
}
