import { makeAutoObservable } from 'mobx'

const defaultBook: AddBookType = {
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
  private _book: AddBookType = defaultBook

  private _isSaving = false    
  private _isTriedToSubmit = false  

  constructor() {
    makeAutoObservable(this)
  }

  initialize({
    title,
    count,
    language,
    annotation,
    authors,
    bookCoverUrl,
  }: AddBookType) {
    this._book.title = title
    this._book.count = count
    this._book.language = language
    this._book.annotation = annotation
    this._book.authors = authors.length > 0
      ? authors
      : [
        {
          fullName: ``, 
        },
      ]
    this._book.bookCoverUrl = bookCoverUrl
  }

  get title() {
    return this._book.title
  }

  get count() {
    return this._book.count
  }

  get language() {
    return this._book.language
  }

  get annotation() {
    return this._book.annotation
  }

  get authors() {
    return this._book.authors
  }

  get bookCoverUrl() {
    return this._book.bookCoverUrl
  }

  setTitle({
    value,
  }: {
    value: string,
  }) {
    this._book.title = value
  }

  setCount({
    value,
  }: {
    value: number,
  }) {
    this._book.count = value
  }

  setLanguage({
    value,
  }: {
    value: string,
  }) {
    this._book.language = value
  }

  setAnnotation({
    value,
  }: {
    value: string,
  }) {
    this._book.annotation = value
  }

  setCoverUrl({
    value,
  }: {
    value: string,
  }) {
    this._book.bookCoverUrl = value
  }

  setAuthor({
    index, 
    value,
  }: {
    index: number, 
    value: string,
  }) {
    this._book.authors = this._book.authors.map((author, i) =>
      i === index 
        ? {
          ...author,
          fullName: value, 
        } 
        : author,
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
    this._book.authors = this._book.authors.filter((_author, i) => i !== index)
  }

  get isSaving() {
    return this._isSaving
  }

  get isTriedToSubmit() {
    return this._isTriedToSubmit
  }

  get isTitleValid() {
    return this._book.title.trim() !== ``
  }

  get isAnnotationValid() {
    return this._book.annotation.trim() !== ``
  }

  get isAuthorsFieldValid() {
    return this._book.authors.some(author => author.fullName.trim() !== ``)
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

  reset() {
    this._book = {
      ...defaultBook,
      authors: defaultBook.authors.map(author => ({
        ...author, 
      })),
    }
  }

  isSomethingFilledWithinTheForm() {
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
