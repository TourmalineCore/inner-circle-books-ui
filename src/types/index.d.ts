type AuthorType = {
  fullName: string,
}

type BookCardType = {
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
