type AuthorType = {
  fullName: string,
}

type BookCardType = Omit<BookType, 'id' | 'annotation' | 'copiesIds'> & {
  id?: number,
}

type AddBookType = Omit<BookType, 'id' | 'copiesIds'> & {
  countOfCopies: number,
}

type BookType = {
  id: number,
  title: string,
  annotation: string,
  language: string,
  authors: AuthorType[],
  coverUrl: string,
  copiesIds: number[],
}

type BookHistoryType = {
  list: BookCopyHistory[],
  totalCount: number,
}

type BookCopyHistory = {
  copyNumber: number,
  employeeFullName: string,
  takenDate: string,
  scheduledReturnDate: string,
  actualReturnedDate: string | null,
  progressOfReading: string | null,
}
