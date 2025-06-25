import { AllBooksPage } from "./AllBooks/AllBooksPage"

const DEFAULT_PATH = `/books`

export const booksRoutes = [
  {
    path: `${DEFAULT_PATH}/`,
    breadcrumb: `Books`,
    Component: AllBooksPage,
  },
]