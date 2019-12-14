export type ModalName = 'AddSongModal'
  | 'CreatePlaylistModal'
  | 'AddToPlaylistModal'
  | null

export interface ModalState {
  isVisible: boolean,
  modalComponent: {
    name: ModalName,
    props: Record<string, any> | {}
  }
}

export interface ModalConfig {
  modalName: ModalName,
  props?: Record<string, any>
}
