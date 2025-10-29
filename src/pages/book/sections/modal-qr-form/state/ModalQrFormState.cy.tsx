import { ModalQrFormState } from './ModalQrFormState'

describe(`ModalQrFormState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`ModalQrForm Data`, modalQrFormDataTests)
})

function initializationTests() {
  const modalQrFormState = new ModalQrFormState()
  
  it(`
  GIVEN a modalQrFormState
  WHEN initialize
  SHOULD have default modalQrFormData values
  `, () => {
    expect(modalQrFormState.modalQRFormData.bookTitle)
      .to
      .be
      .eq(``)

    expect(modalQrFormState.modalQRFormData.bookCopies)
      .to
      .deep
      .eq([])
  })
}

function modalQrFormDataTests() {
  let modalQrFormState: ModalQrFormState

  const modalQrFormDataForInitialization: ModalQrFormType = {
    bookTitle: `Test`,
    bookCopies:  [
      {
        bookCopyId: 1,
        secretKey: `a2r43`,
      },
      {
        bookCopyId: 2,
        secretKey: `b2r43`,
      },
    ],
  }
  
  beforeEach(() => {
    modalQrFormState = new ModalQrFormState()

    modalQrFormState.initialize({
      loadedModalQRFormData: modalQrFormDataForInitialization,
    })
  })

  it(`
  GIVEN the ModalQrFormState
  WHEN set modalQRFormData data
  SHOULD display new values in the modalQRFormData object
  `, () => {
    expect(modalQrFormState.modalQRFormData)
      .to
      .deep
      .eq(modalQrFormDataForInitialization)
  })

  it(`
  GIVEN the ModalQrFormState
  WHEN book data is set
  AND called get bookCopiesCount function
  SHOULD return correct book copies count value
  `, () => {
    expect(modalQrFormState.bookCopiesCount)
      .to
      .eq(2)
  })

  it(`
  GIVEN the ModalQrFormState
  WHEN toggleBookCopyChecked
  SHOULD toggle the selected state of a book copy
  `, () => {
    expect(modalQrFormState.isBookCopySelected({
      id: 1, 
    }))
      .to
      .be
      .true

    expect(modalQrFormState.selectedBookCopies)
      .to
      .deep
      .eq([
        {
          bookCopyId: 1,
          secretKey: `a2r43`,
        },
        {
          bookCopyId: 2,
          secretKey: `b2r43`,
        },
      ])

    modalQrFormState.toggleBookCopyChecked({
      id: 1, 
    })

    expect(modalQrFormState.isBookCopySelected({
      id: 1, 
    }))
      .to
      .be
      .false

    expect(modalQrFormState.selectedBookCopies)
      .to
      .deep
      .eq([
        {
          bookCopyId: 2,
          secretKey: `b2r43`,
        },
      ])

    modalQrFormState.toggleBookCopyChecked({
      id: 1, 
    })

    expect(modalQrFormState.isBookCopySelected({
      id: 1, 
    }))
      .to
      .be
      .true
  })

  it(`
  GIVEN the ModalQrFormState
  WHEN toggleSelectAllCopies with false
  SHOULD deselect all book copies
  WHEN toggleSelectAllCopies with true
  SHOULD select all book copies
  `, () => {
    modalQrFormState.toggleSelectAllCopies({
      checked: false, 
    })

    expect(modalQrFormState.areAllCopiesSelected)
      .to
      .be
      .false

    expect(modalQrFormState.isBookCopySelected({
      id: 1, 
    }))
      .to
      .be
      .false

    expect(modalQrFormState.isBookCopySelected({
      id: 2, 
    }))
      .to
      .be
      .false

    modalQrFormState.toggleSelectAllCopies({
      checked: true, 
    })

    expect(modalQrFormState.areAllCopiesSelected)
      .to
      .be
      .true

    expect(modalQrFormState.isBookCopySelected({
      id: 1, 
    }))
      .to
      .be
      .true

    expect(modalQrFormState.isBookCopySelected({
      id: 2, 
    }))
      .to
      .be
      .true
  })

  it(`
  GIVEN the ModalQrFormState
  WHEN areAllCopiesSelected
  SHOULD return true if all copies are selected
  `, () => {
    modalQrFormState.toggleSelectAllCopies({
      checked: true, 
    })

    expect(modalQrFormState.areAllCopiesSelected)
      .to
      .be
      .true
  })

  it(`
  GIVEN the ModalQrFormState
  WHEN areAllCopiesSelected
  SHOULD return false if not all copies are selected
  `, () => {
    modalQrFormState.toggleBookCopyChecked({
      id: 1, 
    })
    
    expect(modalQrFormState.areAllCopiesSelected)
      .to
      .be
      .false
  })

  it(`
  GIVEN the ModalQrFormState
  WHEN resetSelectedCopies
  SHOULD reset the selected copies to default state
  `, () => {
    modalQrFormState.resetSelectedCopies()

    expect(modalQrFormState.areAllCopiesSelected)
      .to
      .be
      .true

    expect(modalQrFormState.isBookCopySelected({
      id: 1, 
    }))
      .to
      .be
      .true
    
    expect(modalQrFormState.isBookCopySelected({
      id: 2, 
    }))
      .to
      .be
      .true
  })
}