import {BaseEntity} from "./base-entity";

export interface Song extends BaseEntity<string> {
    title: string,
    album: string,
    audio: string,
    cover: string,
    artist: Iterable<string>,
    owner: string,
}
