import {FileRepository} from "./file-repository";
import fs from "../util/promisified/fs";

describe('FileRepository', () => {
    let fileRepository: FileRepository<MockModel, string>;

    class MockRepository extends FileRepository<MockModel, string> {
    }

    interface MockModel {
        id: string,
        data: Array<any>
    }

    const mockDir = 'user/';
    const mockExt = 'json';

    beforeEach(() => {
        fileRepository = new MockRepository({fs, ext: mockExt, dir: mockDir});
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should count the number of entities', async () => {
        const mockFiles = [
            'caglar_alkis.json',
            'mark_zuckerberg.json',
            'bla_bla.json'
        ];

        spyOn(fs, 'readdir').and.returnValue(Promise.resolve(mockFiles));

        const count = await fileRepository.count();
        expect(count).toBe(mockFiles.length);
    });

    test('should delete the given entity', async () => {
        spyOn(fs, 'unlink').and.returnValue(Promise.resolve());

        const entity: MockModel = {
            id: '1',
            data: ['foo', 'bar', 'baz', 'lol']
        };
        expect(await fileRepository.delete(entity)).toBe(undefined);
    });

    test('should delete all entities', async () => {
        const entitiesOnDomain = ['caglar.json', 'mark.json'];
        spyOn(fs, 'readdir').and.returnValue(Promise.resolve(entitiesOnDomain));
        spyOn(fs, 'readFile').and.returnValue(Promise.resolve(JSON.stringify({id: 'someId'})));
        spyOn(fs, 'unlink').and.returnValue(Promise.resolve());

        expect(await fileRepository.deleteAll()).toBe(undefined);
    });

    test('should delete entity by its id', async () => {
        spyOn(fs, 'unlink');

        await fileRepository.deleteById('mockId');
        expect(fs.unlink).toHaveBeenCalled();
    });

    test('should delete selected entities', async () => {
        spyOn(fs, 'unlink');
        const entities: Array<MockModel> = [
            {
                id: 'someId',
                data: [1, 2, 3, 4]
            },
            {
                id: 'moreId',
                data: ['hello', 'foo', 'baz']
            }
        ];

        await fileRepository.deleteSelectedEntities(entities);
        expect(fs.unlink).toHaveBeenCalledTimes(entities.length);
    });

    test('should detect entity existence by it\'s id', async () => {
        spyOn(fs, 'access');

        await fileRepository.existsById('someId');
        expect(fs.access).toHaveBeenCalled();
    });
});
