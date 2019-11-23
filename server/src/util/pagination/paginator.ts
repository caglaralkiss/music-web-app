import { Page } from './page';
import { PagedResult } from './paged-result';

const createNextPage = (page: Page): Page => {
  const { pageNum, offset } = page;

  return {
    pageNum: pageNum + 1,
    offset: offset
  }
}

const createPreviousPage = (page: Page): Page => {
  const { pageNum, offset } = page;

  return {
    pageNum: pageNum - 1,
    offset: offset
  }
}

const hasNextPage = (end: number, model: Array<any>) => {
  return end < model.length
}

const hasPreviousPage = (start: number) => {
  return start > 0
}

function getPagedResult<T = any>(model: Array<T>, page: Page): PagedResult<T> {
  const { pageNum, offset } = page

  const start = (pageNum - 1) * offset;
  const end = pageNum * offset

  return {
    previous: hasPreviousPage(start) ? createPreviousPage(page) : null,
    next: hasNextPage(end, model) ? createNextPage(page) : null,
    result: model.slice(start, end)
  }
}

export default getPagedResult
