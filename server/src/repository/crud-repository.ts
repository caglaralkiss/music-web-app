export interface CrudRepository<T, ID> {
    count(): Promise<number>
    delete(entity: T,): Promise<void>
    deleteAll(): Promise<void>
    deleteSelectedEntities(entities: Iterable<T>): Promise<void>
    deleteById(id: ID): Promise<void>
    existsById(id: ID): Promise<boolean>
    findAll(): Promise<Iterable<T>>
    findById(id: ID): Promise<T | null | undefined>
    save(entity: T): Promise<T>
    saveAll(entities: Iterable<T>): Promise<Iterable<T>>
}
