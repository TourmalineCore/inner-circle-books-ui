import { ModalQRFormState } from './ModalQRFormState'

describe(`ModalQRFormState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`ModalQRForm Data`, modalQrFormDataTests)
  describe(`Is Saving`, isSavingTests)
})

function initializationTests() {
  const modalQRFormState = new ModalQRFormState()
  
  it(`
  GIVEN a modalQRFormState
  WHEN initialize
  SHOULD have default modalQRFormData values
  `, () => {
    expect(modalQRFormState.modalQRFormData.bookTitle)
      .to
      .be
      .eq(``)

    expect(modalQRFormState.modalQRFormData.bookCopies)
      .to
      .deep
      .eq([])
  })
}

function modalQrFormDataTests() {
  let modalQRFormState: ModalQRFormState

  const modalQrFormDataForInitialization: ModalQRFormType = {
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
    modalQRFormState = new ModalQRFormState()

    modalQRFormState.initialize({
      loadedModalQRFormData: modalQrFormDataForInitialization,
    })
  })

  it(`
  GIVEN the ModalQrFormState
  WHEN set modalQRFormData data
  SHOULD display new values in the modalQRFormData object
  `, () => {
    expect(modalQRFormState.modalQRFormData)
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
    expect(modalQRFormState.bookCopiesCount)
      .to
      .eq(2)
  })

  it(`
  GIVEN the ModalQrFormState
  WHEN toggleBookCopyChecked
  SHOULD toggle the selected state of a book copy
  `, () => {
    expect(modalQRFormState.isBookCopySelected({
      id: 1, 
    }))
      .to
      .be
      .true

    expect(modalQRFormState.selectedBookCopies)
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

    modalQRFormState.toggleBookCopyChecked({
      id: 1, 
    })

    expect(modalQRFormState.isBookCopySelected({
      id: 1, 
    }))
      .to
      .be
      .false

    expect(modalQRFormState.selectedBookCopies)
      .to
      .deep
      .eq([
        {
          bookCopyId: 2,
          secretKey: `b2r43`,
        },
      ])

    modalQRFormState.toggleBookCopyChecked({
      id: 1, 
    })

    expect(modalQRFormState.isBookCopySelected({
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
    modalQRFormState.toggleSelectAllCopies({
      checked: false, 
    })

    expect(modalQRFormState.areAllCopiesSelected)
      .to
      .be
      .false

    expect(modalQRFormState.isBookCopySelected({
      id: 1, 
    }))
      .to
      .be
      .false

    expect(modalQRFormState.isBookCopySelected({
      id: 2, 
    }))
      .to
      .be
      .false

    modalQRFormState.toggleSelectAllCopies({
      checked: true, 
    })

    expect(modalQRFormState.areAllCopiesSelected)
      .to
      .be
      .true

    expect(modalQRFormState.isBookCopySelected({
      id: 1, 
    }))
      .to
      .be
      .true

    expect(modalQRFormState.isBookCopySelected({
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
    modalQRFormState.toggleSelectAllCopies({
      checked: true, 
    })

    expect(modalQRFormState.areAllCopiesSelected)
      .to
      .be
      .true
  })

  it(`
  GIVEN the ModalQrFormState
  WHEN areAllCopiesSelected
  SHOULD return false if not all copies are selected
  `, () => {
    modalQRFormState.toggleBookCopyChecked({
      id: 1, 
    })
    
    expect(modalQRFormState.areAllCopiesSelected)
      .to
      .be
      .false
  })

  it(`
  GIVEN the ModalQrFormState
  WHEN resetSelectedCopies
  SHOULD reset the selected copies to default state
  `, () => {
    modalQRFormState.resetSelectedCopies()

    expect(modalQRFormState.areAllCopiesSelected)
      .to
      .be
      .true

    expect(modalQRFormState.isBookCopySelected({
      id: 1, 
    }))
      .to
      .be
      .true
    
    expect(modalQRFormState.isBookCopySelected({
      id: 2, 
    }))
      .to
      .be
      .true
  })
}

function isSavingTests() {  
  it(`
  GIVEN initial isSaving = false
  WHEN setIsSaving AND resetIsSaving are triggered
  THEN toggle isSaving to true and then back to false
  `, () => {
    const modalQRFormState = new ModalQRFormState()

    expect(modalQRFormState.isSaving)
      .to
      .be
      .false
  
    modalQRFormState.setIsSaving()
    expect(modalQRFormState.isSaving)
      .to
      .be
      .true
      
    modalQRFormState.resetIsSaving()
    expect(modalQRFormState.isSaving)
      .to
      .be
      .false
  })
}