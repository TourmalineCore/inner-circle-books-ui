type AuthorType = {
  fullName: string,
}

type BookCardType = {
  id?: number,
  title: string,
  language: string,
  authors: AuthorType[],
  bookCoverUrl: string,
}

type AddBookType = {
  title: string,
  count: number,
  language: string,
  annotation: string,
  authors: AuthorType[],
  bookCoverUrl: string,
}

type BookType = {
  id: number,
  title: string,
  annotation: string,
  count: number,
  language: string,
  authors: AuthorType[],
  bookCoverUrl: string,
}