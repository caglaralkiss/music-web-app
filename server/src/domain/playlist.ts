import { BaseEntity } from './base-entity';
import { Song } from './song';

export interface Playlist extends BaseEntity<string> {
  name: string,
  owner: string,
  songs: Iterable<Song>,
  creationDate: number
}
