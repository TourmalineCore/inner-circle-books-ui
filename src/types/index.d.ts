type AuthorType = {
  fullName: string,
}

type BookCopyType = {
  bookCopyId: number,
}

type BookCardType = Omit<BookType, 'id' | 'annotation' | 'bookCopies'> & {
  id?: number,
}

type AddBookType = Omit<BookType, 'id' | 'bookCopies'> & {
  count: number,
}

type BookType = {
  id: number,
  title: string,
  annotation: string,
  language: string,
  authors: AuthorType[],
  bookCoverUrl: string,
  bookCopies: BookCopyType[],
}