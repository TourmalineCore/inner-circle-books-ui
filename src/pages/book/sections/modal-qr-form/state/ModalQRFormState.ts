import { makeAutoObservable } from 'mobx'

const EMPTY_MODAL_QR_FORM_DATA: ModalQRFormType = {
  bookTitle: ``,
  bookCopies: [],
}

export class ModalQRFormState {
  private _modalQRFormData: ModalQRFormType = {
    ...EMPTY_MODAL_QR_FORM_DATA,
  }

  private _selectedCopies: { 
    [key: number]: boolean, 
  } = {}

  private _isSaving = false    

  constructor() {
    makeAutoObservable(this)
  }

  initialize({
    loadedModalQRFormData,
  }: {
    loadedModalQRFormData: ModalQRFormType,
  }) {
    this._modalQRFormData = loadedModalQRFormData

    // Initialize all copies as selected
    this._modalQRFormData
      .bookCopies
      .forEach(({
        bookCopyId,
      }) => {
        this._selectedCopies[bookCopyId] = true
      })
  }

  get modalQRFormData() {
    return this._modalQRFormData
  } 

  get bookCopiesCount() {
    return this._modalQRFormData
      .bookCopies
      .length
  }

  get areAllCopiesSelected() {
    return this._modalQRFormData
      .bookCopies
      .every(({
        bookCopyId,
      }) =>
        this._selectedCopies[bookCopyId] === true, 
      )
  }

  get selectedBookCopies() {
    return this._modalQRFormData
      .bookCopies
      .filter(({
        bookCopyId, 
      }) => 
        this._selectedCopies[bookCopyId] === true,
      )
  }

  get isSaving() {
    return this._isSaving
  }

  toggleBookCopyChecked({
    id,
  }: {
    id: number,
  }) {
    this._selectedCopies[id] = !this._selectedCopies[id]
  }

  toggleSelectAllCopies({
    checked,
  }: {
    checked: boolean,
  }) {
    this._selectedCopies = {}

    if (checked) {
      this._modalQRFormData
        .bookCopies
        .forEach(({
          bookCopyId,
        }) => {
          this._selectedCopies[bookCopyId] = true
        })
    }
  }

  isBookCopySelected({
    id,
  }: {
    id: number,
  }) {
    return !!this._selectedCopies[id]
  }

  resetSelectedCopies() {
    this._selectedCopies = {}

    this._modalQRFormData
      .bookCopies
      .forEach(({
        bookCopyId,
      }) => {
        this._selectedCopies[bookCopyId] = true
      })
  }

  setIsSaving() {
    this._isSaving = true
  }

  resetIsSaving() {
    this._isSaving = false
  }
}
