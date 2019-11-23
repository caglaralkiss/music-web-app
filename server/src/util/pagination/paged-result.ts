import { Page } from './page';

export interface PagedResult<T = any> {
  previous: Page,
  next: Page,
  result: Array<T>
}
