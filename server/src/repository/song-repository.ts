import {FileRepository} from "./file-repository";
import {Song} from "../domain";

export class SongRepository extends FileRepository<Song, string>{
}
