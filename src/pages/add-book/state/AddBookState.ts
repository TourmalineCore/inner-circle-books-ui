import { makeAutoObservable } from 'mobx'

const EMPTY_BOOK: AddBookType = {
  title: ``,
  count: 1,
  language: `rus`,
  annotation: ``,
  authors: [
    {
      fullName: ``, 
    },
  ],
  bookCoverUrl: ``,
}

export class AddBookState {
  private _book: AddBookType = EMPTY_BOOK

  private _isSaving = false    
  private _isTriedToSubmit = false  

  constructor() {
    makeAutoObservable(this)
  }

  get book() {
    return this._book
  }

  get isSaving() {
    return this._isSaving
  }

  get isTriedToSubmit() {
    return this._isTriedToSubmit
  }

  get isTitleValid() {
    return this._book.title !== ``
  }

  get isAnnotationValid() {
    return this._book.annotation !== ``
  }

  get isAuthorsFieldValid() {
    return this._book.authors.some(author => author.fullName !== ``)
  }

  get isValid() {
    return (
      this.isTitleValid &&
      this.isAnnotationValid &&
      this.isAuthorsFieldValid
    )
  }

  get errors() {
    return {
      title: !this.isTitleValid,
      annotation: !this.isAnnotationValid,
      authors: !this.isAuthorsFieldValid,
    }
  }

  setTitle({
    title,
  }: {
    title: string,
  }) {
    this._book.title = title
  }

  setCount({
    count,
  }: {
    count: number,
  }) {
    this._book.count = count
  }

  setLanguage({
    language,
  }: {
    language: string,
  }) {
    this._book.language = language
  }

  setAnnotation({
    annotation,
  }: {
    annotation: string,
  }) {
    this._book.annotation = annotation
  }

  setBookCoverUrl({
    bookCoverUrl,
  }: {
    bookCoverUrl: string,
  }) {
    this._book.bookCoverUrl = bookCoverUrl
  }

  setAuthor({
    index, 
    authorFullName,
  }: {
    index: number, 
    authorFullName: string,
  }) {
    this._book.authors = this
      ._book
      .authors
      .map((authors, i) =>
        i === index 
          ? {
            ...authors,
            fullName: authorFullName, 
          } 
          : authors,
      )
  }

  addAuthor() {
    this._book.authors = [
      ...this._book.authors,
      {
        fullName: ``, 
      },
    ]
  }

  removeAuthor({
    index,
  }: {
    index: number,
  }) {
    this._book.authors = this
      ._book
      .authors
      .filter((_author, i) => i !== index)
  }

  //structuredClone()
  reset() {
    this._book = {
      ...EMPTY_BOOK,
      authors: EMPTY_BOOK
        .authors
        .map(author => ({
          ...author, 
        })),
    }
  }

  isSomethingFilledWithinTheForm() { //deepequal
    return (
      this._book.title !== `` ||
      this._book.count > 1 ||
      this._book.annotation !== `` ||
      this._book.authors.some(author => author.fullName.trim() !== ``) ||
      this._book.bookCoverUrl !== ``
    )
  }

  setIsSaving() {
    this._isSaving = true
  }

  setIsSaved() {
    this._isSaving = false
  }
  
  setIsTriedToSubmit() {
    this._isTriedToSubmit = true
  }

  resetIsTriedToSubmit() {
    this._isTriedToSubmit = false
  }
}
