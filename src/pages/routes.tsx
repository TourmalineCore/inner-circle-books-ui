import { AddBookPage } from "./add-book/AddBookPage"
import { AllBooksPage } from "./all-books/AllBooksPage"
import { BookPage } from "./book/BookPage"
import { BookHistoryPage } from "./book-history/BookHistoryPage"
import { ReturnBookPage } from "./return-book/ReturnBookPage"
import { ScanPage } from "./scan/ScanPage"
import { LINK_TO_BOOKS_SERVICE } from "../common/constant"

export const allBooksRoutes = [
  {
    path: LINK_TO_BOOKS_SERVICE,
    breadcrumb: `All Books`,
    Component: AllBooksPage,
  },
]

export const addBookRoutes = [
  {
    path: `${LINK_TO_BOOKS_SERVICE}/add`,
    breadcrumb: `Add Book`,
    Component: AddBookPage,
  },
]

export const bookRoutes = [
  {
    path: `${LINK_TO_BOOKS_SERVICE}/:id`,
    breadcrumb: `Book`,
    Component: BookPage,
  },
]

export const bookCopyRoutes = [
  {
    path: `${LINK_TO_BOOKS_SERVICE}/copy/:id`,
    breadcrumb: `Book Copy`,
    Component: BookPage,
  },
]

export const returnBookRoutes = [
  {
    path: `${LINK_TO_BOOKS_SERVICE}/return/copy/:id`,
    breadcrumb: `Return Book`,
    Component: ReturnBookPage,
  },
]

export const scanRoutes = [
  {
    path: `${LINK_TO_BOOKS_SERVICE}/scan`,
    breadcrumb: `Scanning QR Code`,
    Component: ScanPage,
  },
]

export const bookHistoryRoutes = [
  {
    path: `${LINK_TO_BOOKS_SERVICE}/history/:id`,
    breadcrumb: `Book History`,
    Component: BookHistoryPage,
  },
]