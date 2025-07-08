import { AddBookPage } from "./add-book/AddBookPage"
import { AllBooksPage } from "./all-books/AllBooksPage"

const DEFAULT_PATH = `/books`

export const allBooksRoutes = [
  {
    path: DEFAULT_PATH,
    breadcrumb: `All Books`,
    Component: AllBooksPage,
  },
]

export const addBookRoutes = [
  {
    path: `${DEFAULT_PATH}/add`,
    breadcrumb: `Add Book`,
    Component: AddBookPage,
  },
]