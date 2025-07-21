type AuthorType = {
  fullName: string,
}

type BookCardType = Omit<BookType, 'id' | 'annotation' | 'count'> & {
  id?: number,
}

type AddBookType = Omit<BookType, 'id'>

type BookType = {
  id: number,
  title: string,
  annotation: string,
  count: number,
  language: string,
  authors: AuthorType[],
  bookCoverUrl: string,
}