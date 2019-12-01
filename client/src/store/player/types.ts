import { Song } from '@/interfaces'

export type AudioPlayerState = 'idle' | 'paused' | 'playing'
export type UserMode = 'singlePlay' | 'queue' | 'playlist'

export interface PlayerState {
  volume: number,
  song?: Song,
  elapsedTime: number,
  duration: number,
  playerState: AudioPlayerState,
  queue: Array<Song>,
  playlist: Array<Song>,
  previous: Array<Song>,
  userMode: UserMode,
  isLoop: boolean
}
