import { FileRepository } from './file-repository';
import { Playlist } from '../domain';

export class PlaylistRepository extends FileRepository<Playlist, string>{
}
