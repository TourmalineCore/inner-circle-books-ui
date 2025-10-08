import { AddBookPage } from "./add-book/AddBookPage"
import { AllBooksPage } from "./all-books/AllBooksPage"
import { BookPage } from "./book/BookPage"
import { BookHistoryPage } from "./book-history/BookHistoryPage"
import { ReturnBookPage } from "./return-book/ReturnBookPage"
import { ScanPage } from "./scan/ScanPage"

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

export const bookRoutes = [
  {
    path: `${DEFAULT_PATH}/:id`,
    breadcrumb: `Book`,
    Component: BookPage,
  },
]

export const bookCopyRoutes = [
  {
    path: `${DEFAULT_PATH}/copy/:id`,
    breadcrumb: `Book Copy`,
    Component: BookPage,
  },
]

export const returnBookRoutes = [
  {
    path: `${DEFAULT_PATH}/return/copy/:id`,
    breadcrumb: `Return Book`,
    Component: ReturnBookPage,
  },
]

export const scanRoutes = [
  {
    path: `${DEFAULT_PATH}/scan`,
    breadcrumb: `Scanning QR Code`,
    Component: ScanPage,
  },
]

export const bookHistoryRoutes = [
  {
    path: `${DEFAULT_PATH}/history/:id`,
    breadcrumb: `Book History`,
    Component: BookHistoryPage,
  },
]