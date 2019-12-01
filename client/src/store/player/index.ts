import { PlayerState } from '@/store/player/types'
import { RootState } from '@/store/types'
import { Module } from 'vuex'
import { actions } from '@/store/player/actions'
import { mutations } from '@/store/player/mutations'
import { getters } from '@/store/player/getters'

export const state: PlayerState = {
  volume: 100,
  song: undefined,
  playerState: 'idle',
  elapsedTime: 0,
  duration: 0,
  queue: [],
  playlist: [],
  previous: [],
  userMode: 'singlePlay',
  isLoop: false
}

const namespaced: boolean = true

export const player: Module<PlayerState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
