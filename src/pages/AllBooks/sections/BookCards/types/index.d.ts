type AuthorType = {
  fullName: string,
}

type BookCardType = {
  title: string,
  language: string,
  authors: AuthorType[],
  bookCoverUrl: string,
}
