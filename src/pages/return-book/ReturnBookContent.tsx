import './ReturnBookContent.scss'

import { observer } from "mobx-react-lite"
import { ReturnBookStateContext } from './state/ReturnBookStateContext'
import { useContext, useState } from 'react'
import { Overlay } from '../../components/overlay/Overlay'
import { BookFeedbackForm } from '../../components/book-feedback-form/BookFeedbackForm'

export const ReturnBookContent = observer(({
  title,
  coverUrl,
  onSubmit,
  goToBookCopyPage,
}:{
  title: string,
  coverUrl: string,
  onSubmit: () => unknown,
  goToBookCopyPage: () => unknown,
}) => {
  const returnBookState = useContext(ReturnBookStateContext)

  const {
    book,
    isSaving,
    errors,
    isFeedbackDisabled,
  } = returnBookState

  const {
    advantages,
    disadvantages,
    rating,
    progressOfReading,
  } = book

  const {
    isRatingError,
    isProgressOfReadingError,
  } = errors
  
  const [
    showModal,
    setShowModal,
  ] = useState(false)
  
  const handleConfirmQuit = () => {
    setShowModal(false)

    goToBookCopyPage()
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleCancel = () => {
    if (returnBookState.isSomethingFilledWithinTheForm()) {
      setShowModal(true)
    }
    else {
      goToBookCopyPage() 
    }
  }

  return (
    <>
      {
        showModal && (
          <Overlay 
            data-cy="add-book-overlay"
            onAccentButtonAction={handleConfirmQuit}
            onButtonAction={handleCloseModal}
            modalName='modal'
            title="Do You Want to Quit this&nbsp;Page?"
            text="The data you have entered will not&nbsp;be saved"
            buttonLabel="No, Stay Here"
            accentButtonLabel="Yes, Quit"
          />
        )
      }
      <BookFeedbackForm
        title={title}
        coverUrl={coverUrl}
        progressOfReading={progressOfReading}
        rating={rating}
        advantages={advantages}
        disadvantages={disadvantages}
        acceptButtonLabel={isSaving 
          ? `Returning` 
          : `Return Book`}
        setProgressOfReading={({
          progressOfReading,
        }) => returnBookState.setProgressOfReading({
          progressOfReading,
        })}
        setRating={({
          rating,
        }) => returnBookState.setRating({
          rating,
        })}
        setAdvantages={({
          advantages,
        }) => returnBookState.setAdvantages({
          advantages,
        })}
        setDisadvantages={({
          disadvantages,
        }) => returnBookState.setDisadvantages({
          disadvantages,
        })}
        handleCancel={handleCancel}
        onSubmit={onSubmit}
        isProgressOfReadingError={isProgressOfReadingError}
        isRatingError={isRatingError}
        isFeedbackDisabled={isFeedbackDisabled}
        isSaving={isSaving}
      />
    </>
  )
})
