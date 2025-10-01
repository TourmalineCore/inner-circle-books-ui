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

type HistoryType = {
  id: number,
  employee: string,
  borrowDate: string,
  dueReturnDate: string,
  actualReturnDate?: string,
  readingProgress: string,
}
