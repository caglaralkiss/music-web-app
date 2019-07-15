import {CrudRepository} from "./crud-repository";
import {Config} from "../config/config";
import {
    DirectoryNotExistError,
    FileDeleteError,
    FileNotExistsError,
    FileReadError, FileWriteError
} from "../core/error/repository/file-errors";

export class FileRepository<T extends { id: ID }, ID> implements CrudRepository<T, ID> {
    /**
     * Path of the directory.
     */
    get dir(): string {
        return this._dir;
    }

    /**
     * Extension of the file.
     */
    get ext(): string {
        return '.' + this._ext;
    }

    private readonly _dir: string;
    private readonly _ext: string;
    private readonly _fs: any;
    private readonly BASE_DIR: string;

    constructor({fs, dir, ext}: { fs: any, dir: string, ext: string}) {
        this._fs = fs;
        this._dir = dir;
        this._ext = ext;
        this.BASE_DIR = Config.getInstance().db;
    }

    async count(): Promise<number> {
        try {
            const files = await this._fs.readdir(`${this.BASE_DIR}${this.dir}`);

            return files.length;
        } catch (e) {
            switch (e.code) {
                case 'ENOENT':
                    throw new DirectoryNotExistError(`${this.dir} does not exists!`);
                default:
                    throw new FileReadError('Undefined error on reading directory');
            }
        }
    }

    async delete(entity: T): Promise<void> {
        try {
            await this._fs.unlink(`${this.BASE_DIR}${this.dir}/${entity.id.toString()}${this.ext}`)
        } catch (err) {
            switch (err.code) {
                case 'ENOENT':
                    throw new FileNotExistsError(`${entity.id.toString()} does not exists!`);
                default:
                    throw new FileDeleteError(`Undefined error on deleting entity`);
            }
        }
    }

    async deleteAll(): Promise<void> {
        const entities = await this.findAll();

        await Promise.all(Array.from(entities).map(entity => this.delete(entity)));
    }

    async deleteById(id: ID): Promise<void> {
        try {
            await this._fs.unlink(`${this.BASE_DIR}${this.dir}/${id.toString()}${this.ext}`)
        } catch (err) {
            switch (err.code) {
                case 'ENOENT':
                    throw new FileNotExistsError(`${id.toString()} does not exists!`);
                default:
                    throw new FileDeleteError(`Undefined error on deleting entity`);
            }
        }
    }

    async deleteSelectedEntities(entities: Iterable<T>): Promise<void> {
        await Promise.all(Array.from(entities).map(entity => this.delete(entity)));
    }

    async existsById(id: ID): Promise<boolean> {
        try {
            await this._fs.access(`${this.BASE_DIR}${this.dir}/${id.toString()}${this.ext}`);
            return true;
        } catch (e) {
            return false;
        }
    }

    async findAll(): Promise<Iterable<T>> {
        try {
            const files = await this._fs.readdir(`${this.BASE_DIR}${this.dir}`, 'utf-8');
            const trimmedFiles =
                files.map((file: string) => file.replace(`${this.ext}`, ''));

            return await Promise.all(trimmedFiles.map((file: ID) => this.findById(file)))
        } catch (e) {
            throw e;
        }
    }

    async findById(id: ID): Promise<T | null | undefined> {
        try {
            const fileContent = await this._fs.readFile(`${this.BASE_DIR}${this.dir}/${id.toString()}${this.ext}`);

            return JSON.parse(fileContent);
        } catch (e) {
            switch (e.code) {
                case 'ENOENT':
                    throw new FileNotExistsError(`${id.toString()} does not exists`);
                default:
                    throw new FileReadError(`Undefined error on reading file`);
            }
        }
    }

    async save(entity: T): Promise<T> {
        try {
            const stringData = JSON.stringify(entity);
            await this._fs.writeFile(`${this.BASE_DIR}${this.dir}/${entity.id.toString()}${this.ext}`, stringData);

            return entity;
        } catch (err) {
            throw new FileWriteError(`${entity.id.toString()} does not write to directory.${err}`)
        }
    }

    async saveAll(entities: Iterable<T>): Promise<Iterable<T>> {
        return await Promise.all(Array.from(entities).map(entity => this.save(entity)));
    }
}
