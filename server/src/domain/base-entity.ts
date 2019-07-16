/**
 * Base entity of the project.
 * All domain objects include id property in generic type.
 *
 * @author Caglar Alkis
 */

export interface BaseEntity<Id> {
    id: Id;
}
