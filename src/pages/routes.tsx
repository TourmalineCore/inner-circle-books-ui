import { BooksPage } from "./BooksPage"

const DEFAULT_PATH = `/books`

export const booksRoutes = [
  {
    path: `${DEFAULT_PATH}/`,
    breadcrumb: `Books`,
    Component: BooksPage,
  },
]