type AuthorType = {
  fullName: string,
}

type BookCardType = Omit<BookType, 'id' | 'annotation' | 'bookCopies'> & {
  id?: number,
}

type AddBookType = Omit<BookType, 'id' | 'bookCopies'> & {
  countOfCopies: number,
}

type BookType = {
  id: number,
  title: string,
  annotation: string,
  language: string,
  authors: AuthorType[],
  coverUrl: string,
  bookCopies: BookCopyType[],
}

type BookCopyType = {
  bookCopyId: number,
  copyNumber: number,
}